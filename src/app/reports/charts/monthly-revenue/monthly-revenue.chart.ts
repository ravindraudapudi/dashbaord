import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
// import { RemoveSpace } from '../../../utils/pipes/trasformations.pipes';
import 'd3';
import 'nvd3';

@Component({
  selector: 'em-monthly-revenue-chart',
  templateUrl: './monthly-revenue.chart.html',
  styleUrls: ['./monthly-revenue.chart.css']
})
export class MonthlyRevenueChart implements OnInit, OnChanges {
  options: any;
  data: any;
  blankValue : String = "~   ";
  @ViewChild('nvd3') nvd3;
  @Input('config') config;
  @Input('lineData') lineData;
  //@Input('primaryGroupCode') primaryGroupCode;
  @Input() export;
  @Output() exportChart = new EventEmitter();
  heading: string;
  title: string;
  // nvD3Child: nvd3;
  // spaceremove = new RemoveSpace();
  constructor() { }

  ngOnInit() {
    const monthTemp = ['October', 'Novemebr', 'December', 'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September'];

    // LineChart
    const that = this;
    this.options = {
      chart: {
        type: 'lineChart',
        height: this.config.height,
        color: ['#333a4d', '#5698c6'],
        showLegend: true,
        legendPosition: 'bottom',
        clipEdge: false,
        margin: {
          top: 20,
          right: 60,
          bottom: 70,
          left: 65
        },
        useInteractiveGuideline : false,
        x: function (d, i) { if (d !== undefined) { return d['month']; } },
        y: function (d) { if (d !== undefined) {
        // To Show Data Markers
          d3.selectAll('.nv-lineChart .nv-point')
          .style('stroke-width', '3px')
          .style('fill-opacity', '.95')
          .style('stroke-opacity', '.95');
          return d['value']; } },
        reduceXTicks: false,
        showXAxis: true,
        forceY: ([0, 1]),
        xAxis: {
          ticks: 10,
          showMaxMin: false,
          rotateLabels: -40,
          tickFormat: function (d) {
            return monthTemp[d];
          },
        },
        yAxis: {
          tickFormat: function (d) {
            return d;
          },
          axisLabelDistance: -10
        },
        
        tooltip: {
          contentGenerator: function (e) {
          const pId = e.series[0].key;
          const header =
          '<thead>' +
          '<tr>' +
          '<td class="key">' + e.point.name + ' </td>' +
          '</tr>' +
          '</thead>';
          
          let rows = '';
          
          rows +=
          '<tr>' +
          '<td class="x-label">' + e.series[0].key + '</td>' +
          '<td class="x-value"> $' + e.point.value + '</td>' +
          '</tr>' ;
          
          return '<table>' +
          header +
          '<tbody>' +
          rows +
          '</tbody>' +
          '</table>';
          }
          }
          // }
        },
        // // To Display Chart Values
        dispatch: {
          stateChange: function (e) {
            that.options.chart.xAxis.tickFormat();
        },

                // To Show Data Markers
                // callback: function () {
                //   const id = '#monthlyRevenue';
                //     const da = d3.select(id).select('svg');
                //     setTimeout(() => {
                //     da.selectAll('.nv-lineChart .nv-point')
                //     .style('stroke-width', '3px')
                //     .style('fill-opacity', '.95')
                //     .style('stroke-opacity', '.95');
                //   }, 0);
                // },
      }
    };
  }

  ngOnChanges() {
    this.data = this.lineData;
    this.title = this.config.title;
  }

  downloadChart(val) {
    this.exportChart.emit(val);
}
}
