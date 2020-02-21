import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import 'd3';
import 'nvd3';

@Component({
  selector: 'em-paid-expired-membership-chart',
  templateUrl: './paid-expired.chart.html',
  styleUrls: ['./paid-expired.chart.css']
})
// tslint:disable-next-line:component-class-suffix
export class PaidExpiredChart implements OnInit, OnChanges {
  options: any;
  data: any;
  // chartData: any;
  @ViewChild('nvd3') nvd3;
  @Input('config') config;
  @Input('groupedData') groupedData;
  @Input('primaryGroupCode') primaryGroupCode;
  @Input() export;
  @Output() paidAndExpired = new EventEmitter<any>();
  @Output() exportChart = new EventEmitter();
  heading: string;
  title: string;
  tickformat: any = ',.1f';

  constructor() { }

  ngOnInit() {
    const that = this;

    // StackedBarChart Stacked
    this.options = {
      chart: {
        type: 'multiBarChart',
        height: this.config.height,
        margin: {
          top: 20,
          right: 20,
          bottom: 45,
          left: 45
        },
        //   legend: {
        //     margin: {
        //         top: 5,
        //         right: 44,
        //         bottom: 5,
        //         left: 0
        //         }
        //     },
        clipEdge: false,
        groupSpace: 1,
        x: function (d) { return d.name; },
        y: function (d) { return d.value; },
        range: [0, 1],
        duration: 500,
        grouped: true,
        stacked: false,
        showValues: true,
        reduceXTicks: false,
        legendPosition: 'bottom',
        showControls: false,
        color: ['green', 'red'],
        forceY: ([0, 1]),
        xAxis: {
          axisLabel: this.config.xAxisLabel,
          ticks: 10,
          showMaxMin: false,
          rotateLabels: -40,
          tickFormat: function (d) {
            // return d3.format(',.0f')(d);
            return d;
          }
        },
        yAxis: {
          axisLabel: this.config.yAxisLabel,
          axisLabelDistance: -20,
          tickFormat: function (d) {
            return d3.format(',.f')(d);
          }
        },

        // To Display Chart Values
        dispatch: {
          renderEnd: function (d) {
            const id = '#group';
            const da = d3.select(id).select('svg');
            setTimeout(() => {
              da.selectAll('.nv-multibar .nv-group').each(function () {
                const g = d3.select(this);
                // Remove previous labels if there is any
                g.selectAll('text').remove();
                g.selectAll('.nv-bar').each(function (bar) {
                  const b = d3.select(this);
                  const barWidth = b.attr('width');
                  const barHeight = b.attr('height');

                  g.append('text')
                    // Transforms shift the origin point then the x and y of the bar
                    // is altered by this transform. In order to align the labels
                    // we need to apply this transform to those.
                    .attr('transform', b.attr('transform'))
                    .text(function () {
                      // No decimals format and eliminate zero values
                      if (bar.y === 0) {
                        return;
                      }
                      return parseFloat(bar.value).toFixed(0);
                    })
                    // To display label on Top
                    .attr('y', function () {
                      const height = this.getBBox().height;
                      return parseFloat(b.attr('y')) - 5;
                    })
                    // Center label horizontally
                    .attr('x', function () {
                      const width = this.getBBox().width;
                      return parseFloat(b.attr('x')) + (parseFloat(barWidth) / 2) - (width / 2);
                    })
                    .attr('style', 'fill: black; stroke: none; font:normal 10px roboto')
                    .style('#808080');
                  // .style('stroke', '#000');
                });
              });
            }, 0);
          }
        },

        // To get the Membership Details from chart
        multibar: {
          dispatch: {
            elementClick: function (el) {
              that.paidAndExpired.emit(el.data);
            }
          }
        },
      }
    };
  }

  ngOnChanges() {
    this.data = this.groupedData;
    this.title = this.config.title;
  }

  downloadChart(val) {
    this.exportChart.emit(val);
}
}
