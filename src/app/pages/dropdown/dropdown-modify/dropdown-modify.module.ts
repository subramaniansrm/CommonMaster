import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModifyRoutingModule } from './dropdown-modify-routing.module';
import { DropdownModifyComponent } from './dropdown-modify.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropdownModifyComponent],
  imports: [
    CommonModule,
    DropdownModifyRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DropdownModifyModule { }
