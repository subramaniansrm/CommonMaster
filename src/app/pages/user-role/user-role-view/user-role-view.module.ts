
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleViewRoutingModule } from './user-role-view-routing.module';
import { UserRoleViewComponent } from './user-role-view.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserRoleViewComponent],
  imports: [
    CommonModule,
    UserRoleViewRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserRoleViewModule { }
