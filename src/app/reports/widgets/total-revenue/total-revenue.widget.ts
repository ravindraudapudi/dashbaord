import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'em-total-revenue',
  templateUrl: './total-revenue.widget.html',
  styleUrls: ['./total-revenue.widget.css']
})
export class TotalRevenueWidget implements OnInit, OnChanges {
  @Input('data') data;
  revenue: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.revenue = this.data;
  }

}
