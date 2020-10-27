import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateAddComponent } from './state-add.component';

const routes: Routes = [
  {
    path: 'state-add',
    component:StateAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateAddRoutingModule { }
