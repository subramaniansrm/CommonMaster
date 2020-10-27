import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavRoutingModule } from './left-nav-routing.module';
import { LeftNavComponent } from './left-nav.component';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LeftNavComponent],
  imports: [
    CommonModule,
    LeftNavRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedModule
  ],
  exports: [
    LeftNavComponent
  ]
})
export class LeftNavModule { }
