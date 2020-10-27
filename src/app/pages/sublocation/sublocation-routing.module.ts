
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SublocationComponent } from './sublocation.component';

const routes: Routes = [{
  path: '',
  component:SublocationComponent
},
{
  path: "",
  loadChildren: "./sublocation-add/sublocation-add.module#SublocationAddModule"
},
{
  path: "",
  loadChildren: "./sublocation-modify/sublocation-modify.module#SublocationModifyModule"
},
{
  path: "",
  loadChildren: "./sublocation-view/sublocation-view.module#SublocationViewModule"
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SublocationRoutingModule { }
