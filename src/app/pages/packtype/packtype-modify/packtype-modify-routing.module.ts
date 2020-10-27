import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacktypeModifyComponent } from './packtype-modify.component';

const routes: Routes = [
  {
    path: 'packtype-modify',
    component:PacktypeModifyComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacktypeModifyRoutingModule { }
