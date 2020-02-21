import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NvD3Module } from 'ng2-nvd3';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { TotalRevenueWidget } from './widgets/total-revenue/total-revenue.widget';
import { ExpirationRateWidget } from './widgets/expiration-rate/expiration-rate.widget';
import { PaidMembershipWidget } from './widgets/paid-membership/paid-membership.widget';
import { NewCustomersWidget } from './widgets/new-customers/new-customers.widget';
import { GrowthRateComponent } from './widgets/growth-rate/growth-rate.widget';
import { MembershipGoalWidget } from './widgets/membership-goal/membership-goal.widget';
import { RevenueGoalWidget } from './widgets/revenue-goal/revenue-goal.widget';
import { PaidSponsoredChart } from './charts/paid-sponsored/paid-sponsored.chart';
import { PaidExpiredChart } from './charts/paid-expired/paid-expired.chart';
import { MonthlyRevenueChart } from './charts/monthly-revenue/monthly-revenue.chart';
import { TotalRevenueChart } from './charts/total-revenue/total-revenue.chart';
import { ChapterProgressComponent } from './widgets/chapter-progress/chapter-progress.component';
import { PaidLocalSponsoredMembershipComponent } from './widgets/paid-local-sponsored-membership/paid-local-sponsored-membership.component';
import { SocialMediaComponent } from './charts/social-media/social-media.component';

@NgModule({
  imports: [
    CommonModule
    , NvD3Module
    , NgCircleProgressModule.forRoot({})
  ],
  declarations: [
    TotalRevenueWidget
    , ExpirationRateWidget, PaidMembershipWidget
    , NewCustomersWidget, GrowthRateComponent
    , MembershipGoalWidget, RevenueGoalWidget
    , PaidSponsoredChart, PaidExpiredChart
    , MonthlyRevenueChart, TotalRevenueChart
    , ChapterProgressComponent, PaidLocalSponsoredMembershipComponent
    , SocialMediaComponent
  ],
  exports: [
    TotalRevenueWidget
    , ExpirationRateWidget, PaidMembershipWidget
    , NewCustomersWidget, GrowthRateComponent
    , MembershipGoalWidget, RevenueGoalWidget
    , PaidSponsoredChart, PaidExpiredChart
    , MonthlyRevenueChart, TotalRevenueChart
    , ChapterProgressComponent, PaidLocalSponsoredMembershipComponent
    , SocialMediaComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReportsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReportsModule,
      providers: []
    };
  }
}
