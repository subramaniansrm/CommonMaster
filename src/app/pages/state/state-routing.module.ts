import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateComponent } from './state.component';

const routes: Routes = [
  {
    path: '',
    component: StateComponent
  },
  {
    path: "",
    loadChildren: './state-add/state-add.module#StateAddModule'
  },
  {
    path: "",
    loadChildren: './stateview/stateview.module#StateviewModule'
  },
  {
    path: "",
    loadChildren: './state-modify/state-modify.module#StateModifyModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
