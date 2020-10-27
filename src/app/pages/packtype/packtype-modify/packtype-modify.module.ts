import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacktypeModifyRoutingModule } from './packtype-modify-routing.module';
import { PacktypeModifyComponent } from './packtype-modify.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PacktypeModifyComponent],
  imports: [
    CommonModule,
    PacktypeModifyRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PacktypeModifyModule { }
