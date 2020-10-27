
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleModifyComponent } from './user-role-modify.component';

const routes: Routes = [{
  path: 'userrole-modify',
  component:UserRoleModifyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleModifyRoutingModule { }
