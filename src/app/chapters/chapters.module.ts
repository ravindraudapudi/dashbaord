import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
// import {} from 'primeng/primeng';
import { TooltipModule, KeyFilterModule, ConfirmationService, DropdownModule,CalendarModule} from 'primeng/primeng';
import { ReportsModule } from '../reports/reports.module';
import { MembershipsModule } from '../memberships/memberships.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CHAPTERS_ROUTES } from './chapters-route.module';
import { ConfigService } from '../configs/services/config.service';
import { OverviewComponent } from './overview/overview.component';
import { DetailMetricsComponent } from './detail-metrics/detail-metrics.component';
import { ChaptersMembershipComponent } from './chapters-membership/chapters-membership.component';
import { ChaptersRevenueComponent } from './chapters-revenue/chapters-revenue.component';
import { ChaptersSponsorshipComponent } from './chapters-sponsorship/chapters-sponsorship.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { UtilsModule } from '../utils/utils.module';
import { BoardmembersComponent } from './boardmembers/boardmembers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { boardMembers } from '../utils/pipes/trasformations.pipes';
import { SponsorshipPipelineComponent } from '../chapters/sponsorship-pipeline/sponsorship-pipeline.component';
import {EditorModule} from 'primeng/editor';

import {TabViewModule} from 'primeng/tabview';
import { PipelineDetailsModule } from '../utils/pipeline-details/pipeline-details.module';

@NgModule({
  imports: [
      CommonModule
    , ReportsModule
    , MembershipsModule
    , DataTableModule
    , TableModule
    , CheckboxModule
    , DialogModule
    , TooltipModule
    , KeyFilterModule
    , CalendarModule
    , FormsModule
    , ReactiveFormsModule
    , UtilsModule
    , DropdownModule
    , ConfirmDialogModule
    , EditorModule
    , TabViewModule
    , PipelineDetailsModule
    , CHAPTERS_ROUTES
  ],
  declarations: [
      OverviewComponent
    , SponsorshipPipelineComponent
    , DetailMetricsComponent
    , ChaptersMembershipComponent
    , ChaptersRevenueComponent
    , ChaptersSponsorshipComponent
    , SocialMediaComponent
    , BoardmembersComponent
    , boardMembers
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  exports: [
      OverviewComponent
    , DetailMetricsComponent
    , ChaptersSponsorshipComponent
  ],

  providers: [
    ConfigService, ConfirmationService
  ]
})
export class ChaptersModule { }
