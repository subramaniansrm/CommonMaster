import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryAddRoutingModule } from './country-add-routing.module';
import { CountryAddComponent } from './country-add.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CountryAddComponent],
  imports: [
    CommonModule,
    CountryAddRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CountryAddModule { }
