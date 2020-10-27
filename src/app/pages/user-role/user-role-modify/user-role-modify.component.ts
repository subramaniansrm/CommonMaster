
import { Component, OnInit, ViewChild, Output, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { UserRoleModifyService } from './user-role-modify.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { UserRoleAddService } from '../user-role-add/user-role-add.service';
@Component({
  selector: 'app-user-role-modify',
  templateUrl: './user-role-modify.component.html',
  styleUrls: ['./user-role-modify.component.css']
})
export class UserRoleModifyComponent implements OnInit, OnDestroy {
  saveForm: FormGroup;
  userDepartmentCombo: any;
  userLocationCombo: any;
  userBaseFieldName: any = [];
  subLocationList: any = [];
  departmentList:any = [];
  locVal: any;
  sublocVal : any;
  roleType : any;

  locationId: number;
  sublocationId: number;

  
  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private dialog: MatDialog, 
    private userRoleModifyService: UserRoleModifyService, 
    private componentLoaderService: ComponentLoaderService,
    private userRoleAddService: UserRoleAddService) {
  }
  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      userRoleName: ['', Validators.required],
      roleType: ['', Validators.required],
      sublocationId: ['', Validators.required],
      userDepartment: ['', Validators.required],
      userLocation: ['', Validators.required],
      description: [''],
      accessToken : [localStorage.getItem("kiosk_access_token")]
    });
  
    this.getRoleType();
    this.getdepartment(localStorage.getItem('sublocationId'));
    this.onloadSelectboxData();
  }
  onloadSelectboxData() {
    let loadLoactionSelectBox = this.userRoleModifyService.load_LoactionselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let loaddepartmentSelectBoxList = this.userRoleModifyService.load_DepartmentselectBoxData().subscribe(data => {
      let department_selectGetData = JSON.parse(data['_body']);
      this.userDepartmentCombo = department_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let userRolemodifyData = this.userRoleModifyService.getModifyData().subscribe(data => {
      let modify_selectGetData = JSON.parse(data['_body']);
      console.log(modify_selectGetData);
      this.userBaseFieldName = modify_selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      console.log(this.userBaseFieldName);
      console.log(modify_selectGetData.succesObject.userLocation);
      this.getSubLocation(modify_selectGetData.succesObject.userLocation);
      this.saveForm.patchValue(modify_selectGetData.succesObject);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    this.componentLoaderService.display(false);
  }
  onSubmit() {
    let formvalue = Object.assign(this.saveForm.value, {id : localStorage.getItem('userRoleId')});
    console.log("add",this.saveForm);
    if (this.saveForm.invalid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Alert',
          message: "mandatory",
          btnYes: 'OK',
        }
      });
    } else if (this.saveForm.valid) {
      this.componentLoaderService.display(true);
      let finalval: any = {};

      finalval = formvalue;
     // finalval.screenFieldDisplayVoList = this.userBaseFieldName;
      console.log(finalval);
      this.userRoleModifyService.modifyUserRole(formvalue).subscribe(data => {
        let Response = JSON.parse(data['_body']);
        if (Response.responseCode === '200') {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false,
            panelClass: 'btnCenter',
            width: 'auto',
            data: {
              title: 'Info',
              server: 'servermessage',
              message: Response.responseMessage,
              btnYes: 'OK',
            }
          });
          dialogRef.afterClosed().subscribe(data => {
            this.router.navigate(['/userrole']);
          });
        } else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false,
            panelClass: 'btnCenter',
            width: 'auto',
            data: {
              title: 'Alert',
              server: 'servermessage',
              message: Response.responseMessage,
              btnYes: 'OK',
            }
          });
        }
        this.componentLoaderService.display(false);
      });
    }
  }
  getSubLocation(val) {
    this.locationId = val;
    this.userRoleAddService.load_subLocationselectBoxData(val).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.subLocationList = resp.succesObject;
        console.log("subLocationList",this.subLocationList);
      },
      error => {
        alert(error);
      }
    );
  }

  getdepartment(val) {
    this.sublocationId = val;
    this.userRoleAddService.load_selectBox_departmentData(this.locationId, this.sublocationId).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.departmentList = resp.succesObject;
        console.log("department",this.departmentList);
      },
      error => {
        alert(error);
      }
    );
  }

  getSubLocation2(val,saveForm) {
    this.locationId = val;
    saveForm.controls.sublocationId.value = ""; 
    saveForm.controls.userDepartment.value = "";
    this.subLocationList = [];
    this.departmentList = [];
    this.userRoleAddService.load_subLocationselectBoxData(val).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.subLocationList = resp.succesObject;
        console.log("subLocationList",this.subLocationList);
      },
      error => {
        alert(error);
      }
    );
  }

  getdepartment2(val,saveForm) {
    this.sublocationId = val;
    saveForm.controls.userDepartment.value = "";
    this.departmentList = [];
    console.log("department",val);
    this.userRoleAddService.load_selectBox_departmentData(this.locationId, this.sublocationId).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.departmentList = resp.succesObject;
        console.log("department",this.departmentList);
      },
      error => {
        alert(error);
      }
    );
  }

  ngOnDestroy(){
    localStorage.removeItem('userRoleId');
    localStorage.removeItem('locationId');
    localStorage.removeItem('sublocationId');
    
  }

  getRoleType(){
    let loadLoactionSelectBox = this.userRoleAddService.getRoleType().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.roleType = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
}
