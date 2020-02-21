import { Component, OnInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../configs/services/config.service';
import { CommonService } from '../../utils/services/common.service';
import { NationalService } from '../../national/services/national-service';
import { Subscription } from 'rxjs';
import { ImageExportService } from 'src/app/common/services/image-export.service';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-chapters-revenue',
  templateUrl: './chapters-revenue.component.html',
  styleUrls: ['./chapters-revenue.component.css']
})
export class ChaptersRevenueComponent implements OnInit {
  lineConfig: any;
  stackedConfig1: any;
  selectedCode: any;
  selectedChapter: any;
  lineData: any;
  totalRevenue: any;
  export: any;
  loading = false;
  rDateSubscription: Subscription;
  reportingDate: string;
  fiscalYear: any;

  constructor(private configService: ConfigService,
    private imageExportService: ImageExportService,
    private activatedRoute: ActivatedRoute,
    private nationalService: NationalService,
    private commonService: CommonService
    , private store: Store<any>) {

    this.activatedRoute.params.subscribe(params => this.dropDownValue(params['selectedCode']));
    this.store.select('setRDateDetails').subscribe((store) => {
      if (store && store.reportingDate && store.fiscalYear) {
        this.reportingDate = store.reportingDate;
        this.fiscalYear = store.fiscalYear;
        this.getChartMonthlyRevenue(store.reportingDate, store.fiscalYear, this.selectedCode);
        this.getChartTotalRevenue(this.selectedCode, store.fiscalYear);
        this.getConfiguredPaid_Expired(this.selectedChapter);
      }
    });
  }

  ngOnInit() {
    this.selectedChapter = this.selectedChapter;
    this.getConfiguredPaid_Expired(this.selectedChapter);
    this.grantedPrivileges();
  }

  chart() { }

  /**
   * Configuring  Chart headers dynamically
   * @param chapterName Name of the chapter
   */
  getConfiguredPaid_Expired(chapterName) {
    this.lineConfig = {
      heading: 'Ascend' + ' ' + chapterName + ' ' + 'Chapter',
      title: 'Member-Paid Membership Revenue by Month FY ' + this.fiscalYear + ' YTD',
      height: 370,
    };

    this.stackedConfig1 = {
      heading: 'Ascend' + ' ' + chapterName + ' ' + 'Chapter',
      title: 'Total Revenue By Source FY ' + this.fiscalYear + ' YTD',
      height: 370
    };
  }

  /**
 * To track active chapter
 * Set ChapterCode to display active chapter in dropdown
 * @param val get primaryGroupCode from routing parameter
 */
  dropDownValue(val) {
    this.store.select('setRDateDetails').subscribe((store) => {
      if (store && store.reportingDate && store.fiscalYear) {
        this.commonService.setChapterCode(val);
        this.selectedCode = val;
        this.reportingDate = store.reportingDate;
        this.fiscalYear = store.fiscalYear;
        this.getChartMonthlyRevenue(store.reportingDate, store.fiscalYear, this.selectedCode);
        this.getChartTotalRevenue(this.selectedCode, store.fiscalYear);
      }
    });

    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterName(this.selectedChapter);
          this.getConfiguredPaid_Expired(el.chapterName);
        }
      });
    });
  }

  getChartMonthlyRevenue(rDate, year, code) {
    this.loading = true;
    this.nationalService.getMonthlyMembershipRevenue(code, rDate, year).subscribe(res => {
      this.loading = false;
      this.lineData = res;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  /**
* Retriving monthly membership revenue
* Assigning retrived value to Line chart
* @param code primary group code of selected chapter
*/
  getChartTotalRevenue(code, year) {
    this.nationalService.getTotalRevenueForChapter(code, year).subscribe(res => {
      this.totalRevenue = res;
    }, error => {
      console.log(error);
    });
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
  downloadChart() {

    let name = '';
    this.selectedChapter.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    this.loading = true;
    this.imageExportService.exportImageData('totalRevenueChart', name + ' ' + this.stackedConfig1.title, (cb) => {
      this.loading = false;
    });
  }

  downloadMonthlyChart() {

    let name = '';
    this.selectedChapter.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    this.loading = true;
    this.imageExportService.exportImageData('monthlyRevenueChart', name + ' ' + this.lineConfig.title, (cb) => {
      this.loading = false;
    });
  }
}
