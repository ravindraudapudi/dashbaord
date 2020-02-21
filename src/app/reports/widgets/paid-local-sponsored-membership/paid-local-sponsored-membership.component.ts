import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'em-paid-local-sponsored-membership',
  templateUrl: './paid-local-sponsored-membership.component.html',
  styleUrls: ['./paid-local-sponsored-membership.component.css']
})
export class PaidLocalSponsoredMembershipComponent implements OnInit, OnChanges {
  @Input('data') data;
  paidSponsored: any;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.paidSponsored = this.data;
  }

}
