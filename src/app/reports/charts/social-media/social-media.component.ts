import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
// import { RemoveSpace } from '../../../utils/pipes/trasformations.pipes';
import 'd3';
import 'nvd3';
import { color } from 'd3';

@Component({
  selector: 'em-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit,  OnChanges {
  options: any;
  data: any;
  heading = '';
  @ViewChild('nvd3') nvd3;
  @Input('config') config;
  @Input('socialMedia') socialMedia;
  @Input('primaryGroupCode') primaryGroupCode;
  @Input() export;
  @Output() exportChart = new EventEmitter();
  title: string;
  mediaId: string;
  constructor() { }

  ngOnInit() {
    const monthTemp = ['October', 'Novemebr', 'December', 'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September'];

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
        clipEdge: false,
        groupSpace: 1,
        x: function (d) { return d.month; },
        y: function (d) {
          setTimeout(() => {
            d3.selectAll('.nv-multibar .nv-group').each(function () {
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
          return d.value; },
        range: [0, 1],
        duration: 500,
        grouped: true,
        stacked: false,
        showValues: true,
        reduceXTicks: false,
        legendPosition: 'bottom',
        showLegend:false,
        showControls: false,
        forceY: ([0, 1]),
        xAxis: {
          axisLabel: this.config.xAxisLabel,
          ticks: 10,
          showMaxMin: false,
          rotateLabels: -40,
          tickFormat: function (d) {
            // return monthTemp[d];
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
          // renderEnd: function (d) {
          //   const id = '#social';
          //   const da = d3.select(id).select('svg');
          // }
        },
      }
    };
  }

  ngOnChanges() {
    this.data = this.socialMedia;
    if (this.data !== undefined) {
      this.heading = this.data[0].key;
      this.title = this.data[0].key ;
    }
  }

  downloadChart(val) {
    this.exportChart.emit(val);
}
}
