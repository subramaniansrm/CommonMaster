import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BootstrapModule } from "./bootstrap.module";
import { MaterialModule } from "./material.module";
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MaterialFileInputModule,FileInputConfig,NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { LeftNavModule } from './left-nav/left-nav.module';
import {TasksModule} from './tasks/tasks.module';
import { ArrayFilterPipe } from './array-filter.pipe';
import { DropdownFilterPipe } from './dropdown-filter.pipe';
import {SlideshowModule} from 'ng-simple-slideshow';
export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BootstrapModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    LeftNavModule,
    TasksModule,
    SlideshowModule
  ],

  declarations: [
    AdvanceSearchComponent,
    ConfirmationDialogComponent,
    ArrayFilterPipe,
    DropdownFilterPipe
  ],

  entryComponents: [
    ConfirmationDialogComponent
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BootstrapModule,
    MaterialFileInputModule,
    LeftNavModule,
    TasksModule,
    ArrayFilterPipe,
    DropdownFilterPipe,
    SlideshowModule
  ],

  providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }]
})

export class SharedModule { }
