import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectDropdownComponent } from './components/single-select-dropdown/single-select-dropdown.component';
import { DataTableModule, DropdownModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DynamicDataTableComponent } from './components/dynamic-data-table/dynamic-data-table.component';
import { DynamicHeaderSort, DynamicHeaderDropDownCSV,
     DynamicColumnsSort, DynamicHeaderCSV, DynamicColumnsCSV,
      UpdateCSVJSONData, RemoveSpace, ArrayFirstLetterUpperCase, DropDownData } from './pipes/trasformations.pipes';

import { MultiBarChartComponent } from './charts/multi-bar-chart/multi-bar-chart.component';
import { NvD3Module } from 'ng2-nvd3';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { StackedBarChartComponent } from './charts/stacked-bar-chart/stacked-bar-chart.component';
import { GroupedBarChartComponent } from './charts/grouped-bar-chart/grouped-bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CircleProgressChartComponent } from './charts/circle-progress-chart/circle-progress-chart.component';

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        DataTableModule,
        ButtonModule,
        MultiSelectModule,
        TooltipModule,
        TableModule,
        NvD3Module,
        NgCircleProgressModule.forRoot({})
    ],

    declarations: [
        SingleSelectDropdownComponent,
        DynamicDataTableComponent,
        DynamicHeaderSort,
        MultiBarChartComponent,
        StackedBarChartComponent,
        GroupedBarChartComponent,
        LineChartComponent,
        SpinnerComponent,
        CircleProgressChartComponent,
        DynamicColumnsSort,
        DynamicHeaderDropDownCSV,
        DynamicHeaderCSV,
        DynamicColumnsCSV,
        UpdateCSVJSONData,
        RemoveSpace,
        ArrayFirstLetterUpperCase,
        DropDownData
        ],

    exports: [
        SingleSelectDropdownComponent,
        DynamicDataTableComponent,
        MultiBarChartComponent,
        StackedBarChartComponent,
        GroupedBarChartComponent,
        LineChartComponent,
        SpinnerComponent,
        CircleProgressChartComponent],

    providers: [],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class UtilsModule { }
