
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

 
  saveForm: FormGroup;
  salesCombo :any;
  //salesCombo :any;
  salesOrgFilter :any;
  distributionChannelFilter:any;
  channelCombo:any;
  plantFilter:any;
  plantCombo:any;
  cityCombo:any;
  cityFilter : any;
  salesId: any;
  modify_selectGetData: any;
  countryFilter : any;
  userBaseFieldName:any;

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private customerViewService : CustomerService ,
  ) { }

  ngOnInit() {

    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      customerCode : ['', Validators.required],
      customerName: ['', Validators.required],
      activeFlag: [true, Validators.required],
      salesOrgId:['',Validators.required],
      plantId:['',Validators.required],
      distributionId:['',Validators.required],
      cityId:['',Validators.required],
      areaNagar:[''],
      parentCode:[''],
      parentName:[''],
      accessToken : [localStorage.getItem("kiosk_access_token")]

    });
    this.loadData();

  
    this.componentLoaderService.display(false);

  }
  loadData(){


    let salesOrgCombo = this.customerViewService.loadSales().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.salesCombo = division_selectGetData.succesObject;
      console.log("Sale drop down : ", this.salesCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });



    let city = this.customerViewService.loadCity().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.cityCombo = division_selectGetData.succesObject;
      console.log("Sale drop down : ", this.salesCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });



    let channelDisCombo = this.customerViewService.loadChannel().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.channelCombo = division_selectGetData.succesObject;
      console.log("channelCombo tyoe drop down : ", this.channelCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

    let departmentmodifyData = this.customerViewService.viewCustomer().subscribe(data => {
      this.modify_selectGetData = JSON.parse(data['_body']);
      this.userBaseFieldName = this.modify_selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
     console.log("Patching Value : ", this.modify_selectGetData);
      this.saveForm.patchValue( this.modify_selectGetData.succesObject);
     //this.saveForm.patchValue({salesOrgId:this.modify_selectGetData.succesObject.salesOrgId})
     this.loadPlant(this.modify_selectGetData.succesObject.salesOrgId);
     console.log("patched :",this.saveForm)
    
     this.componentLoaderService.display(false);
   }, error => {
     if (error.status === 401) {
       alert("Error");
     }
   });
  }


  getPlant(val, saveForm) {
    this.salesId = val;
    console.log(" Rathika _ saveForm", saveForm);
    saveForm.controls.plantId.value = "";
    this.plantCombo = [];

    this.customerViewService.loadPlant(val).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.plantCombo = resp.succesObject;
              console.log("Plant value", this.plantCombo);
      },
      error => {
        alert(error);
      }
    );
  }

  /** Plant Combo */
  loadPlant(value){
    let plantCombo = this.customerViewService.loadPlant(value).subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.plantCombo = resp.succesObject;
        console.log("Plant value",this.plantCombo);
      },
      error => {
        alert(error);
      }
    );
   }



}



