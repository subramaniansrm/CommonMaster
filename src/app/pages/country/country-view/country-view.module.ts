import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryViewRoutingModule } from './country-view-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryViewComponent } from './country-view.component';
import { CountryViewService } from './country-view.service';

@NgModule({
  declarations: [CountryViewComponent],
  imports: [
    CommonModule,
    CountryViewRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [CountryViewService]
})
export class CountryViewModule { }
