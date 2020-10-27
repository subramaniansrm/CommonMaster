import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { SalesModifyService } from './sales-modify.service';
import { SalesViewService } from '../sales-view/sales-view.service';
@Component({
  selector: 'app-sales-modify',
  templateUrl: './sales-modify.component.html',
  styleUrls: ['./sales-modify.component.css']
})
export class SalesModifyComponent implements OnInit {
  saveForm: FormGroup;
  salesCombo: any;
  modify_selectGetData: any;
  countryFilter: any;
  categoryCombo: any = [];
  userBaseFieldName:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private componentLoaderService: ComponentLoaderService,
    private salesModifyService: SalesModifyService,
    private salesViewService: SalesViewService
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

  onSubmit() {

    let formvalue = Object.assign(this.saveForm.value, { id: localStorage.getItem('id') });
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
      this.salesModifyService.modifySales(finalval).subscribe(data => {
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
            this.router.navigate(['/sales']);
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
