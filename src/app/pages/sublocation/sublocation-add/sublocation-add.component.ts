
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { SublocationAddService } from './sublocation-add.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';

@Component({
  selector: 'app-sublocation-add',
  templateUrl: './sublocation-add.component.html',
  styleUrls: ['./sublocation-add.component.css']
})

export class SublocationAddComponent implements OnInit {
  saveForm: FormGroup;
  subLocate_selectFormGetDate: any;
  userBaseFieldName: any = [];
  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router,
    private formBuilder: FormBuilder, private dialog: MatDialog, private sublocationAddService: SublocationAddService) {
    this.subLocate_selectFormGetDate = [];
   }
  ngOnInit() {
    this.componentLoaderService.display(true);
    this.saveForm = this.formBuilder.group({
      subLocationCode: [''],
      id: ['', Validators.required],
      subLocationName: ['', Validators.required],
      subLocationIsActive: [true],
      accessToken  : [localStorage.getItem("kiosk_access_token")]
    });
    this.onloadSelectboxData();
  }
  SL_add_Submit(tempData) : void {
   this.sublocationAddService.addProjectList(tempData).subscribe(data =>{
     let sublocation_add_data = JSON.parse(data['_body']);
   },
   error=>{
     if(error.status === 401)
     {
       alert("Error");
     }
   })
 }
 clearForm() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/sublocation/sublocation-add']));
}
onloadSelectboxData() {
  this.sublocationAddService.sublocationaddscreen().subscribe(data => {
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
  let loadSelectBoxList = this.sublocationAddService.load_selectBoxData().subscribe(data => {
    let subLocate_selectGetData = JSON.parse(data['_body']);
    this.subLocate_selectFormGetDate = subLocate_selectGetData.succesObject;
  }, error => {
    if(error.status === 401)
    {
      alert("Error");
    }
  })
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
   // finalval.screenFieldDisplayVoList = this.userBaseFieldName;
    console.log(finalval);
    this.sublocationAddService.addProjectList(finalval).subscribe(data => {
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
          this.router.navigate(['/sublocation'])
        })
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
    })
  }
}
}
