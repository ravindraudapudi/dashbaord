import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MultiSelectModule } from 'primeng/multiselect';
import { NvD3Module } from 'ng2-nvd3';

import { APP_ROUTES } from './app.route.module';
import { AuthModule } from './common/auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { ReportsModule } from './reports/reports.module';
import { HttpClientInterceptorService } from './common/services/httpClient.interceptor';

import { AppComponent } from './app.component';
import { NhomeComponent } from './national/nhome/nhome.component';
import { ChomeComponent } from './chapters/chome/chome.component';
import { AuthGuard } from './common/auth/services/auth.gaurd';
import { CommonService } from './utils/services/common.service';
import { PipelineService } from './services/pipeline.service';
import {setRDateDetails } from './common/store/reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent, NhomeComponent, ChomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NvD3Module,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    SimpleNotificationsModule.forRoot(),
    APP_ROUTES,
    StoreModule.forRoot({setRDateDetails: setRDateDetails}),
    AuthModule.forRoot(), UtilsModule, ReportsModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthGuard,
    CommonService,
    PipelineService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
