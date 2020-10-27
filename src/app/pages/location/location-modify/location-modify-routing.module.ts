import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationModifyComponent } from './location-modify.component';

const routes: Routes = [{
  path: 'location-modify',
  component: LocationModifyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationModifyRoutingModule { }
