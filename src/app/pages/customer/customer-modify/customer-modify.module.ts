import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerModifyRoutingModule } from './customer-modify-routing.module';
import { CustomerModifyComponent } from './customer-modify.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [CustomerModifyComponent],
  imports: [
    CommonModule,
    CustomerModifyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CustomerModifyModule { }
