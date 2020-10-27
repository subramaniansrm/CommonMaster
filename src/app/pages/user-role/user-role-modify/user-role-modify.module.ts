
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleModifyRoutingModule } from './user-role-modify-routing.module';
import { UserRoleModifyComponent } from './user-role-modify.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserRoleModifyComponent],
  imports: [
    CommonModule,
    UserRoleModifyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserRoleModifyModule { }
