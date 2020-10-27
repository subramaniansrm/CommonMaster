import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesViewRoutingModule } from './sales-view-routing.module';
import { SalesViewComponent } from './sales-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [SalesViewComponent],
  imports: [
    CommonModule,
    SalesViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class SalesViewModule { }
