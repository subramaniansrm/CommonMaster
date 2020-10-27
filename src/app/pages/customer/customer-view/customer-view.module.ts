import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerViewRoutingModule } from './customer-view-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CustomerViewComponent } from './customer-view.component';

@NgModule({
  declarations: [CustomerViewComponent],
  imports: [
    CommonModule,
    CustomerViewRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CustomerViewModule { }
