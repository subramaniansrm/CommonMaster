import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { StateViewService } from './state-view.service';
import { LocationAddService } from '../../location/location-add/location-add.service';
@Component({
  selector: 'app-stateview',
  templateUrl: './stateview.component.html',
  styleUrls: ['./stateview.component.css']
})
export class StateviewComponent implements OnInit {

  saveForm: FormGroup;
  userBaseFieldName: any = [];
  countryCombo : any;
  countryFilter: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private locationAddService: LocationAddService,
    private stateviewService : StateViewService,
    private componentLoaderService: ComponentLoaderService
  ) { }

  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
     stateName: ['', Validators.required],
     countryId: ['', Validators.required],
     
    });
    this.onLoad();

    this.componentLoaderService.display(false);//the code i added

    
  }
  onLoad() {

    let divisionCombo = this.locationAddService.load_countryselectBoxData().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.countryCombo = division_selectGetData.succesObject;
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
 

    let departmentmodifyData = this.stateviewService.viewData().subscribe(data => {
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
