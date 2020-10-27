
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { SalesViewService } from './sales-view.service';
@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.css']
})
export class SalesViewComponent implements OnInit {
  saveForm: FormGroup;
  salesCombo :any;
  modify_selectGetData: any;
  countryFilter : any;
  userBaseFieldName:any;

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private salesViewService : SalesViewService,
  ) { }

  ngOnInit() {

    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      salesOrgCode : ['', Validators.required],
      salesOrgName: ['', Validators.required],
      activeFlag: [true, Validators.required],
      accessToken : [localStorage.getItem("kiosk_access_token")]

    });
    this.loadData();

  
    this.componentLoaderService.display(false);

  }
  loadData(){
    let departmentmodifyData = this.salesViewService.viewSales().subscribe(data => {
      this.modify_selectGetData = JSON.parse(data['_body']);
     console.log("Patching Value : ", this.modify_selectGetData);
     this.userBaseFieldName = this.modify_selectGetData.authSuccesObject.screenFieldMappingVOList.map(
      element => {
        console.log(element);
        return element;
      }
    );
      this.saveForm.patchValue( this.modify_selectGetData.succesObject);
     //this.saveForm.patchValue({salesOrgId:this.modify_selectGetData.succesObject.salesOrgId})
     console.log("patched :",this.saveForm)
    
     this.componentLoaderService.display(false);
   }, error => {
     if (error.status === 401) {
       alert("Error");
     }
   });
  }


}

