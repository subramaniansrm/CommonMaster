import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  saveForm: FormGroup;
  salesCombo :any;
  salesOrgFilter :any;
  distributionChannelFilter:any;
  channelCombo:any;
  plantFilter:any;
  plantCombo:any;
  cityCombo:any;
  cityFilter : any;
  salesId: any;
  userBaseFieldName:any



  constructor(
    private componentLoaderService: ComponentLoaderService,
    private customerService : CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
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
    this.loadDropDown();
    
    this.componentLoaderService.display(false);
  }



  loadDropDown(){

    this.customerService.loadAuthCustomer().subscribe(data => {
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

    let salesOrgCombo = this.customerService.loadSales().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.salesCombo = division_selectGetData.succesObject;
      console.log("Sale drop down : ", this.salesCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });



    let city = this.customerService.loadCity().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.cityCombo = division_selectGetData.succesObject;
      console.log("Sale drop down : ", this.salesCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });



    let channelDisCombo = this.customerService.loadChannel().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.channelCombo = division_selectGetData.succesObject;
      console.log("channelCombo tyoe drop down : ", this.channelCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }




  debugger;
  getPlant(val, saveForm) {
    this.salesId = val;
    console.log(" Rathika _ saveForm", saveForm);
    saveForm.controls.plantId.value = "";
    this.plantCombo = [];

    this.customerService.loadPlant(val).subscribe(
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
      this.componentLoaderService.display(true);
      let finalval: any = {};

      finalval = formvalue;
      console.log(finalval);
      this.customerService.addCustomer(finalval).subscribe(data => {
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
            this.router.navigate(['/customer']);
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



}
