import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'em-contract-terms',
  templateUrl: './contract-terms.component.html',
  styleUrls: ['./contract-terms.component.css']
})
export class ContractTermsComponent implements OnInit, OnChanges {

  @Input()
  proposedContractTermsInput: any;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor() { }

  ngOnInit() {
  }

}
