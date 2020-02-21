import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NationalService } from '../../national/services/national-service';
import { CommonService } from '../../utils/services/common.service';
import { ConfigService } from '../../configs/services/config.service';
import { NotificationsService } from 'angular2-notifications';
import { DynamicHeaderSort, DynamicColumnsSort } from '../../utils/pipes/trasformations.pipes';
import { Subscription } from 'rxjs';
import { DataTable } from 'primeng/primeng';
import { load } from '@angular/core/src/render3/instructions';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-detail-metrics',
  templateUrl: './detail-metrics.component.html',
  styleUrls: ['./detail-metrics.component.css']
})
export class DetailMetricsComponent implements OnInit {
  selectedCode: any;
  exportedColumnsList = [];
  selectedChapter: any;
  dataForTable: any;
  colsForTable: any[];
  mockFinalColValue: any[];
  dynamicConfig: any;
  dynamicHeaderSort = new DynamicHeaderSort();
  dynamicColumnSort = new DynamicColumnsSort();
  matrics: any;
  export: boolean;
  loading = false;
  rDateSubscription: Subscription;
  reportingDate: any;
  fiscalYear: any;

  constructor(
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private nationalService: NationalService,
    private notification: NotificationsService,
    private commonService: CommonService,
    private store: Store<any>) {

      this.activatedRoute.params.subscribe(params => this.dropDownValue(params['selectedCode']));
      // tslint:disable-next-line: no-shadowed-variable
      this.store.select('setRDateDetails').subscribe((store) => {
        if (store && store.reportingDate && store.fiscalYear) {
          this.reportingDate = store.reportingDate;
          this.fiscalYear = store.fiscalYear;
          this.getDetailedMatrix(this.selectedCode, store.reportingDate, store.fiscalYear);
        }
      });
  }

  ngOnInit() {
    this.grantedPrivileges();
  }

  dropDownValue(val) {
      this.selectedCode = val;
      this.store.select('setRDateDetails').subscribe((store) => {
        if (store && store.reportingDate && store.fiscalYear) {
          this.commonService.setChapterCode(val);
          this.selectedCode = val;
          this.reportingDate = store.reportingDate;
          this.fiscalYear = store.fiscalYear;
          this.getDetailedMatrix(this.selectedCode, store.reportingDate, store.fiscalYear);
        }
      });
      this.configService.getChapters().subscribe(res => {
        res.forEach(el => {
          if (el.primaryGroupCode === val) {
            this.selectedChapter = el.chapterName;
          }
        });
      });
  }

  /**
* Retrieve assigned role of the user who login into the system
*/
  getDetailedMatrix(code, rDate, fiscalYear) {
    this.loading = true;
    this.nationalService.getDetailedMatrics(code, rDate, fiscalYear).subscribe(res => {
      res.matricsContent.map((result) => {
        if (result['chapterName'] === 'Expiration Rate') {
          result['actual'] = result['actual'].toFixed(1);
          result['goal'] = result['goal'].toFixed(1);
          result['percentage'] = result['percentage'].toFixed(1);
          result['period1'] = result['period1'].toFixed(1);
          result['period2'] = result['period2'].toFixed(1);
        }
      });
      this.loading = false;
      this.matrics = res;
      this.mockFinalColValue = [];
      this.colsForTable = this.dynamicHeaderSort.transform(this.matrics.headers);

      this.colsForTable.forEach(element => {
        this.exportedColumnsList.push(element.header);
      });
      this.dataForTable = this.dynamicColumnSort.transform(this.matrics.matricsContent);
    },
      error => {
        this.notification.error('', error.message);
      });
  }

  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
    });
  }

  exportCSV(dt: DataTable) {

    let name = '';
    this.selectedChapter.split(' ').forEach( (myObject) => {
      name  =  name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    const fileName = name + ' Detail Metrics Membership Reporting Date ' + this.reportingDate + '.csv';
    const formmatedList = [];
    let dataTemp;
    dt.value.map((field, index) => {
      const keys = Object.keys(field);
      dataTemp = {};
      // tslint:disable-next-line: no-shadowed-variable
      keys.forEach((key, index) => {
        dataTemp[this.exportedColumnsList[index]] = field[key] === undefined ||
        field[key] === null ? '' : String(field[key]).replace(',', '');
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }
}

