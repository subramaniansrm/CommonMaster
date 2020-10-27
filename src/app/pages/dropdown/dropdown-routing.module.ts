import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropdownComponent } from './dropdown.component';

const routes: Routes = [
  {
    path: '',
    component: DropdownComponent
  },
  {
    path: "",
    loadChildren: './dropdown-add/dropdown-add.module#DropdownAddModule'
  },
  {
    path: "",
    loadChildren: './dropdown-view/dropdown-view.module#DropdownViewModule'
  },
  {
    path: "",
    loadChildren: './dropdown-modify/dropdown-modify.module#DropdownModifyModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownRoutingModule { }
