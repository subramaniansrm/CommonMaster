import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryModifyRoutingModule } from './country-modify-routing.module';
import { CountryModifyComponent } from './country-modify.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CountryModifyComponent],
  imports: [
    CommonModule,
    CountryModifyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CountryModifyModule { }
