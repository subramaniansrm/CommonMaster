import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacktypeAddRoutingModule } from './packtype-add-routing.module';
import { PacktypeAddComponent } from './packtype-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [PacktypeAddComponent],
  imports: [
    CommonModule,
    PacktypeAddRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PacktypeAddModule { }
