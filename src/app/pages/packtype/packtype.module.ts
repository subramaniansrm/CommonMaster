import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacktypeRoutingModule } from './packtype-routing.module';
import { PacktypeComponent } from './packtype.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PacktypeAddComponent } from './packtype-add/packtype-add.component';
import { PacktypeModifyComponent } from './packtype-modify/packtype-modify.component';
import { PacktypeViewComponent } from './packtype-view/packtype-view.component';

@NgModule({
  declarations: [PacktypeComponent],
  imports: [
    CommonModule,
    PacktypeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PacktypeModule { }
