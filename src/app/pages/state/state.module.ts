import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StateAddComponent } from './state-add/state-add.component';
import { StateviewComponent } from './stateview/stateview.component';
import { StateModifyComponent } from './state-modify/state-modify.component';

@NgModule({
  declarations: [StateComponent],
  imports: [
    CommonModule,
    StateRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class StateModule { }
