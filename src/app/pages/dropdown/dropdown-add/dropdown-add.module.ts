import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownAddRoutingModule } from './dropdown-add-routing.module';
import { DropdownAddComponent } from './dropdown-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [DropdownAddComponent],
  imports: [
    CommonModule,
    DropdownAddRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class DropdownAddModule { }
