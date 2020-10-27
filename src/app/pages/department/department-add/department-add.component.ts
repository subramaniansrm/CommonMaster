import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { DeparmentAddService } from './deparment-add.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {

  saveForm: FormGroup;
  userLocationCombo: any;
  userBaseFieldName: any = [];
  userSubLocationCombo: any = [];
  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog, private deparmentAddService: DeparmentAddService) {
  }

  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      locationId: ['', Validators.required],
      sublocationId: ['', Validators.required],
      description: [''],
      accessToken : [localStorage.getItem("kiosk_access_token")]
      // gfiLocationFlag: [true, Validators.required],
    });

    this.onloadSelectboxData();
  }
  onloadSelectboxData() {
    this.deparmentAddService.departmentaddscreen().subscribe(data => {
      let selectGetData = JSON.parse(data['_body']);
      this.userBaseFieldName = selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      console.log(this.userBaseFieldName);
      console.log(this.saveForm.value);
      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let loadLoactionSelectBox = this.deparmentAddService.load_LoactionselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  onSubmit() {
    let formvalue = this.saveForm.value;
    if (this.saveForm.value.gfiLocationFlag === true) {
      this.saveForm.value.gfiLocationFlag = "1";
    } else {
      this.saveForm.value.gfiLocationFlag = "0";
    }
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
      //finalval.screenFieldDisplayVoList = this.userBaseFieldName;
    
      console.log(finalval);
      this.deparmentAddService.addDepartment(finalval).subscribe(data => {
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
            this.router.navigate(['/department']);
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
      })
    }
  }



  subLocationDropDown(event) {
    let val = event.value;
    let loadSelectBoxList = this.deparmentAddService.load_subLocationselectBoxData(val).subscribe(data => {
      let RC_selectGetData = JSON.parse(data['_body']);
      this.userSubLocationCombo = RC_selectGetData.succesObject;
      console.log("sublocation list", this.userSubLocationCombo);
    }, error => {
      if (error.status === 401) {
        alert(error);
      }
    });
  }

}

