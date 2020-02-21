import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

import { ConfigService } from '../../configs/services/config.service';
import { CommonService } from '../../utils/services/common.service';
import { UserService } from '../../common/users-mgmt/service/users.service';
import { NotificationsService } from 'angular2-notifications';
import { Store } from '@ngrx/store';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-nl-home',
  templateUrl: './nhome.component.html',
  styleUrls: ['./nhome.component.css']
})
export class NhomeComponent implements OnInit {
  selectedValue: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  selectedChapter: any;
  selectedCode: any;
  _upload: boolean;
  userRole: string;
  username: any;
  chapterActiveFlag: boolean;
  enableSettings: boolean;
  accessOpportunity: any;
  routingUrl = '';
  viewOverview: any;
  viewDetailMetrics: any;
  viewSocialMedia: any;
  viewBoardMember: any;
  viewSponsor: any;
  viewOpportunity: any;
  viewMemberships: any;
  viewTotalrevenue: any;
  viewRevenue: any;
  fiscalYears: Array<any>;
  selectedrDate: any;
  selectedDate: any;
  selectedReportingDates: any;
  tempFiscalYears: any[];
  isShowdropdown:boolean = true;

  constructor(private router: Router
    , private userService: UserService
    , private activeRoute: ActivatedRoute
    , private notify: NotificationsService
    , private configService: ConfigService
    , private commonService: CommonService,
      private store: Store<any>) {
    this.defaultRoute();
  }

  ngOnInit() {
    this.getReportDates();
    this.grantedPrivileges();
  }

  /**
   *  to show initial tab - National Dashboard
   */
  defaultRoute() {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd && !this.router.url.includes('chapters') && !this.router.url.includes('national')
          && !this.router.url.includes('configs') && !this.router.url.includes('reset')
          && !this.router.url.includes('uploads') && !this.router.url.includes('membership')) {
          this.activeRoute.url.subscribe(
            ref => this.router.navigateByUrl('/' + ref[0].path + '/dashboard')
          );
        }

        if (this.router.url.includes('national/chapters')) {
          this.chapterActiveFlag = true;
        } else {
          this.chapterActiveFlag = false;
        }
      }
    );
  }

  /**
  * To get a default chapter on intial load
  */
  getDefualtChapter() {
    this.configService.getChaptersForUser(this.username).subscribe(res => {
      res = _.orderBy(res, ['chapterName'], ['asc']);
      res = _.filter(res, function (r) { return r.type === 'PROFESSIONAL'; });
      this.selectedCode = res[0].primaryGroupCode;
      this.selectedChapter = res[0].chapterName;
    }, error => {
      console.log(error);
    });
  }

  /**
   * retriving privileges for the role to upload Data
   */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe((res) => {
      this.accessOpportunity = res.viewOpportunities || res.manageOpportunities;
      this.viewOverview = res.viewOverview;
     // this.enableSettings = res.setGoal || res.setFy || res.createUser || res.createChapter || res.setUpPipeline;
      this.enableSettings = true ;
      this.accessOpportunity = res.accessOpportunity;
      this.viewDetailMetrics = res.viewDetailMetrics;
      this.viewSocialMedia = res.viewSocialMedia;
      this.viewBoardMember = res.viewBoardMember || res.manageBoardMembers;
      this.viewSponsor = res.viewSponsor || res.manageSponsor;
      this.viewOpportunity = res.manageChapterOpportunities || res.viewChapterOpportunities;
      this.viewOverview = res.viewOverview;
      this.viewMemberships = res.viewMemberships;
      this.viewRevenue = res.viewRevenue;
      this._upload = res.upload;
      this.username = res.username;

      if (this.viewOverview) {
        this.routingUrl = 'chapters/overview';
      } else if (this.viewMemberships) {
        this.routingUrl = 'chapters/membership/';
      } else if (this.viewDetailMetrics) {
        this.routingUrl = 'chapters/metrics/';
      } else if (this.viewRevenue) {
        this.routingUrl = 'chapters/revenue/';
      } else if (this.viewBoardMember) {
        this.routingUrl = 'chapters/boardMembers/';
      } else if (this.viewSocialMedia) {
        this.routingUrl = 'chapters/social/';
      } else if (this.viewSponsor) {
        this.routingUrl = 'chapters/sponsorship/';
      } else if (this.viewOpportunity) {
        this.routingUrl = 'chapters/pipeline/';
      } else {
        this.routingUrl = 'chapters/overview';
      }
    });
    this.getUserRole(this.username);
  }

  getUserRole(role) {
    this.userService.getUserRole(role).subscribe(res => {
      this.userRole = res.role.role;
      this.getDefualtChapter();
    },
      error => {
        this.notify.error('', error.message);
      });
  }

  compareByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.fiscaYear == itemTwo.fiscaYear;
  }

  selectedFiscalYear(data) {
    this.setRDetails(this.selectedValue.csvLog[0].reportingDate, data.fiscaYear);
  }

  disableDropDown(){
    this.isShowdropdown = false;
  }

  enableDropDown(){
    this.isShowdropdown = true;
  }

  getReportDates() {
    this.commonService.getReportingDates().subscribe((res) => {
      this.fiscalYears = res.reportingDatesForFiscal;
      this.fiscalYears.forEach(element => {
        if (element.fiscaYear == res.currentFiscalYear) {
          this.selectedValue = element;
          this.setRDetails(this.selectedValue.csvLog[0].reportingDate, this.selectedValue.fiscaYear);
        }
      });
    });
  }

  selectedDateValue() {
      this.setRDetails(this.selectedDate, this.selectedValue.fiscaYear);
  }

  setRDetails(Rdetails, fiscaYear) {
    this.store.dispatch({
      type: 'SET_FISCAL_REPORT',
      payload: <any> {
        reportingDate : Rdetails,
        fiscalYear: fiscaYear
      }
    });
  }
}
