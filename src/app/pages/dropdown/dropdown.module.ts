import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownRoutingModule } from './dropdown-routing.module';
import { DropdownComponent } from './dropdown.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { DropdownViewComponent } from './dropdown-view/dropdown-view.component';
import { DropdownModifyComponent } from './dropdown-modify/dropdown-modify.component';

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    CommonModule,
    DropdownRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MaterialModule
    
  ]
})
export class DropdownModule { }
