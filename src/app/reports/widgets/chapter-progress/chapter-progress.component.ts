import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'em-chapter-progress',
  templateUrl: './chapter-progress.component.html',
  styleUrls: ['./chapter-progress.component.css']
})
export class ChapterProgressComponent implements OnInit, OnChanges {
  @Input('config') config;
  progress: string;
  show = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.config) {
      this.show = true;
      this.progress = this.config;
    }
  }
}
