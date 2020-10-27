import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent
  },
  {
    path: "",
    loadChildren: './sales-add/sales-add.module#SalesAddModule'
  },
  {
    path: "",
    loadChildren: './sales-modify/sales-modify.module#SalesModifyModule'
  },
  {
    path: "",
    loadChildren: './sales-view/sales-view.module#SalesViewModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
