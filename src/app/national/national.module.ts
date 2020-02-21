import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsModule } from '../reports/reports.module';
import { UtilsModule } from '../utils/utils.module';
import { NATIONAL_ROUTES } from './national-route.module';
import { DataTableModule, DropdownModule, ButtonModule,
   TooltipModule, CalendarModule, KeyFilterModule, DialogModule, ConfirmDialogModule, EditorModule, TabViewModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChaptersModule } from '../chapters/chapters.module';
import { MembershipsModule } from '../memberships/memberships.module';
import { CommonService } from '../utils/services/common.service';
import { UploadService } from './uploads/services/upload-csv-service';

import { ActiveMembershipComponent } from './active-membership/active-membership.component';
import { MembershipRevenueComponent } from './membership-revenue/membership-revenue.component';
import { PaidMembershipComponent } from './paid-membership/paid-membership.component';
import { UploadsComponent } from './uploads/uploads.component';
import { NationalDashboardComponent } from './national-dashboard/national-dashboard.component';
import { ConfigHomeComponent } from '../configs/config-home/config-home.component';
import { LocalSponsoredMembershipComponent } from './local-sponsored-membership/local-sponsored-membership.component';
import { NationalChomeModule } from './national-chome/national-chome.module';
import { NationalSponsoredMembershipComponent } from './national-sponsored-membership/national-sponsored-membership.component';
import { NationalSponsorshipComponent } from './national-sponsorship/national-sponsorship.component';
import { NationalSponsorshipPipelineComponent } from './national-sponsorship-pipeline/national-sponsorship-pipeline.component';
import { PipelineDetailsModule } from '../utils/pipeline-details/pipeline-details.module';

@NgModule({
  imports: [
      CommonModule
    , ReportsModule
    , TableModule
    , DataTableModule
    , TooltipModule
    , UtilsModule
    , MembershipsModule
    , DropdownModule
    , ButtonModule
    , FormsModule
    , KeyFilterModule
    , DialogModule
    , ReactiveFormsModule
    , EditorModule
    , NationalChomeModule
    , CalendarModule
    , TabViewModule
    , ConfirmDialogModule
    , PipelineDetailsModule
    , NATIONAL_ROUTES
  ],
  declarations: [
     ActiveMembershipComponent
    , MembershipRevenueComponent
    , PaidMembershipComponent
    , UploadsComponent
    , NationalSponsoredMembershipComponent
    , ConfigHomeComponent
    , NationalDashboardComponent
    , ConfigHomeComponent
    , LocalSponsoredMembershipComponent
    , NationalSponsorshipComponent
    , NationalSponsorshipPipelineComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [CommonService, UploadService, DatePipe]
})
export class NationalModule { }
