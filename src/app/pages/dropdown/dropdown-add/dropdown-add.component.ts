import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { DropdownService } from '../dropdown.service';
@Component({
  selector: 'app-dropdown-add',
  templateUrl: './dropdown-add.component.html',
  styleUrls: ['./dropdown-add.component.css']
})
export class DropdownAddComponent implements OnInit {

  saveForm: FormGroup;
  userBaseFieldName:any;
  fieldFilter : any;
  salesOrgFilter: any;
  salesCombo: any;
  fieldCombo: any;

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private dropdownService : DropdownService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
    
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
    this.loadDropDown();

    this.dropdownService.authCommonDrop().subscribe(data => {
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
    
    this.componentLoaderService.display(false);
  }


  loadDropDown(){
     
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
      this.dropdownService.addDropDown(finalval).subscribe(data => {
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
            this.router.navigate(['/dropdown']);
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
