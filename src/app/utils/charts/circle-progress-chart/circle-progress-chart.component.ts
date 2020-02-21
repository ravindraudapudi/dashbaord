import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'em-circle-progress-chart',
  templateUrl: './circle-progress-chart.component.html',
  styleUrls: ['./circle-progress-chart.component.css']
})
export class CircleProgressChartComponent implements OnInit {
  @Input('config') config;
  progress: any;

  constructor() { }

  ngOnInit() {
    this.progress = this.config;
  }
}
