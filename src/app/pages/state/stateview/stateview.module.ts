import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


import { StateviewRoutingModule } from './stateview-routing.module';
import { StateviewComponent } from './stateview.component';

@NgModule({
  declarations: [StateviewComponent],
  imports: [
    CommonModule,
    StateviewRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class StateviewModule { }
