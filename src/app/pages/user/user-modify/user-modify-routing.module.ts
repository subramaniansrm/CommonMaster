
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserModifyComponent } from './user-modify.component';

const routes: Routes = [{
  path: 'user-modify',
  component:UserModifyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModifyRoutingModule { }
