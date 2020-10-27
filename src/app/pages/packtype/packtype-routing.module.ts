import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacktypeComponent } from './packtype.component';

const routes: Routes = [
  {
    path: '',
    component:PacktypeComponent
  },
  {
    path: "",
    loadChildren: './packtype-add/packtype-add.module#PacktypeAddModule'
  },
  {
    path: "",
    loadChildren: './packtype-modify/packtype-modify.module#PacktypeModifyModule'
  },
  {
    path: "",
    loadChildren: './packtype-view/packtype-view.module#PacktypeViewModule'
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacktypeRoutingModule { }
