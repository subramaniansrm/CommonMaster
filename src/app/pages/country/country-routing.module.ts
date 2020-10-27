import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';

const routes: Routes = [
  {
    path: '',
    component:CountryComponent
  }, 
  {
    path: "country-add",
    loadChildren: './country-add/country-add.module#CountryAddModule'
  },

  {
    path: 'country-view',
    loadChildren: './country-view/country-view.module#CountryViewModule'
  },
  {
    path: 'country-modify',
    loadChildren: './country-modify/country-modify.module#CountryModifyModule'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
