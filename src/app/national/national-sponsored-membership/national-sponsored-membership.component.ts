import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { CommonService } from 'src/app/utils/services/common.service';
import { DynamicHeaderSort, DynamicColumnsSort } from 'src/app/utils/pipes/trasformations.pipes';

@Component({
  selector: 'em-national-sponsored-membership',
  templateUrl: './national-sponsored-membership.component.html',
  styleUrls: ['./national-sponsored-membership.component.css']
})
export class NationalSponsoredMembershipComponent implements OnInit, OnChanges {
  @Input() nationalSponsored: any;
  @Input() export: any;
  @Input() selectedRDate: any;
  @Input() year: any;
  exportedColumnsList = [];
  mockFinalColValue: any[];
  totalValue  = [];
  dynamicHeaderSort = new DynamicHeaderSort();
  dynamicColumnSort = new DynamicColumnsSort();
  dataForTable: any;
  colsForTable: any[];
  constructor(private commonService: CommonService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.mockFinalColValue = [];
    this.colsForTable = this.dynamicHeaderSort.transform(this.nationalSponsored.headers);
    this.dataForTable = this.dynamicColumnSort.transform(this.nationalSponsored.chapterContent);
    this.totalValue = [];

    this.colsForTable.forEach( element => {
      this.exportedColumnsList.push(element.header);
    });

    this.exportedColumnsList.splice(1, 0, 'Primary_Group_Code');
    this.nationalSponsored.chapterContent.forEach(element => {
      if (element.chapterName == 'Total') {
        this.totalValue.push(element);
      }
    });
  }

   exportCSV(dt: DataTable) {
    const fileName = 'Total National Sponsor-Paid Report by Chapter as of '+ this.selectedRDate.label + ' .csv';
    const formmatedList = [];
    let dataTemp;
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};
      keys.forEach((key,index) => {
        dataTemp[this.exportedColumnsList[index]] = field[key] === undefined ||
         field[key] === null ? '' : String(field[key]).replace(',', '');
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }
}
