import { Component, OnInit, OnChanges } from '@angular/core';
import { ConfigService } from '../../configs/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../utils/services/common.service';
import { NationalService } from '../../national/services/national-service';
import { Subscription } from 'rxjs';
import { ImageExportService } from 'src/app/common/services/image-export.service';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-chapters-membership',
  templateUrl: './chapters-membership.component.html',
  styleUrls: ['./chapters-membership.component.css']
})
export class ChaptersMembershipComponent implements OnInit {
  selectedChapter: any;
  selectedCode: any;
  paidExpiredConfig: any;
  paidSponsoredConfig: any;
  groupedData: any;
  stackedData: any;
  paidExpired: any;
  paidSponsored: any;
  export: any;
  loading: boolean;
  allMembers: boolean;
  seeAll = false;
  membersChart = true;
  paidExp: any;
  paidSponseredfilenametiltle = 'Paid & Sponsored Memberships FY 2019 YTD';
  rDateSubscription: Subscription;
  reportingDate: any;
  fileNameData: any;
  fiscalYear: any;

  constructor(private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private imageExportService: ImageExportService,
    private nationalService: NationalService,
    private commonService: CommonService,
    private store: Store<any>) {
      this.activatedRoute.params.subscribe(params => this.dropDownValue(params['selectedCode']));
      // tslint:disable-next-line: no-shadowed-variable
      this.store.select('setRDateDetails').subscribe((store) => {
        if (store && store.reportingDate && store.fiscalYear) {
          this.reportingDate = store.reportingDate;
          this.fiscalYear = store.fiscalYear;
          this.getChartPaidExpiredMembers(this.selectedCode, store.reportingDate, store.fiscalYear);
          this.getpaidSponsoredMembers(this.selectedCode, store.reportingDate, store.fiscalYear);
          this.getConfigureChart(this.selectedChapter);
        }
      });
  }

  ngOnInit() {
    
    this.grantedPrivileges();
  }

  chart() { }

  /**
     * Configuring  Chart headers dynamically
     * @param chapterName Name of the chapter
     */
  getConfigureChart(chapterName) {
    this.paidExpiredConfig = {
      heading: 'Ascend' + ' ' + chapterName + ' ' + 'Chapter',
      title: 'Paid & Expired Member-Paid Memberships by Month FY ' + this.fiscalYear + ' YTD',
      height: 300,
    };

    this.paidSponsoredConfig = {
      heading: 'Ascend' + ' ' + chapterName + ' ' + 'Chapter',
      title: 'Active Memberships by Payment Source FY ' + this.fiscalYear + ' YTD',
      height: 300,
    };
  }

  dropDownValue(val) {
    this.paidExpired = '';
    this.paidSponsored = '';
    this.commonService.setChapterCode(val);
    this.selectedCode = val;
    this.store.select('setRDateDetails').subscribe((store) => {
      if (store && store.reportingDate && store.fiscalYear) {
        this.commonService.setChapterCode(val);
        this.selectedCode = val;
        this.reportingDate = store.reportingDate;
        this.fiscalYear = store.fiscalYear;
        this.getChartPaidExpiredMembers(this.selectedCode, store.reportingDate, store.fiscalYear);
        this.getpaidSponsoredMembers(this.selectedCode, store.reportingDate, store.fiscalYear);
      }
    });

    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterName(this.selectedChapter);
          this.getConfigureChart(el.chapterName);
        }
      });
    });
  }

  getChartPaidExpiredMembers(code, rDate, fiscalYear) {
    this.loading = true;
    if (code && rDate && fiscalYear) {
      this.nationalService.getpaidExpiredMembers(code, rDate, fiscalYear).subscribe(res => {
        this.groupedData = res;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  getpaidSponsoredMembers(code, rDate, fiscalYear) {
    this.loading = true;
    if (code && rDate && fiscalYear) {
      this.nationalService.getpaidSponseredMembers(
        code, rDate, fiscalYear).subscribe(res => {
          this.stackedData = res;
          this.loading = false;
        }, error => {
          this.loading = false;
          console.log(error);
        });
    }
  }


  /**
   * snapshot table data on Paid and Expired Membership chart drilldown
   * @param element emitted value from paid-expired component on click
   */
  eventFromPaidExpired(element) {
    this.fileNameData = element.key;
    this.paidExpired = element.list;
  }

  /**
  * snapshot table data on Paid and Sponsored Membership chart drilldown
  * @param element emitted value from paid-sponsored component on click
  */
  eventFromPaidSponsored(element) {
    this.fileNameData = element.key;
    this.paidSponsored = element.list;
  }

  /**
   * To get all member details.
   * passing input from parent to child component
   */
  seeAllMembers() {
    localStorage.removeItem('seeMemberDetails');
    localStorage.setItem('seeMemberDetails', JSON.stringify(false));
  }

  /**
   * To get active/expired member Details
   * passing input from parent to child component
   */
  seeMemberDetails() {
    localStorage.removeItem('seeMemberDetails');
    localStorage.setItem('seeMemberDetails', JSON.stringify(true));
    localStorage.removeItem('PaidExired');
    localStorage.setItem('PaidExired', JSON.stringify(this.paidExpired));
  }

  /**
  * retriving privileges of the role to export chart
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
    });
  }

  /**
  * export chart as .png
  */
  downloadpaidSponsoredChart() {
    let name = '';
    this.selectedChapter.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });
    const filname = name + ' Active Memberships by Payment Source ' + this.reportingDate;

    this.loading = true;
    this.imageExportService.exportImageData('paidSponsoredChartGraph', filname, (cb) => {
      this.loading = false;
    });
  }


  downloadpaidexpiredChart() {
    let name = '';
    this.selectedChapter.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    const filname = name + ' Paid & Expired Memberships  ' + this.reportingDate;

    this.loading = true;
    this.imageExportService.exportImageData('paidExpiredChart', filname, (cb) => {
      this.loading = false;
    });
  }
}

