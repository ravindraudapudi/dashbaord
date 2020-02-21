import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {NvD3Module } from 'ng2-nvd3';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

@Component({
  selector: 'em-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})
export class GroupedBarChartComponent implements OnInit {
  options:any;
  data:any;
  @Input('config') config;
  @Input('groupedData') groupedData;
  heading : string;
  title : string;
  @ViewChild('nvd3') nvd3;
  tickformat: any = ',.1f';
  
  constructor() { }

  ngOnInit() {
    let that=this;

    this.data = this.groupedData;
    this.heading = this.config.groupedBarHeading;
    this.title = this.config.title;
    // var colorArray = ['#FF0000', '#0000FF', '#FFFF00']; //Used for Chart Color Change
  
  // StackedBarChart Stacked
  this.options = {
    chart: {
        type: 'multiBarChart',
        height: this.config.height,
        margin : {
            top: 20,
            right: 20,
            bottom: 45,
            left: 45
        },
        clipEdge: true,
        x: function(d){return d.name; },
        y: function(d){return d.value; },
        duration: 500,
        grouped: true,
        stacked: false,
        showValues: true,
        legendPosition: 'bottom',
        showControls: false,
        xAxis: {
            axisLabel: this.config.xAxisLabel,
            showMaxMin: false,
            tickFormat: function(d){
                // return d3.format(',.0f')(d);
                return d;
            }
        },
        yAxis: {
            axisLabel: this.config.yAxisLabel,
            axisLabelDistance: -20,
            tickFormat: function(d){
                return d3.format(',.0f')(d);
            }
        },
      //To Display Chart Values
      dispatch: {
        /*stateChange: function (e) {
            that.options.chart.xAxis.tickFormat();
        },*/

      renderEnd: function (d) {
            d3.selectAll('.nv-multibar .nv-group').each(function () {
                var g = d3.select(this);
                // Remove previous labels if there is any
                g.selectAll('text').remove();
                g.selectAll('.nv-bar').each(function (bar) {
                    var b = d3.select(this);
                    var barWidth = b.attr('width');
                    var barHeight = b.attr('height');

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
                            return parseFloat(bar.y).toFixed(0);
                        })
                        .attr('y', function () {
                            // Center label vertically
                            const height = this.getBBox().height;
                            // return parseFloat(b.attr('y')) + 11; // 11 is the label's margin from the top of bar
                            return parseFloat(b.attr('y')) + (parseFloat(barHeight) / 2) + 4;
                        })
                        .attr('x', function () {
                            // Center label horizontally
                            var width = this.getBBox().width;
                            return parseFloat(b.attr('x')) + (parseFloat(barWidth) / 2) - (width / 2);
                        })
                        .style("stroke", "#000");
                        // .attr('class', 'bar-values');
                });
            });
        }
      }
        // callback: function(){
        //   nv.models.multiBarChart().stacked(false).showControls(false)
        // }
      }
    }
  }
}
