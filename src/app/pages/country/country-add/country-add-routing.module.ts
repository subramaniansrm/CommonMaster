import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryAddComponent } from './country-add.component';

const routes: Routes = [
  {
    path: '',
    component:CountryAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryAddRoutingModule { }
