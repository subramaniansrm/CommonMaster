import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSampleComponent } from './master-sample.component';

const routes: Routes = [{
  path: '',
  component: MasterSampleComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSampleRoutingModule { }
