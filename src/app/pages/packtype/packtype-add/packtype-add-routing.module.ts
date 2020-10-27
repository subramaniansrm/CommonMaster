import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacktypeAddComponent } from './packtype-add.component';

const routes: Routes = [
  {
    path: 'packtypeadd',
    component:PacktypeAddComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacktypeAddRoutingModule { }
