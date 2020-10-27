
import { Component, OnInit, ViewChild, Output, Inject, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { UserAddService } from './user-add.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  divisionFilter: any;
  sublocationFilter: any;
  departmentFilter: any;
  locationFilter: any;
  saveForm: FormGroup;
  userDeptCombo: any;
  userRoleCombo: any;
  userDivisionCombo: any;
  userLocationCombo: any;
  userSubLocationCombo: any;
  levelCombo: any;
  module: any;
  i: any;
  password1: '';
  conpassword: '';
  hide = false;
  hide1 = false;
  userBaseFieldName: any = [];
  subLocationList: any = [];
  userRoleList: any = [];
  userMappingModuleList = [];

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router, private formBuilder: FormBuilder, 
    private dialog: MatDialog, 
    private UseraddService: UserAddService) {
  }
  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      userLoginId: ['', Validators.required],
      userEmployeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      emailId: [''],
      userRole: [''],
      userDepartment: ['', Validators.required],
      division: [''],
      phoneNumber: [''],
      mobile: [''],
      currentAddress: [''],
      permanentAddress: [''],
      userLocation: [''],
      subLocation: [''],
      commonId: [''],
      password: [''],
      confirmPassword: [''],
      activeFlag: [true],
      accessToken: [localStorage.getItem("kiosk_access_token")],
      moduleId: ['',Validators.required],

    });
    this.onloadSelectboxData();
  }
  onloadSelectboxData() {
    this.UseraddService.adduserscreen().subscribe(data => {
      let selectGetData = JSON.parse(data['_body']);
      this.userBaseFieldName = selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      this.componentLoaderService.display(false);
      console.log(this.userBaseFieldName);
      //   console.log(this.saveForm.value);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });


    let deptCombo = this.UseraddService.load_DeptselectBoxData().subscribe(data => {
      let dept_selectGetData = JSON.parse(data['_body']);
      this.userDeptCombo = dept_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });


    let moduleCombo = this.UseraddService.loadModule().subscribe(data => {
      let dept_selectGetData = JSON.parse(data['_body']);
      this.module = dept_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

    let divisionCombo = this.UseraddService.load_DivisionselectBoxData().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.userDivisionCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let locationCombo = this.UseraddService.load_LocationselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let roleCombo = this.UseraddService.load_RoleselectBoxData().subscribe(data => {
      let role_selectGetData = JSON.parse(data['_body']);
      this.userRoleCombo = role_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let levelCombo = this.UseraddService.load_levelselectBoxData().subscribe(data => {
      let level_selectGetData = JSON.parse(data['_body']);
      this.levelCombo = level_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });


  }
  onSubmit() {
    let formvalue = this.saveForm.value;
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
      if (this.password1 !== this.conpassword) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          disableClose: false,
          panelClass: 'btnCenter',
          width: 'auto',
          data: {
            title: 'Alert',
            message: 'pwdmismatch',
            btnYes: 'OK',
          }
        });
      } else if (this.password1 === this.conpassword) {
        this.componentLoaderService.display(true);
        let finalval: any = {};
        finalval = formvalue;
        finalval.screenFieldDisplayVoList = this.userBaseFieldName;
        console.log(finalval);
this.getmodValue();

        finalval.userMappingModuleList = this.roleList;
        this.saveForm.removeControl('moduleId')

        console.log("module lists : ", finalval)
        //  delete this.saveForm.value.moduleId;
        //finalval.moduleId = undefined;
        console.log("Final Val without moduleID", finalval);
        this.UseraddService.addUser(finalval).subscribe(data => {
          let Response = JSON.parse(data['_body']);
          console.log("response", Response.responseMessage);
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
              this.router.navigate(['/user']);
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
  }
  getSubLocation(val) {
    let subLocationListData = this.UseraddService.load_subLocationData(val).subscribe(data => {
      let resp = JSON.parse(data['_body']);
      this.userSubLocationCombo = resp.succesObject;

    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

  }
  getDeptLocation(val, locationId) {
    this.UseraddService.load_selectBox_subLocationData({ userLocation: locationId, sublocationId: val }).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.subLocationList = resp.succesObject;
        console.log(this.subLocationList);
      },
      error => {
        alert(error);
      }
    );
  }



  getSubLocationList(eve) {
    console.log(eve);
    this.UseraddService.load_selectBox_subLocationData(eve).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.subLocationList = resp.succesObject;
        console.log(this.subLocationList);
      },
      error => {
        alert(error);
      }
    );
  }
  executerGetUSerRole(id) {
    let userRoleListData = this.UseraddService.load_userRoleelectBoxData({ userDepartment: id }).subscribe(data => {
      let resp = JSON.parse(data['_body']);
      this.userRoleList = resp.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }




   roleList : any =[];
  getmodValue(){
    debugger;
    
    let allmod = this.module;
    for(let  i= 0;i< allmod.length;i++){
      console.log("i loop")
   
      for(let j=0;j< this.saveForm.value.moduleId.length;j++)
      {
        console.log("j loop")
        if( allmod[i].moduleId == this.saveForm.value.moduleId[j].moduleId ){
           this.roleList.push(allmod[i]);
           console.log("roleList")
        }
      }

    }

  }
}
