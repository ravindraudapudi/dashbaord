import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataTableModule, DropdownModule, ButtonModule, DialogModule, KeyFilterModule, } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { CONFIG_ROUTES } from './configs-route.module';

import { ChaptersComponent } from './chapters/chapters.component';
import { GoalsComponent } from './goals/goals.component';
import { FydataComponent } from './fydata/fydata.component';
import { UserHomeComponent } from '../common/users-mgmt/user-home/user-home.component';
import { UtilsModule } from '../utils/utils.module';
import { PipelineComponent } from './pipeline/pipeline.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
    , RadioButtonModule
    , MultiSelectModule
    , TooltipModule
    , TableModule
    , DataTableModule
    , UtilsModule
    , ConfirmDialogModule
    , DropdownModule
    , ButtonModule
    , KeyFilterModule
    , DialogModule
    , CONFIG_ROUTES
  ],
  declarations: [
      ChaptersComponent
    , GoalsComponent
    , FydataComponent
    , UserHomeComponent
    , PipelineComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ConfirmationService
  ],
})
export class ConfigsModule { }
