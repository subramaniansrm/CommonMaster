
import { Component, OnInit, ViewChild, Output, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { UserModifyService } from './user-modify.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { UserAddService } from '../user-add/user-add.service';
@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent implements OnInit, OnDestroy {
  saveForm: FormGroup;
  userDeptCombo: any;
  userRoleCombo: any;
  moduleCombo:any;
  module : any;
  userDivisionCombo: any;
  userLocationCombo: any;
  userSubLocationCombo: any;
  levelCombo: any;
  userBaseFieldName: any = [];
  password1: '';
  conpassword: '';
  subLocationList: any = [];
  userRoleList: any = [];
  hide = false;
  hide1 = false;
  divisionFilter: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userModifyService: UserModifyService,
    private UseraddService : UserAddService,
    private componentLoaderService: ComponentLoaderService) {
  }
  ngOnInit() {
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
      userLocation: ['', Validators.required],
      subLocation: ['', Validators.required],
      commonId: [''],
      password: [''],
      confirmPassword: [''],
      activeFlag: [true],
      accessToken : [localStorage.getItem("kiosk_access_token")],
      moduleId : ['',Validators.required]
    });
    this.onloadSelectboxData();
    // this.getSubLocation();
  }
  onloadSelectboxData() {
    this.componentLoaderService.display(true);
    let deptCombo = this.userModifyService.load_DeptselectBoxData().subscribe(data => {
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
    let divisionCombo = this.userModifyService.load_DivisionselectBoxData().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.userDivisionCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let locationCombo = this.userModifyService.load_LocationselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let roleCombo = this.userModifyService.load_RoleselectBoxData().subscribe(data => {
      let role_selectGetData = JSON.parse(data['_body']);
      this.userRoleCombo = role_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let modifyGetData = this.userModifyService.modifygetData().subscribe(data => {
      let modifyData = JSON.parse(data['_body']);
      // console.log(modifyData);
      let subLocationListData = this.userModifyService.load_subLocationData(modifyData.succesObject.userLocation).subscribe(data => {
        let resp = JSON.parse(data['_body']);
        this.userSubLocationCombo = resp.succesObject;
        console.log(this.userSubLocationCombo);
      }, error => {
        if (error.status === 401) {
          alert("Error");
        }
      });
      this.userBaseFieldName = modifyData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      console.log(this.userBaseFieldName);
      // this.conpassword = modifyData.succesObject.password;
      this.getSubLocation(modifyData.succesObject.userLocation);
      this.getDeptLocation(modifyData.succesObject.subLocation, modifyData.succesObject.userLocation);
      this.executerGetUSerRole(modifyData.succesObject.userDepartment);
      this.saveForm.patchValue(modifyData.succesObject);

      this.saveForm.patchValue({ confirmPassword: modifyData.succesObject.password });
      let viewTempList : any=[];
      for(let i=0;i<modifyData.succesObject.userMappingModuleList.length;i++){
        viewTempList.push(modifyData.succesObject.userMappingModuleList[i].moduleId)
        
      }

      
    this.saveForm.patchValue({moduleId:viewTempList});
      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    

    let levelCombo = this.userModifyService.load_levelselectBoxData().subscribe(data => {
      let level_selectGetData = JSON.parse(data['_body']);
      this.levelCombo = level_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  onSubmit() {
    let formvalue = Object.assign(this.saveForm.value, { id: localStorage.getItem('usercurid') });
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
        finalval.screenFieldDisplayVoList = this.userBaseFieldName;
        console.log(finalval);

        
this.getmodValue();
finalval.activeFlag = true;
        finalval.userMappingModuleList = this.roleList;
      //  this.saveForm.removeControl('moduleId')

        console.log("module lists : ", finalval)

        this.userModifyService.modifyUser(finalval).subscribe(data => {
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

  roleList : any =[];
  getmodValue(){
    debugger;
    
    let allmod = this.module;
    for(let  i= 0;i< allmod.length;i++){
      console.log("i loop")
   
      for(let j=0;j< this.saveForm.value.moduleId.length;j++)
      {
        console.log("j loop")
        if( allmod[i].moduleId === this.saveForm.value.moduleId[j] ){
           this.roleList.push(allmod[i]);
           console.log("roleList")
        }
      }

    }

  }

  getSubLocation(val) {
    let subLocationListData = this.userModifyService.load_subLocationData(val).subscribe(data => {
      let resp = JSON.parse(data['_body']);
      this.userSubLocationCombo = resp.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  getDeptLocation(val, locationId) {
    this.userModifyService.load_selectBox_subLocationData({ userLocation: locationId, sublocationId: val }).subscribe(
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
    let userRoleListData = this.userModifyService.load_userRoleelectBoxData({ userDepartment: id }).subscribe(data => {
      let resp = JSON.parse(data['_body']);
      this.userRoleList = resp.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  ngOnDestroy() {
    localStorage.getItem('usercurid');
  }
}
