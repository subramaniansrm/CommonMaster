import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryModifyComponent } from './country-modify.component';

const routes: Routes = [
  {
    path: '',
    component:CountryModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryModifyRoutingModule { }
