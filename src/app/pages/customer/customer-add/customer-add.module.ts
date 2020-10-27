import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAddRoutingModule } from './customer-add-routing.module';
import { CustomerAddComponent } from './customer-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [CustomerAddComponent],
  imports: [
    CommonModule,
    CustomerAddRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class CustomerAddModule { }
