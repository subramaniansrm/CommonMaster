
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleViewComponent } from './user-role-view.component';

const routes: Routes = [{
  path: 'userrole-view',
  component:UserRoleViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleViewRoutingModule { }
