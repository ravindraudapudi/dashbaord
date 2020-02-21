import { Component, OnInit, Input, OnChanges, ViewChild, SystemJsNgModuleLoader } from '@angular/core';
import { DynamicHeaderSort, DynamicColumnsSort } from '../../utils/pipes/trasformations.pipes';
import { DataTable } from 'primeng/primeng';
import { CommonService } from 'src/app/utils/services/common.service';
import { NationalService } from '../services/national-service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Store } from '@ngrx/store';

@Component({
  selector: 'em-active-membership',
  templateUrl: './active-membership.component.html',
  styleUrls: ['./active-membership.component.css']
})
export class ActiveMembershipComponent implements OnInit, OnChanges {
  @Input() totalActiveMembers: any;
  @Input() export: any;
  @Input() selectedRDate: any;
  totalValue = [];
  exportedColumnsList = [];

  dataForTable: any;
  colsForTable: any[];
  mockFinalColValue: any[];
  dynamicConfig: any;
  dynamicHeaderSort = new DynamicHeaderSort();
  dynamicColumnSort = new DynamicColumnsSort();
  totalActiveMembersDetails: any;
  chapterClicked = false;
  chapterName: string;
  loading = false;
  constructor(private commonService: CommonService,
    private store: Store<any>,
    private nationalServie: NationalService) { }

  ngOnInit() {
    this.dynamicConfig = {
      paginator: false,
      resposive: true,
      rows: 10,
      scrollable: false
    };
  }

  ngOnChanges(): void {
    this.mockFinalColValue = [];
    this.colsForTable = this.dynamicHeaderSort.transform(this.totalActiveMembers.headers);

    this.colsForTable.forEach(element => {
      this.exportedColumnsList.push(element.header)
    });
    
    this.exportedColumnsList.splice(1, 0, "Primary_Group_Code");


    this.dataForTable = this.dynamicColumnSort.transform(this.totalActiveMembers.chapterContent);
    this.totalValue = [];
    this.totalActiveMembers.chapterContent.forEach(element => {
      if (element.chapterName == 'Total') {
        this.totalValue.push(element);
      }
    });
  }

  onRowSelect(primaryGroupCode: string, chapterName: string): void {
    this.chapterClicked = true;
    this.chapterName = chapterName
    this.getTotalActive(primaryGroupCode);
  }

  getTotalActive(chapter) {
     this.store.select('setRDateDetails').subscribe((store) => {
      if (store && store.reportingDate && store.fiscalYear) {
        this.loading = true;
        this.nationalServie.getTotalActiveMembersDetails(chapter, store.reportingDate).subscribe(res => {
          this.loading = false;
          this.totalActiveMembersDetails = res;
        }, error => {
          this.loading = false;
        });
      }
    });
  }

  exportCSV(dt: DataTable) {
    const fileName = 'Total Active Membership Report by Chapter as of ' + this.selectedRDate.label + ' .csv';
    let formmatedList = [];
    let dataTemp;
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};
      keys.forEach((key, index) => {
        dataTemp[this.exportedColumnsList[index]] = field[key] === undefined || field[key] === null ? '' : String(field[key]).replace(',', '');
      })
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }


  exportMembersCSV(mdt: DataTable) {

    let name = '';
    this.chapterName.split(' ').forEach((myObject) => {
      name = name + ' ' + _.capitalize(myObject);
    })

    const fileName = 'Total Active Members for ' + name + ' as of ' + this.selectedRDate.label + ' .csv';


    let exportColumns = ['apiGuid', 'firstName', 'middleName',
      'lastName', 'email', 'company', 'memberSince',
      'expiryDate', 'membership', 'primaryGroupCode', 'emailBounced', 'gender'
    ];

    let updatedExportColumns = ['API_GUID', 'First_Name', 'Middle_Name',
      'Last_Name', 'Email_Address', 'Employer_Name', 'Member_Sign_up', 'Date_Membership_Expires',
      'Membership Type', 'Primary_Group_Code', 'Email_Bounced', 'Gender'
    ];

    let formmatedList = [];
    let dataTemp;
    this.totalActiveMembersDetails.map((field, index) => {

      dataTemp = {};
      exportColumns.forEach((key, index) => {
        if (field['expiryDate']) {
          field['expiryDate']  = new Date(field['expiryDate']);
        }

        if(field['registrationDate']){
          field['registrationDate']  = new Date(field['registrationDate']);
        }
        dataTemp[updatedExportColumns[index]] = field[key]
         === undefined || field[key] === null ? '' : field[key]
          instanceof Date ? moment(field[key]).format('MM/DD/YYYY') : String(field[key]).replace(',', '');
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }
}
