import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { NvD3Module } from 'ng2-nvd3';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
import { MBCDATA } from '../../mockmodel/mock.model';
import { CommonService } from '../../services/common.service';
@Component({
    selector: 'em-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit, OnChanges {
    options: any;
    data: any;
    @Input('config') config;
    @Input('stackData') stackData;
    @ViewChild('nvd3') nvd3;
    tickformat: any = ',.1f';
    heading: string;
    title: string;
    constructor(private _commonService: CommonService) { }

    ngOnInit() {
        this._commonService.title.subscribe((val: string) => {
            this.heading = 'Ascend ' + val + ' Chapter';
        });
        // this.data = MBCDATA;
        // var colorArray = ['#FF0000', '#0000FF', '#FFFF00']; //Used for Chart Color Change
        this.data = this.stackData;
        this.heading = this.config.heading;
        this.title = this.config.title;
        const that = this;
        // MultiBarChart Stacked
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
                groupSpacing: 0.4,
                x: function (d) { return d.name; },
                y: function (d) { return d.value + (1e-10); },
                duration: 500,
                grouped: false,
                stacked: true,
                legendPosition: 'bottom',
                showControls: false,
                xAxis: {
                    axisLabel: this.config.xAxisLabel,
                    showMaxMin: false,
                    tickFormat: function (d) {
                        // return d3.format(',.0f')(d);
                        return d;
                    }
                },
                yAxis: {
                    axisLabel: this.config.yAxisLabel,
                    axisLabelDistance: -20,
                    tickFormat: function (d) {
                        return d3.format(',.0f')(d);
                    }
                },
                // To Display Chart Values
                dispatch: {
                    stateChange: function (e) {
                        that.options.chart.xAxis.tickFormat();
                    },

                    renderEnd: function (d) {
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
                                        const width = this.getBBox().width;
                                        return parseFloat(b.attr('x')) + (parseFloat(barWidth) / 2) - (width / 2);
                                    })
                                    .style('stroke', '#000');
                                // .attr('class', 'bar-values');
                            });
                        });
                    }
                },
                // To get the Event Details
                multibar: {
                    dispatch: {
                        elementClick: function (el) {
                        }
                    }
                },
                // For Color Change function
                // color:function(d,i){
                //   return colorArray[i];
                // }

            }
        };
    }
    ngOnChanges() {
        this._commonService.title.subscribe((val: string) => {
            this.heading = val;
        });
    }

}
