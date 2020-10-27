
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { UserRoleAddService } from './user-role-add.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
@Component({
  selector: 'app-user-role-add',
  templateUrl: './user-role-add.component.html',
  styleUrls: ['./user-role-add.component.css']
})
export class UserRoleAddComponent implements OnInit {
  saveForm: FormGroup;
  userDepartmentCombo: any;
  userLocationCombo: any;
  departmentList: any = [];
  Combo: any = [];
  role = false;
  dept = false;
  loca = false;
  des = false;
  userBaseFieldName: any = [];
  subLocationList: any = [];
  roleType: any = [];
  
  locationId: number;
  sublocationId: number;

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router, private formBuilder: FormBuilder,
     private dialog: MatDialog,
     private userRoleAddService: UserRoleAddService) {
  }

  ngOnInit() {
   this.saveForm = this.formBuilder.group({
      userRoleName: ['', Validators.required],
      roleType: ['', Validators.required],
      sublocationId: ['', Validators.required],
      userDepartment: ['', Validators.required],
      userLocation: ['', Validators.required],
      description: ['', ],
      accessToken  : [localStorage.getItem("kiosk_access_token")]
    });
    this.onloadSelectboxData();
    this.getRoleType();
  }
  onloadSelectboxData() {
    this.userRoleAddService.addUser().subscribe(data => {
      let selectGetData = JSON.parse(data['_body']);
      this.userBaseFieldName = selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      console.log(this.userBaseFieldName);

     /* for (let k in this.Combo) {
        if (this.Combo[k] === 'userRoleName') {
          this.role = true;
          // this.saveForm = this.formBuilder.group({
          //  userRoleName: ['', Validators.required]});
        } else if (this.Combo[k] === 'userLocation') {
          this.dept = true;
          // this.saveForm = this.formBuilder.group({
           //  userLocation: ['', Validators.required]});
        } else if (this.Combo[k] === 'userDepartment') {
          this.loca = true;
          // this.saveForm = this.formBuilder.group({
           // userDepartment: ['', Validators.required]});
        }  else if (this.Combo[k] === 'description') {
          this.des = true;
          // this.saveForm = this.formBuilder.group({
          //  description: ['', Validators.required]});
        }
      }*/
      console.log(this.saveForm.value);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let loadLoactionSelectBox = this.userRoleAddService.load_LoactionselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let loaddepartmentSelectBoxList = this.userRoleAddService.load_DepartmentselectBoxData().subscribe(data => {
      let department_selectGetData = JSON.parse(data['_body']);
      this.userDepartmentCombo = department_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  getSubLocation(val,saveForm) {
    this.locationId = val;
    console.log("saveForm",saveForm);
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

  getdepartment(val,saveForm) {
    console.log("department",val);
    saveForm.controls.userDepartment.value = "";
    this.departmentList = [];
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
  onSubmit() {
    let formvalue = this.saveForm.value;
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
      this.userRoleAddService.addUserRole(finalval).subscribe(data => {
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
  values(val, val2, val3){
    console.log(val , val2, val3)

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
