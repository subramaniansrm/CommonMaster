import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSalesMappingComponent } from './user-sales-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: UserSalesMappingComponent
  },


  {
    path: "",
    loadChildren: './update/update.module#UpdateModule'
  },
  
  {
    path: "",
    loadChildren: './view-user-sales/view-user-sales.module#ViewUserSalesModule'
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSalesMappingRoutingModule { }
