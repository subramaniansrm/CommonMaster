
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { CountryAddService } from './country-add.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {
  saveForm: FormGroup;

  constructor(
    private componentLoaderService: ComponentLoaderService,
    private countryAddService : CountryAddService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
    
  ) { }

  ngOnInit() {

    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      countryCode: ['', Validators.required],
      country :[''],
      accessToken :[localStorage.getItem("kiosk_access_token")]
     
    });
    
    this.componentLoaderService.display(false);//the code i added
  
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
      console.log(finalval);
      this.countryAddService.addCountry(finalval).subscribe(data => {
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
            this.router.navigate(['/state']);
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
