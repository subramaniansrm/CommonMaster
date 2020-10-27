import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUserSalesComponent } from './view-user-sales.component';

const routes: Routes = [
  {
    path: 'viewAuth',
    component:ViewUserSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewUserSalesRoutingModule { }
