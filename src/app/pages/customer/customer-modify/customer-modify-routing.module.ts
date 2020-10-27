import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerModifyComponent } from './customer-modify.component';

const routes: Routes = [
  {
    path: 'customer-modify',
    component: CustomerModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerModifyRoutingModule { }
