import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropdownViewComponent } from './dropdown-view.component';

const routes: Routes = [
  {
    path: 'dropdown-view',
    component:DropdownViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownViewRoutingModule { }
