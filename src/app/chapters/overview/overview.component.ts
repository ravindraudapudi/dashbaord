import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfigService } from '../../configs/services/config.service';
import { CommonService } from '../../utils/services/common.service';
import { NationalService } from '../../national/services/national-service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  loading = false;
  membershipGoal: any;
  revenueGoal: any;
  selectedCode: any;
  selectedChapter: any;
  wTtotalRevenue: any;
  wExpirationRate: any;
  wPaidSponsored: any;
  reportingDate: any;
  fiscalYear: any;

  constructor(
    private nationalService: NationalService
    , private activatedRoute: ActivatedRoute
    , private configService: ConfigService
    , private commonService: CommonService
    , private store: Store<any>) {
    this.activatedRoute.params.subscribe(params => this.dropDownValue(params['selectedCode']));
  }

  ngOnInit() {
    this.store.select('setRDateDetails').subscribe((store) => {
      if (store && store.reportingDate && store.fiscalYear) {
        this.getChapterOverview(store.reportingDate, store.fiscalYear);
        this.reportingDate = store.reportingDate;
        this.fiscalYear = store.fiscalYear;
      }
    });
  }

  /**
 * To track active chapter
 * Set ChapterCode to display active chapter in dropdown
 * @param val get primaryGroupCode from routing parameter
 */
  dropDownValue(val) {
    this.commonService.setChapterCode(val);
    this.selectedCode = val;
    this.getChapterOverview(this.reportingDate, this.fiscalYear);
    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterName(this.selectedChapter);
        }
      });
    });
  }

  /**
   * Need to get the chapter overview details by  primary group code
  */
  getChapterOverview(rDate, year) {
    this.loading = true;
    if (rDate && year && this.selectedCode) {
      this.nationalService.getOverviewForChapter
        (this.selectedCode, rDate, year).subscribe(res => {
          this.loading = false;
          this.membershipGoal = {
            percent: res.membershipGoal,
            membershipTarget: res.membershipGoalValue.toLocaleString(),
            title: 'Memberships (Member-paid + Local Sponsor-Paid) *Excludes National Sponsor-Paid',
            label: 'Goal : '
          };
          this.revenueGoal = {
            percent: res.revenueGoal,
            membershipTarget: '$' + res.revenueGoalValue.toLocaleString(),
            title: 'Total Revenue',
            label: 'Goal : '
          };
          this.wTtotalRevenue = res.totalRevenue;
          this.wExpirationRate = res.expirationRate;
          this.wPaidSponsored = res.paidSponsored;
        },
          error => {
            this.loading = false;
        });
    }
  }
}
