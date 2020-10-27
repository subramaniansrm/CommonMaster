import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { LocationAddService } from '../../location/location-add/location-add.service';
import { StateModifyService } from './state-modify.service';
import { StateViewService } from '../stateview/state-view.service';

@Component({
  selector: 'app-state-modify',
  templateUrl: './state-modify.component.html',
  styleUrls: ['./state-modify.component.css']
})
export class StateModifyComponent implements OnInit {
  saveForm: FormGroup;
  userBaseFieldName: any = [];
  
  countryFilter: any;
  countryCombo : any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private locationAddService: LocationAddService,
    private stateModifyService : StateModifyService,
    private componentLoaderService: ComponentLoaderService,
    private stateViewService  :StateViewService
  ) { }

  ngOnInit() {
    
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
     stateName: ['', Validators.required],
     countryId: ['', Validators.required],
     accessToken : [localStorage.getItem("kiosk_access_token")]
     
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

    let departmentmodifyData = this.stateViewService.viewData().subscribe(data => {
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
   
    let formvalue = Object.assign(this.saveForm.value, {stateId : localStorage.getItem('stateId')});
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
      this.stateModifyService.modifyState(finalval).subscribe(data => {
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
