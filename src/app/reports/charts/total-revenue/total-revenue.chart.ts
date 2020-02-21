import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import 'd3';
import 'nvd3';
import { CurrencyPipe } from '@angular/common';

@Component({
    // changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'em-total-revenue-chart',
    templateUrl: './total-revenue.chart.html',
    styleUrls: ['./total-revenue.chart.css']
})
export class TotalRevenueChart implements OnInit, OnChanges {
    options: any;
    data: any;
    @ViewChild('nvd3') nvd3;
    @Input('config') config;
    @Input('totalRevenue') totalRevenue;
    @Input() export;
    @Output() exportChart = new EventEmitter();
    totalTermValue: string = '';
    heading: string;
    title: string;
    tickformat: any = ',.1f';
    constructor() { }


    ngOnInit() {

        if (this.totalRevenue != null) {
            this.totalTermValue = this.totalRevenue[0].revenueTerm;
        }
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
                x: function (d) { return d.fiscalYear; },
                y: function (d) { return d.revenue + (1e-10); },
                duration: 500,
                color: ['rgb(31, 119, 180)', 'rgb(174, 199, 232)', "c781c6", "56d1db"],
                grouped: false,
                stacked: true,
                legendPosition: 'bottom',
                showControls: false,
                reduceYTicks: false,
                // color: ['#ab4432', '#cf543f', '#e1aba6'],

                xAxis: {
                    axisLabel: this.config.xAxisLabel,
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d;
                    }
                },
                yAxis: {
                    axisLabel: this.config.yAxisLabel,
                    //  axisLabelDistance: -12,
                    ticks: 20,
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
                        const id = '#totalRevenue';
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
                                            if (bar.revenue !== 0)
                                                return '$' + (+bar.revenue).toLocaleString();
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
                                        .attr('style', 'fill: black; stroke: none; font:normal 10px roboto !important; font-weight:500 !important')
                                        .style('#808080');
                                    // .style('stroke', '#000');
                                });
                            });
                        }, 0);
                    }
                },
            }
        };
    }

    ngOnChanges() {

        if (this.totalRevenue != null) {
            this.totalTermValue = this.totalRevenue[0].revenueTerm;
        }

        this.data = this.totalRevenue;
        this.title = this.config.title;
    }

    downloadChart(val) {
        this.exportChart.emit(val);
    }
}
