
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashviewComponent } from './dashview/dashview.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    SharedModule,
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  declarations: [
    DashviewComponent,
  ]

})
export class DashboardModule { }
