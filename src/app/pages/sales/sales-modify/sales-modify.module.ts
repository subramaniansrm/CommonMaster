import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesModifyRoutingModule } from './sales-modify-routing.module';
import { SalesModifyComponent } from './sales-modify.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [SalesModifyComponent],
  imports: [
    CommonModule,
    SalesModifyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class SalesModifyModule { }
