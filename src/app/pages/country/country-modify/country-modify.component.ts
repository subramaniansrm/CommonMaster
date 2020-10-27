import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { CountryModifyService } from './country-modify.service';
import { CountryViewService } from '../country-view/country-view.service';



@Component({
  selector: 'app-country-modify',
  templateUrl: './country-modify.component.html',
  styleUrls: ['./country-modify.component.css']
})
export class CountryModifyComponent implements OnInit {
  saveForm: FormGroup;
  userBaseFieldName: any = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private componentLoaderService: ComponentLoaderService,
    private countryModifyService  :CountryModifyService,
    private countryViewService : CountryViewService

  ) { }

  ngOnInit() {


    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      countryCode: ['', Validators.required],
      country :[''],
      accessToken :[localStorage.getItem("kiosk_access_token")]
     
   });
    this.onLoad();

    this.componentLoaderService.display(false);//the code i added
  }
  onLoad() {
    
    let departmentmodifyData = this.countryViewService.viewData().subscribe(data => {
      let modify_selectGetData = JSON.parse(data['_body']);
      console.log(modify_selectGetData);
 
      this.saveForm.patchValue(modify_selectGetData.succesObject);
       
      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
  }
  onSubmit() {
   
    let formvalue = Object.assign(this.saveForm.value, {id : localStorage.getItem('id')});
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
      this.countryModifyService.modify(finalval).subscribe(data => {
        let Response = JSON.parse(data['_body']);
        if (Response.responseCode === '200') {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false,
            panelClass: 'btnCenter',
            width: 'auto',
            data: {
              title: 'Info',
              server:'servermessage',
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
              server:'servermessage',
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
