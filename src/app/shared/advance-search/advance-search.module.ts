import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AdvanceSearchComponent } from './advance-search.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  // declarations: [AdvanceSearchComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ]
})
export class AdvanceSearchModule { }
