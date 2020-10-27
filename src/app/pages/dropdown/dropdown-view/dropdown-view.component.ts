
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { DropdownService } from '../dropdown.service';
@Component({
  selector: 'app-dropdown-view',
  templateUrl: './dropdown-view.component.html',
  styleUrls: ['./dropdown-view.component.css']
})
export class DropdownViewComponent implements OnInit {
  saveForm: FormGroup;
  salesCombo :any;
  modify_selectGetData: any;
  countryFilter : any;
  userBaseFieldName:any;
  fieldFilter : any;
  salesOrgFilter: any;

  fieldCombo: any;


  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dropdownService : DropdownService,
  ) { }

  ngOnInit() {

    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      dropdownCode : ['', Validators.required],
      dropdownName: ['', Validators.required],
      fieldId: ['', Validators.required],
      activeFlag: [true, Validators.required],
      salesOrgId : ['',Validators.required]
    });
    this.loadData();

  
    this.componentLoaderService.display(false);

  }
  loadData(){

    this.dropdownService.loadSales().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.salesCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

    this.dropdownService.loadField().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.fieldCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
    let departmentmodifyData = this.dropdownService.viewDropDown().subscribe(data => {
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
