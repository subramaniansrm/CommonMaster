import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { SalesAddService } from '../../sales/sales-add/sales-add.service';
import { PackTypeService } from '../pack-type.service';

@Component({
  selector: 'app-packtype-modify',
  templateUrl: './packtype-modify.component.html',
  styleUrls: ['./packtype-modify.component.css']
})
export class PacktypeModifyComponent implements OnInit {
  saveForm: FormGroup;
  userBaseFieldName  : any;
  salesCombo: any;
  packSizeCombo: any;
  modify_selectGetData: any;
  packTypeFilter:any;
  salesOrgFilter:any;

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private salesAddService : SalesAddService,
    private PackTypeService : PackTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
    
  ) { }

  ngOnInit() {
    
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      packTypeName : ['', Validators.required],
      salesOrgId: ['', Validators.required],
      activeFlag: [true, Validators.required],
      packSize:['',Validators.required],
     
     
    });
    this.loadDropDown();
   
    this.componentLoaderService.display(false);
  }


  getPackSize(val){
    this.PackTypeService.loadPackSize(val).subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.packSizeCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

  }

  loadDropDown(){


    
    this.PackTypeService.loadSales().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.salesCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

    let departmentmodifyData = this.PackTypeService.viewData().subscribe(data => {
      this.modify_selectGetData = JSON.parse(data['_body']);
      this.userBaseFieldName = this.modify_selectGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        });
        this.getPackSize(this.modify_selectGetData.succesObject.salesOrgId)

        this.saveForm.patchValue(this.modify_selectGetData.succesObject)
      });

  }

  onSubmit() {
    let formvalue = Object.assign(this.saveForm.value, { id: localStorage.getItem('id')});
    
  
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
      this.PackTypeService.modifyPackType(finalval).subscribe(data => {
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
            this.router.navigate(['/packType']);
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
