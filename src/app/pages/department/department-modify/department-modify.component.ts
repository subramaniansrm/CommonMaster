import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { DeparmentModifyService } from './deparment-modify.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
@Component({
  selector: 'app-department-modify',
  templateUrl: './department-modify.component.html',
  styleUrls: ['./department-modify.component.css']
})
export class DepartmentModifyComponent implements OnInit {
  saveForm: FormGroup;
  userLocationCombo: any;
  userBaseFieldName: any = [];
  userSubLocationCombo: any = [];
  val: any;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private DeparmentmodifyService: DeparmentModifyService,
    private componentLoaderService: ComponentLoaderService) {
  }
  
  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
     locationId: ['', Validators.required],
      sublocationId: ['', Validators.required],
      description: [''],
      accessToken : [localStorage.getItem("kiosk_access_token")]
      // gfiLocationFlag: ['', Validators.required],
    });
    
    this.val = localStorage.getItem('locationId');    
    this.subLocationDropDown(this.val);
    this.onloadSelectboxData();
  }
  onloadSelectboxData() {
    let loadLoactionSelectBox = this.DeparmentmodifyService.load_LoactionselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let departmentmodifyData = this.DeparmentmodifyService.getModifyData().subscribe(data => {
      let modify_selectGetData = JSON.parse(data['_body']);
      console.log(modify_selectGetData);
      this.userBaseFieldName = modify_selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      console.log(this.userBaseFieldName);
      this.saveForm.patchValue(modify_selectGetData.succesObject);
      console.log("save form", this.saveForm);
      if(modify_selectGetData.succesObject.gfiLocationFlag == '1'){
        this.saveForm.patchValue({gfiLocationFlag : true});
      }else{
        this.saveForm.patchValue({gfiLocationFlag : false});
      }
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    this.componentLoaderService.display(false);
  }
  onSubmit() {
    if(this.saveForm.value.gfiLocationFlag === true || this.saveForm.value.gfiLocationFlag == '1'){
      this.saveForm.value.gfiLocationFlag = "1";
    }else if(this.saveForm.value.gfiLocationFlag === false || this.saveForm.value.gfiLocationFlag == '0'){
      this.saveForm.value.gfiLocationFlag = "0";
    }
    let formvalue = Object.assign(this.saveForm.value, {departmentId : localStorage.getItem('departmentId')});
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
      this.DeparmentmodifyService.modifyDepartment(finalval).subscribe(data => {
        let Response = JSON.parse(data['_body']);
        if (Response.responseCode === '200') {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false,
            panelClass: 'btnCenter',
            width: 'auto',
            data: {
              title: 'Info',
              server:'servermessage',
              message: Response.responseMessage,
              btnYes: 'OK',
            }
          });
          dialogRef.afterClosed().subscribe(data => {
            this.router.navigate(['/department']);
          });
        } else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false,
            panelClass: 'btnCenter',
            width: 'auto',
            data: {
              title: 'Alert',
              server:'servermessage',
              message: Response.responseMessage,
              btnYes: 'OK',
            }
          });
        }
        this.componentLoaderService.display(false);
      });
    }
  }
  ngOnDestroy(){
    localStorage.removeItem('departmentId');
    localStorage.removeItem('locationId');
  }

   subLocationDropDown(val) {
 let loadSelectBoxList = this.DeparmentmodifyService.load_subLocationselectBoxData(val).subscribe(data => {
      let RC_selectGetData = JSON.parse(data['_body']);
      this.userSubLocationCombo = RC_selectGetData.succesObject;
      console.log("sublocation list",this.userSubLocationCombo);
    }, error => {
      if(error.status === 401)
       {
         alert(error);
      }
    });
   }
}

