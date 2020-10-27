import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserSalesRoutingModule } from './view-user-sales-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ViewUserSalesComponent } from './view-user-sales.component';

@NgModule({
  declarations: [ViewUserSalesComponent],
  imports: [
    CommonModule,
    ViewUserSalesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ViewUserSalesModule { }
