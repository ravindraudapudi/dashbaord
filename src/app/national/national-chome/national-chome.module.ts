import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NationalSponsoredMembershipComponent } from '../national-sponsored-membership/national-sponsored-membership.component';
import { NATIONAL_CHAPTERS_ROUTES } from './national-chome.route.module';
import { ReportsModule } from '../../reports/reports.module';
import { DataTableModule, CheckboxModule, DialogModule, TooltipModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MembershipsModule } from '../../memberships/memberships.module';
import { ConfigService } from '../../configs/services/config.service';
import { ChaptersModule } from '../../chapters/chapters.module';
import { NationalChaptersComponent } from './national-chome.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsModule,
    NgxSpinnerModule
    , MembershipsModule
    , DataTableModule
    , TableModule
    , CheckboxModule
    , DialogModule
    , TooltipModule
    , ChaptersModule
   , NATIONAL_CHAPTERS_ROUTES
  ],
  declarations: [
    NationalChaptersComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
  ],
  providers: [
    ConfigService
  ]
})
export class NationalChomeModule { }


