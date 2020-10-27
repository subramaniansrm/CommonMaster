
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { SublocationViewService } from './sublocation-view.service';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
@Component({
  selector: 'app-sublocation-view',
  templateUrl: './sublocation-view.component.html',
  styleUrls: ['./sublocation-view.component.css']
})
export class SublocationViewComponent implements OnInit {
  viewForm: FormGroup;
  SL_selectFormGetDate : any;
  userBaseFieldName: any = [];
  constructor(private componentLoaderService: ComponentLoaderService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog, private sublocationViewService: SublocationViewService) { }
  ngOnInit() {
    this.componentLoaderService.display(true);
    this.viewForm = this.formBuilder.group({
      subLocationCode: ["",],
      id: ["", Validators.required],
      subLocationName: ["", Validators.required],
      subLocationIsActive: ["", Validators.required],
    });
    this.onloadSelectboxData();
    this.sublocation_list_view();
  }
  sublocation_list_view() {
    let tempData = JSON.parse(window.localStorage.getItem('sublocationId'));
    this.sublocationViewService.load_modify_project(tempData).subscribe(data => {
      let subLocationModifyListGetData = JSON.parse(data['_body']);
      let subLocationModifyList_TableData = subLocationModifyListGetData.succesObject;
      this.userBaseFieldName = subLocationModifyListGetData.authSuccesObject.screenFieldMappingVOList.map(
        element => {
          console.log(element);
          return element;
        }
      );
      console.log(this.userBaseFieldName);
      this.viewForm.patchValue(subLocationModifyList_TableData);
      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });
}
onloadSelectboxData() {
  let loadSelectBoxList = this.sublocationViewService.load_selectBoxData().subscribe(data => {
    let SL_selectGetData = JSON.parse(data['_body']);
    this.SL_selectFormGetDate = SL_selectGetData.succesObject;
  }, error => {
    if (error.status === 401) {
      alert("Error");
    }
  })
}
ngOnDestroy(){
  localStorage.removeItem('sublocationId');
}

}
