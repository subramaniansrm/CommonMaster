import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from "./auth.routing";
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    routing
  ]
})
export class AuthModule { }

