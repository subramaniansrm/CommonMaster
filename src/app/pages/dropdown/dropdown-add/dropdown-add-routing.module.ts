import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropdownAddComponent } from './dropdown-add.component';

const routes: Routes = [
  {
    path: 'dropdown-add',
    component:DropdownAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownAddRoutingModule { }
