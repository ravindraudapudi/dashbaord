import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'em-sponsor-contacts',
  templateUrl: './sponsor-contacts.component.html',
  styleUrls: ['./sponsor-contacts.component.css']
})
export class SponsorContactsComponent implements OnInit, OnChanges {

  @Input()
  sponsorContactsInputs: any;

  ngOnChanges(changes: SimpleChanges): void {
  }


  constructor() { }

  ngOnInit() {
  }

}
