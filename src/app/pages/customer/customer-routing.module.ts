import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  },
  {
    path: "",
    loadChildren: './customer-add/customer-add.module#CustomerAddModule'
  },
  {
    path: "",
    loadChildren: './customer-view/customer-view.module#CustomerViewModule'
  },
  {
    path: "",
    loadChildren: './customer-modify/customer-modify.module#CustomerModifyModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
