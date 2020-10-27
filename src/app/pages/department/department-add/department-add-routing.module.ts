import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentAddComponent } from './department-add.component';

const routes: Routes = [{
  path: 'department-add',
  component:DepartmentAddComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentAddRoutingModule { }
