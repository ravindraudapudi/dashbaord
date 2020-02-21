import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'em-expiration-rate',
  templateUrl: './expiration-rate.widget.html',
  styleUrls: ['./expiration-rate.widget.css']
})
export class ExpirationRateWidget implements OnInit, OnChanges {
  @Input('data') data;
  expiration: any;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.expiration = this.data;
  }

}
