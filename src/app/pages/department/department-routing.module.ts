import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent
  },
  {
    path: "",
    loadChildren: './department-add/department-add.module#DepartmentAddModule'
  },
  {
    path: "",
    loadChildren: './department-modify/department-modify.module#DepartmentModifyModule'
  },
  {
    path: "",
    loadChildren: './department-view/department-view.module#DepartmentViewModule'
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }

