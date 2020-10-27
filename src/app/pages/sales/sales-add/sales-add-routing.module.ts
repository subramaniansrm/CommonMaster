import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesAddComponent } from './sales-add.component';

const routes: Routes = [
  {
    path: 'sales-add',
    component:SalesAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesAddRoutingModule { }
