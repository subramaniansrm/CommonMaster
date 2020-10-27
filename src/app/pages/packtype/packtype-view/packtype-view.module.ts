import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacktypeViewRoutingModule } from './packtype-view-routing.module';
import { PacktypeViewComponent } from './packtype-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [PacktypeViewComponent],
  imports: [
    CommonModule,
    PacktypeViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule

  ]
})
export class PacktypeViewModule { }
