import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { REVENUEDATA } from '../../utils/mockmodel/mock.model';
import { DynamicHeaderSort, DynamicColumnsSort } from '../../utils/pipes/trasformations.pipes';
import { DataTable } from 'primeng/primeng';
import { CommonService } from 'src/app/utils/services/common.service';

@Component({
  selector: 'em-membership-revenue',
  templateUrl: './membership-revenue.component.html',
  styleUrls: ['./membership-revenue.component.css']
})
export class MembershipRevenueComponent implements OnInit, OnChanges {
  @Input() revenueDetails: any;
  @Input() export: any;
  exportedColumnsList = [];
  dataForTable: any;
  colsForTable: any[];
  mockFinalColValue: any[];
  dynamicHeaderSort = new DynamicHeaderSort();
  dynamicColumnSort = new DynamicColumnsSort();
  totalValue = [];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.mockFinalColValue = [];
    this.colsForTable = this.dynamicHeaderSort.transform(this.revenueDetails.headers);

    this.colsForTable.forEach( element =>{
      this.exportedColumnsList.push(element.header)
    })
    this.exportedColumnsList.splice(1, 0, "Primary_Group_Code");


    this.dataForTable = this.dynamicColumnSort.transform(this.revenueDetails.chapterContent);
    this.totalValue = [];
    this.revenueDetails.chapterContent.forEach(element => {
      if(element.chapterName == 'Total') {
        this.totalValue.push(element);
      }
    });
  }

  exportCSV(dt: DataTable) {
    const fileName = 'Total Revenue Report by Chapter FY 2019 YTD.csv';
    let formmatedList = [];
    let dataTemp;
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};
      keys.forEach((key,index) => {
        dataTemp[this.exportedColumnsList[index]] = field[key] === undefined || field[key] === null ? '' : String(field[key]).replace(',', '');
      })
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }

}
