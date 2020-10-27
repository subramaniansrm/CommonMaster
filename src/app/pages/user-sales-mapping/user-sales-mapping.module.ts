import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSalesMappingRoutingModule } from './user-sales-mapping-routing.module';
import { UserSalesMappingComponent } from './user-sales-mapping.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewUserSalesComponent } from './view-user-sales/view-user-sales.component';


@NgModule({
  declarations: [UserSalesMappingComponent],
  imports: [
    CommonModule,
    UserSalesMappingRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserSalesMappingModule { }
