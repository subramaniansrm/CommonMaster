import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateviewModule } from './stateview.module';
import { StateviewComponent } from './stateview.component';

const routes: Routes = [
  {
    path: 'state-view',
    component: StateviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateviewRoutingModule { }
