// import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
  OnDestroy
} from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  VERSION,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { ComponentLoaderService } from '../../shared/component-loader.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  saveForm: FormGroup;
  pastRouter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  requestBaseFieldName: any = [];
  dataSource: any = [];
  rowindex: any;
  searchRowscount: number = 0;
  displayMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private componentLoaderService: ComponentLoaderService,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.pastRouter = this.router.url;

  }

  ngOnInit() {
    this.displayMessage = this.data.message;
    this.saveForm = this.formBuilder.group({
      remarks: ['', Validators.required],
    });
  }
  onSubmit() {


    if (this.saveForm.valid) {
      this.dialogRef.close();
    }
}


  btnPrjYes(){
    localStorage.setItem('isCancelled', 'No');
  }
  btnPrjNo(){
    localStorage.setItem('isCancelled', 'Yes');
  }
}
