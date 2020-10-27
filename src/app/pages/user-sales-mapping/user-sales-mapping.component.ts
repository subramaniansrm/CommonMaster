import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../shared/component-loader.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSalesMappingService } from './user-sales-mapping.service';

export interface mappingList {

  highlighted?: boolean;
  hovered?: boolean;
  id: number;
}
const ELEMENT_DATA: mappingList[] = [];
@Component({
  selector: 'app-user-sales-mapping',
  templateUrl: './user-sales-mapping.component.html',
  styleUrls: ['./user-sales-mapping.component.css']
})
export class UserSalesMappingComponent implements OnInit {

  dataSource: any = [];
  displayNoRecords = true;
  userRoleFieldName: any;
  rowindex: any;
  stateId: number;
  searchCombo: any;
  qtd: any = [];
  qtm: any = '';
  count: number;
  selection = new SelectionModel<mappingList>(true, []);
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private userSalesMappingService : UserSalesMappingService,
    private componentLoaderService: ComponentLoaderService,
  ) { 
    this.userRoleFieldName = ['select', 'firstName', 'userLocationName', 'subLocationName', 'userDepartmentName'];
  this.dataSource = [];
  this.count = 1;
  this.displayNoRecords = true;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  highlight(element: mappingList) {
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
    this.userList();

    
  }

//Method used to load List page
  userList(){
    let loadSublocationList = this.userSalesMappingService.getAll().subscribe(data => {
      let sublocationListGetData = JSON.parse(data['_body']);
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




      this.componentLoaderService.display(false);
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });



  }


  projectView() {
    if (this.selection.selected.length === 1) {
      this.componentLoaderService.display(true);
      this.router.navigate(['/authCommon/viewAuth']);
      let locId = this.selection.selected[0]['id'];/** code */
      localStorage.setItem('authId', String(locId));/** code */
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
          this.router.navigate(['/authCommon/updateAuth']);
          let rowId = String(this.selection.selected[0]['id']);
          localStorage.setItem('authId', rowId);
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

  

}
