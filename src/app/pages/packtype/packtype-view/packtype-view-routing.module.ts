import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacktypeViewComponent } from './packtype-view.component';

const routes: Routes = [
  {
    path: 'packtypeview',
    component:PacktypeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacktypeViewRoutingModule { }
