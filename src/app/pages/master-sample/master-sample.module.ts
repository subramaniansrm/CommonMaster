import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterSampleComponent } from './master-sample.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule, MatButtonModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MasterSampleRoutingModule } from './master-sample-routing.module';

@NgModule({
  declarations: [MasterSampleComponent],
  imports: [
    CommonModule,
    MasterSampleRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ]
})
export class MasterSampleModule { }
