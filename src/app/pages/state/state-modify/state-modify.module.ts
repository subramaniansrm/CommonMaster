import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { StateModifyRoutingModule } from './state-modify-routing.module';
import { StateModifyComponent } from './state-modify.component';

@NgModule({
  declarations: [StateModifyComponent],
  imports: [
    CommonModule,
    StateModifyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class StateModifyModule { }
