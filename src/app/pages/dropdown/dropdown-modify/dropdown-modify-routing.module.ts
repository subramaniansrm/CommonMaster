import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropdownModifyComponent } from './dropdown-modify.component';

const routes: Routes = [
  {
    path: 'dropdown-modify',
    component:DropdownModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownModifyRoutingModule { }
