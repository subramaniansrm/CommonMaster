import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ]
})
export class ConfirmationDialogModule { }
