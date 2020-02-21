import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'em-chapter-contacts',
  templateUrl: './chapter-contacts.component.html',
  styleUrls: ['./chapter-contacts.component.css']
})
export class ChapterContactsComponent implements OnInit, OnChanges{
 
 
  @Input()
  chapterContactsInputs : any;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
