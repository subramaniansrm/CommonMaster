import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent
  },
  {
    path: "",
    loadChildren: './location-add/location-add.module#LocationAddModule'
  },
  {
    path: "",
    loadChildren: './location-modify/location-modify.module#LocationModifyModule'
  },
  {
    path: "",
    loadChildren: './location-view/location-view.module#LocationViewModule'
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }


