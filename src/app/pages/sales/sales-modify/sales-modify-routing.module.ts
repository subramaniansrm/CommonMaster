import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesModifyComponent } from './sales-modify.component';

const routes: Routes = [
  {
    path: 'sales-modify',
    component: SalesModifyComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesModifyRoutingModule { }
