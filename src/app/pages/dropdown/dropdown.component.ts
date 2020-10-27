import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../shared/component-loader.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownService } from './dropdown.service';

export interface dropdownlist {

  highlighted?: boolean;
  hovered?: boolean;
  id: number;
}
const ELEMENT_DATA: dropdownlist[] = [];
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  dataSource: any = [];
  displayNoRecords = true;
  userRoleFieldName: any;
  rowindex: any;
  stateId: number;
  searchCombo: any;
  qtd: any = [];
  qtm: any = '';
  statuslist = [{ name: 'Active' }, { name: 'InActive' }];
  add = false;
  modify = false;
  view = false;
  delete = false;
  count: number;
  selection = new SelectionModel<dropdownlist>(true, []);
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unitCombo: any;

  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dropdownService : DropdownService,
    private componentLoaderService: ComponentLoaderService,
  
  ) { 
    this.userRoleFieldName = ['select', 'dropdownCode', 'dropdownName','dropdownFieldName', 'status'];
    this.dataSource = [];
    this.count = 1;
    this.displayNoRecords = true;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  highlight(element: dropdownlist) {
    element.highlighted = !element.highlighted;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.filteredData.length > 0 || this.selection.selected.length > 0) {
      this.displayNoRecords = true;
      this.selection.clear();
      //this.rowindex.length = [];
    } else {
      this.displayNoRecords = false;
    }
  }


  ngOnInit() {
    this.componentLoaderService.display(true);
    this.searchForm = this.formBuilder.group({
      searchDatas: this.formBuilder.array([this.sequenceType()]),
      flag: [""],
    });
    this.dropDownData();
  }

  //To get all DropDown Details
  dropDownData(){
    let loadSublocationList = this.dropdownService.dropDownGetAll().subscribe(data => {
      let sublocationListGetData = JSON.parse(data['_body']);
      if (sublocationListGetData.responseCode === '200') {
      let sublocationListTableDate = sublocationListGetData.succesObject;
      console.log("table data Rathika : ", sublocationListTableDate)
      this.dataSource = [];
      if (sublocationListTableDate !== null) {
        this.dataSource = new MatTableDataSource(sublocationListTableDate);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayNoRecords = true;
      } else {
        this.displayNoRecords = false;
      }



      this.userRoleFieldName = sublocationListGetData.authSuccesObject.screenFieldMappingVOList;
      this.searchCombo = [{ name: 'Choose Field' }];
      let search = [
        { name: "DropDown Code", value: 'dropdownCode' },
        { name: "DropDown Name", value: 'dropdownName' },
        { name: "DropDownField Name", value: 'fieldName' },
        { name: "Sales Organisation", value: 'salesOrgName' },
        { name: "Status", value: 'status' },
      ];
      for (let k in search) {
        let ll = this.userRoleFieldName.includes(search[k].value);
        if (ll === true) {
          this.searchCombo.push(search[k]);
        }
      }
      let screenFunctionDisplayList = sublocationListGetData.authSuccesObject.screenFunctionMappingVOList;
      for (let k in screenFunctionDisplayList) {
        if (screenFunctionDisplayList[k] === 'ADD') {
          this.add = true;
        }
        if (screenFunctionDisplayList[k] === 'MODIFY') {
          this.modify = true;
        }
        if (screenFunctionDisplayList[k] === 'VIEW') {
          this.view = true;
        }
        if (screenFunctionDisplayList[k] === 'DELETE') {
          this.delete = true;
        }
      }
    }
    else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Alert',
          server: 'servermessage',
          message: sublocationListGetData.responseMessage,
          btnYes: 'OK',

        }
        

      });
      dialogRef.afterClosed().subscribe(data => {
        this.router.navigate(['/dashboard']);
      });

    }
    




      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });

    // let loadSearch = this.dropdownService.search1().subscribe(data => {
    //   let searchData = JSON.parse(data['_body']);
    //   let searchFields = searchData.authSuccesObject.screenField;
    //   console.log("Serach Data : ", searchFields);

    //   this.searchCombo = [{ name: 'Choose Field' }];
    //   let search = [
    //     { name: "DropDown Code", value: 'dropdownCode' },
    //     { name: "DropDown Name", value: 'dropdownName' },
    //     { name: "DropDown Field Name", value: 'dropdownFieldName' },
    //     { name: "Status", value: 'status' },
        

    //   ];
    //   for (let k in search) {
    //     let ll = this.userRoleFieldName.includes(search[k].value);
    //     if (ll === true) {
    //       this.searchCombo.push(search[k]);
    //     }
    //   }
    //   this.componentLoaderService.display(false);
    // }, error => {
    //   if (error.status === 401) {
    //     alert("Error");
    //   }
    // });

  }

  sequenceType() {
    return this.formBuilder.group({
      dropDownVal: [""],
      textVal: [""],

    })
  }

  addSequence(form) {
    let j = form.controls.searchDatas.controls.length;
    let i = j - 1;

    let dropvalue = form.controls.searchDatas.controls[i].controls.dropDownVal.value;
    let textVal = form.controls.searchDatas.controls[i].controls.textVal.value;
    console.log("drop down value of ", i, "is ", dropvalue);
    console.log("text down value of ", i, "is ", textVal);

    if (this.count <= this.userRoleFieldName.length - 2 && dropvalue !== null && textVal != null) {
      (
        this.searchForm.controls['searchDatas'] as FormArray).push(this.sequenceType());
      this.count++;
    }
  }
  deleteSequence() {
    if (this.count > 1) {
      (this.searchForm.controls['searchDatas'] as FormArray).removeAt(-1);
      this.count--;
      this.qtd.pop();
    }
  }

  changefield(val, ind, form) {
    form.controls.searchDatas.controls[ind].controls.textVal.reset();
    console.log(val, ind);
    console.log(this.qtd);
    let kk = this.hasNoDuplicates(this.qtd);
    console.log(kk);
    if (kk === true) {

    } else {
      this.qtd[ind] = {};
      form.controls.searchDatas.controls[ind].controls.dropDownVal.reset();
      form.controls.searchDatas.controls[ind].controls.textVal.reset();
    }
  }
  hasNoDuplicates(arr) {
    return arr.every(num => arr.indexOf(num) === arr.lastIndexOf(num));
  }



  searchClear(){

    for (let i = 0; i < this.searchForm.value.searchDatas.length; i++) {
      this.deleteSequence();
    }
    this.displayNoRecords = true;
    this.ngOnInit();
    
  }


  projectView() {
    if (this.selection.selected.length === 1) {
      this.componentLoaderService.display(true);
      this.router.navigate(['/dropdown/dropdown-view']);
      let locId = this.selection.selected[0]['id'];/** code */
      localStorage.setItem('id', String(locId));/** code */
    } else if (this.selection.selected.length > 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'singleSelection',
          btnYes: 'OK',
        }
      });
    }
    else if (this.selection.selected.length < 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'selection',
          btnYes: 'OK',
        }
      });
    }
  }



  projectModify() {
    if (this.selection.selected.length === 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Confirmation',
          message: 'modify',
          btnPrjYes: 'Yes',
          btnPrjNo: 'No',
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.router.navigate(['/dropdown/dropdown-modify']);
          let rowId = String(this.selection.selected[0]['id']);
          localStorage.setItem('id', rowId);
          this.componentLoaderService.display(true);

        }
      });
    } else if (this.selection.selected.length > 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'singleSelection',
          btnYes: 'OK',
        }
      });
    }
    else if (this.selection.selected.length < 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        panelClass: 'btnCenter',
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'selection',
          btnYes: 'OK',
        }
      });
    }
  }

  removeSelectedRows() {
    if (this.selection.selected.length === 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        data: {
          title: 'Confirmation',
          message: 'delete',
          btnYes: 'Yes',
          btnNo: 'No',
        }
      });
      let id = [this.selection.selected[0].id];
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dropdownService.delete(id).subscribe(data => {
            let resp = JSON.parse(data['_body']);
            if (resp.responseCode == '200') {
              const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                disableClose: false,
                panelClass: 'btnCenter',
                width: 'auto',
                data: {
                  title: 'Info',
                  server: 'servermessage',
                  message: resp.responseMessage,
                  btnYes: 'Ok',
                }
              });
              dialogRef.afterClosed().subscribe(data => {
                this.dropDownData();
                this.selection.clear();
              });
            } else {
              const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                disableClose: false,
                width: 'auto',
                panelClass: 'btnCenter',
                data: {
                  title: 'Alert',
                  server: 'servermessage',
                  message: resp.responseMessage,
                  btnYes: 'Ok',
                }
              });
            }
          }, error => {
            if (error.status === 401) {
              alert("Error");
            }
          });
        }
      });
    } else if (this.selection.selected.length > 1) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        data: {
          title: 'Confirmation',
          message: 'delete',
          btnYes: 'Yes',
          btnNo: 'No',
        }
      });
      let id = [];
      for (let i = 0; i < this.selection.selected.length; i++) {
        id.push(this.selection.selected[i].id);
      }
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dropdownService.delete(id).subscribe(data => {
            let resp = JSON.parse(data['_body']);
            if (resp.responseCode == '200') {
              const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                disableClose: false,
                panelClass: 'btnCenter',
                width: 'auto',
                data: {
                  title: 'Info',
                  server: 'servermessage',
                  message: resp.responseMessage,
                  btnYes: 'Ok',
                }
              });

              dialogRef.afterClosed().subscribe(data => {
                this.dropDownData();
                this.selection.clear();
              });
            } else {
              const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                disableClose: false,
                panelClass: 'btnCenter',
                width: 'auto',
                data: {
                  title: 'Alert',
                  server: 'servermessage',
                  message: resp.responseMessage,
                  btnYes: 'Ok',
                }
              });
            }

          }, error => {
            if (error.status === 401) {
              alert("Error");
            }
          });
        }
      });
    } else if (this.selection.selected.length === 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        panelClass: 'btnCenter',
        data: {
          title: 'Alert',
          message: "selection",
          btnYes: 'Ok',
        }
      });
    }
  }



  onSubmitSearch(val) {
    console.log("DIsplay val", val);
    let finalSearchData = {};
    let formValue = val;
    for (let i = 0; i < formValue.searchDatas.length; i++) {
      let key = formValue.searchDatas[i]['dropDownVal'];
      let value = formValue.searchDatas[i]['textVal'];
      let fullValue = {}
      if (key != '' && value != '') {
        fullValue[key] = value;
        Object.assign(finalSearchData, fullValue);
      }
    }
    //['flag'] = val.flag; 

    console.log("Search form data", finalSearchData);

    finalSearchData['accessToken']  = localStorage.getItem("kiosk_access_token");
     this.dropdownService.search(finalSearchData).subscribe(data => {
      let reqScrConfigSearchData = JSON.parse(data['_body']);
      this.dataSource = [];
      if (reqScrConfigSearchData.succesObject !== null) {
        this.dataSource = new MatTableDataSource(reqScrConfigSearchData.succesObject);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayNoRecords = true;
      } else {
        this.displayNoRecords = false;
      }
    })
    setTimeout(() => {
      if (this.dataSource.filteredData.length > 0 || this.selection.selected.length > 0) {
        this.displayNoRecords = true;
        this.selection.clear();
      } else {
        this.displayNoRecords = false;
      }
    }, 100);
  }







}
