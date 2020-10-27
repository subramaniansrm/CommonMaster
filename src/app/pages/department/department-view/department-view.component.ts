import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { DeparmentViewService } from './deparment-view.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {

  saveForm: FormGroup;
  userLocationCombo: any;
  userBaseFieldName: any = [];
  userSubLocationCombo: any = [];
  val: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private deparmentViewService: DeparmentViewService,
    private componentLoaderService: ComponentLoaderService) {
  }
  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      locationId: ['', Validators.required],
      sublocationId: ['', Validators.required],
      description: [''],
      // gfiLocationFlag: ['', Validators.required],
    });
    this.val = localStorage.getItem('locationId');    
    console.log("value",this.val);
   this.subLocationDropDown(this.val);

    this.onloadSelectboxData();
  }
  onloadSelectboxData() {
    let loadLoactionSelectBox = this.deparmentViewService.load_LoactionselectBoxData().subscribe(data => {
      let location_selectGetData = JSON.parse(data['_body']);
      this.userLocationCombo = location_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let departmentmodifyData = this.deparmentViewService.getModifyData().subscribe(data => {
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
      if (modify_selectGetData.succesObject.gfiLocationFlag == '1') {
        this.saveForm.patchValue({gfiLocationFlag : true});
      } else {
        this.saveForm.patchValue({gfiLocationFlag : false});
      }
      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  ngOnDestroy(){
    localStorage.removeItem('departmentId');
    localStorage.removeItem('locationId');

  }

subLocationDropDown(val) {
 let loadSelectBoxList = this.deparmentViewService.load_subLocationselectBoxData(val).subscribe(data => {
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

