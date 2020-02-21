import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicHeaderSort, DynamicColumnsSort } from '../../utils/pipes/trasformations.pipes';
import { DataTable } from 'primeng/primeng';
import { CommonService } from 'src/app/utils/services/common.service';

@Component({
  selector: 'em-paid-membership',
  templateUrl: './paid-membership.component.html',
  styleUrls: ['./paid-membership.component.css']
})
export class PaidMembershipComponent implements OnInit, OnChanges {
  @Input()  paidMembers: any;
  @Input() export: any;
  @Input() selectedRDate:any;
  dataForTable: any;
  colsForTable: any[];
  exportedColumnsList = [];
  mockFinalColValue: any[];
  dynamicConfig: any;
  dynamicHeaderSort =  new DynamicHeaderSort();
  dynamicColumnSort = new DynamicColumnsSort();
  totalValue = [];
  constructor(private commonService:CommonService ) { }

  ngOnInit() {
    this.dynamicConfig = {
      paginator: false,
      resposive: true,
      rows: 10,
      scrollable: false
    };
  }

  ngOnChanges() {
    this.mockFinalColValue = [];
    this.colsForTable = this.dynamicHeaderSort.transform(this.paidMembers.headers);

    this.colsForTable.forEach( element =>{
      this.exportedColumnsList.push(element.header)
    })
    this.exportedColumnsList.splice(1, 0, "Primary_Group_Code");


    this.dataForTable = this.dynamicColumnSort.transform(this.paidMembers.chapterContent);
    this.totalValue = [];
    this.paidMembers.chapterContent.forEach(element => {
      if(element.chapterName == 'Total') {
        this.totalValue.push(element);
      }
    });
  }

  exportCSV(dt: DataTable) {
    const fileName = 'Total Member-Paid Report by Chapter as of ' + this.selectedRDate.label + '.csv';
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
