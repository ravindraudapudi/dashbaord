import { Component, OnInit, Input, OnChanges } from '@angular/core';
// import { DynamicHeaderSort, DynamicColumnsSort } from '../../pipes/common.pipes';

@Component({
  selector: 'app-dynamic-data-table',
  templateUrl: './dynamic-data-table.component.html',
  styleUrls: ['./dynamic-data-table.component.css']
})
export class DynamicDataTableComponent implements OnInit, OnChanges {
  cols: any[];
  valuesfortable: any[];
  @Input() colsForTable: any[];
  @Input() dataForTable: any[];
  @Input('config') config;
  customPaginator: boolean;
  customRows: number;
  customScroll: boolean;
  customResposive: boolean;
  // dynamicHeaderSort =  new DynamicHeaderSort();
  // dynamicColumnSort = new DynamicColumnsSort();
  constructor() { }

  ngOnInit() {
    this.customPaginator = this.config.paginator;
    this.customResposive = this.config.resposive;
    this.customRows = this.config.rows;
    this.customScroll = this.config.scrollable;
    this.cols = this.colsForTable;
    this.valuesfortable = this.dataForTable;
  }

  ngOnChanges() {
    this.valuesfortable = this.dataForTable;
  }
}
