import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateModifyComponent } from './state-modify.component';

const routes: Routes = [
  {
    path: 'state-modify',
    component:StateModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateModifyRoutingModule { }
