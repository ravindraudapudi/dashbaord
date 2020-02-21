import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'em-national-contacts',
  templateUrl: './national-contacts.component.html',
  styleUrls: ['./national-contacts.component.css']
})
export class NationalContactsComponent implements OnInit, OnChanges {


  @Input()
  nationalContactsInputs : any ;

  ngOnChanges(changes: SimpleChanges): void {
  
  }

  constructor() { }

  ngOnInit() {
  }

}
