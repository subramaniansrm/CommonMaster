import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StateAddRoutingModule } from './state-add-routing.module';
import { StateAddComponent } from './state-add.component';

@NgModule({
  declarations: [StateAddComponent],
  imports: [
    CommonModule,
    StateAddRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class StateAddModule { }
