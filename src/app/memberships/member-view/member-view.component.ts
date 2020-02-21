import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'em-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {
  @Input() memberData: any;
  memberSnapDailog = false;
  memberDetails: any;
  dialog_header: any;

  constructor() { }

  ngOnInit() {

  }
  
  ngOnChanges() {
    this.memberDetails = this.memberData;
    this.memberSnapDailog = true;
  }
}
