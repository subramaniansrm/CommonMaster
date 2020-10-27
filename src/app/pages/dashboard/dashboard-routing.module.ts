import { DashviewComponent } from './dashview/dashview.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderService } from '../../shared/layout/app-layout/header/header.service';
const routes: Routes = [{
  path: '',
  component:DashviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
