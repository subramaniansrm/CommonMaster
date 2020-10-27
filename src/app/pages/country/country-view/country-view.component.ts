import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { CountryViewService } from './country-view.service';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit {


  saveForm: FormGroup;
  userBaseFieldName: any = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private countryViewService : CountryViewService,
    private componentLoaderService: ComponentLoaderService
  
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
}
