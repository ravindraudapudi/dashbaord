import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RemoveSpace } from '../../pipes/trasformations.pipes';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'em-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  options: any;
  data: any;
  @Input('config') config;
  @Input('lineData') lineData;
  @ViewChild('nvd3') nvd3;
  heading: string;
  title: string;
  spaceremove = new RemoveSpace();
  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this._commonService.title.subscribe((val: string) => {
      this.heading = 'Ascend ' + val + ' Chapter';
    });
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday'];
    this.data = this.lineData;
    this.heading = this.config.lineChartHeading;
    this.title = this.config.lineChartTitle;
    // LineChart
    let that = this;
    this.options = {
      chart: {
        showLegend: true,
        noData: 'Click on Pie chart to display Data',
        type: 'lineChart',
        height: 300,
        margin: {
          top: 20,
          right: 60,
          bottom: 70,
          left: 65
        },
        x: function (d, i) { if (d != undefined) { return d['x']; } },
        y: function (d) { if (d != undefined) { return d['y'] } },
        useInteractiveGuideline: true,
        valueFormat: function (d) {
          // return d3.format(',.2f')(d);
          // return d['key'];
        },
        reduceXTicks: false,
        showXAxis: true,
        xAxis: {
          ticks: 10,
          // rotateLabels: -45,
          tickFormat: function (d) {

            return days[d];
          },
        },
        yAxis: {
          tickFormat: function (d) {
            // return d3.format('f')(d);
            return d;
          },
          axisLabelDistance: -10
        }
      }
    };

  }
}
