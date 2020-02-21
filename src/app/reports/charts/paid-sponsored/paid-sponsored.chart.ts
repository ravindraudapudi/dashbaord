import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import 'd3';
import 'nvd3';

@Component({
    selector: 'em-paid-sponsored-membership-chart',
    templateUrl: './paid-sponsored.chart.html',
    styleUrls: ['./paid-sponsored.chart.css']
})
export class PaidSponsoredChart implements OnInit, OnChanges {
    options: any;
    data: any;
    @ViewChild('nvd3') nvd3;
    @Input('config') config;
    @Input('stackedData') stackedData;
    @Input('primaryGroupCode') primaryGroupCode;
    @Input() export;
    @Output() paidAndSponsored = new EventEmitter<any>();
    @Output() exportChart = new EventEmitter();

    heading: string;
    title: string;
    tickformat: any = ',.1f';
    constructor() { }

    ngOnInit() {
        const that = this;
        // MultiBarChart Stacked
        this.options = {
            chart: {
                type: 'multiBarChart',
                height: this.config.height,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 0,
                    left: 40
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
                // color: ['#ab4432', '#cf543f', '#e1aba6'],

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
                  //  axisLabelDistance: -20,
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
                        const id = '#stack';
                        const da = d3.select(id).select('svg');
                        setTimeout(() => {
                            da.selectAll('.nv-multibar .nv-group ').each(function () {
                                const s = d3.select(this);
                                // Remove previous labels if there is any
                                s.selectAll('text').remove();
                                s.selectAll('.nv-bar').each(function (bar) {
                                    const a = d3.select(this);
                                    const barWidth = a.attr('width');
                                    const barHeight = a.attr('height');

                                    s.append('text')
                                        // Transforms shift the origin point then the x and y of the bar
                                        // is altered by this transform. In order to align the labels
                                        // we need to apply this transform to those.
                                        .attr('transform', a.attr('transform'))
                                        .text(function () {
                                            // No decimals format and eliminate zero values
                                            if (bar.y === 0) {
                                                return;
                                            }
                                            return parseFloat(bar.value).toFixed(0);
                                        })
                                        .attr('y', function () {
                                            // Center label vertically
                                            const height = this.getBBox().height;
                                            // return parseFloat(b.attr('y')) + 11; // 11 is the label's margin from the top of bar
                                            return parseFloat(a.attr('y')) + (parseFloat(barHeight) / 2) + 4;
                                        })
                                        .attr('x', function () {
                                            // Center label horizontally
                                            const width = this.getBBox().width;
                                            return parseFloat(a.attr('x')) + (parseFloat(barWidth) / 2) - (width / 2);
                                        })
                                        // .attr('class', 'bar-values')
                                        .attr('style', 'fill: black; stroke: none; font:normal 10px roboto')
                                        .style('#808080');
                                    // .style('stroke', '#000');
                                });
                            });
                        }, 0);
                    }
                },
                // To get the Event Details
                multibar: {
                    dispatch: {
                        elementClick: function (el) {
                            that.paidAndSponsored.emit(el.data);
                        }
                    }
                },
            }
        };
    }
    ngOnChanges() {
        this.data = this.stackedData;
        this.title = this.config.title;
    }

    downloadChart(val) {
        this.exportChart.emit(val);
    }
}

