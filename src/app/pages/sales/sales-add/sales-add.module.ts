import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesAddRoutingModule } from './sales-add-routing.module';
import { SalesAddComponent } from './sales-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [SalesAddComponent],
  imports: [
    CommonModule,
    SalesAddRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class SalesAddModule { }
