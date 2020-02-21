import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-single-select-dropdown',
  templateUrl: './single-select-dropdown.component.html',
  styleUrls: ['./single-select-dropdown.component.css']
})

export class SingleSelectDropdownComponent implements OnInit {
  @Input() dropDownData: any[];
  @Output() dataForTable: any[];
  @Output() emitingdropvalue = new EventEmitter();
  option: any[];
  selectedValue: any;
  downicon = 'fa fa-angle-down';
  constructor() { }

  ngOnInit() {
    this.option = this.dropDownData;
  }

  selectDropDown(e) {
    this.emitingdropvalue.emit(e.value.code);
  }
}
