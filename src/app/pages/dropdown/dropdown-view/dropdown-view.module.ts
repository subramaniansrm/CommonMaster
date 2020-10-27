import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownViewRoutingModule } from './dropdown-view-routing.module';
import { DropdownViewComponent } from './dropdown-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [DropdownViewComponent],
  imports: [
    CommonModule,
    DropdownViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class DropdownViewModule { }
