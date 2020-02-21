import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../configs/services/config.service';
import { TOKEN_NAME } from '../../common/auth/services/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from '../../utils/services/common.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-ch-home',
  templateUrl: './chome.component.html',
  styleUrls: ['./chome.component.css']
})
export class ChomeComponent implements OnInit {
  viewOpportunity: any;
  viewOverview: any;
  viewMemberships: any;
  viewTotalrevenue: any;
  setSponsor: any;
  routingUrl: string;
  chapters: any;
  selectedChapter: any;
  selectedCode: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  username: string;
  selectedDate: any;
  sponsor: boolean;
  reportingDates = [];
  selectedRDate: any;
  boardMember: boolean;
  showRdDate = true;
  viewDetailMetrics: any;
  viewSocialMedia: any;
  viewBoardMember: any;
  viewSponsor: any;
  showDropDown = true;
  viewRevenue: any;
  fiscalYears: any;
  selectedValue: any;

  constructor(
    private configService: ConfigService
    , private commonService: CommonService,
    private store: Store<any>) {
    this.getReportDates();
  }

  ngOnInit() {
    this.grantedPrivileges();
  }

  /**
 * To display all chapters in dropdown option
 * To display selected chapter in dropdown
 */
  setDropdown() {
    this.commonService.getChapterCode().subscribe(val => {
      let res = [];
      res = JSON.parse(localStorage.getItem('chapters'));
      res = _.orderBy(res, ['chapterName'], ['asc']);
      this.chapters = res;
      if (res.length !== 0 && this.selectedCode === undefined) {
        this.selectedCode = res[0].primaryGroupCode;
        this.selectedChapter = res[0].chapterName;
      } else {
        res.forEach(el => {
          if (el.primaryGroupCode === val) {
            this.selectedChapter = el.chapterName;
          }
        });
      }
    });

    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    this.username = decodedToken.user_name;
    this.boardMember = decodedToken.authorities.some(el => el === 'Manage Board Members') ||
      decodedToken.authorities.some(el => el === 'View Board Members');
  }


  /**
   * assign the chapterNames to dropdown
   * @param chapter chafypter object to load dropdown
   */
  dropdownChapterData(chapter) {
    this.selectedCode = '';
    this.selectedChapter = chapter.chapterName;
    this.selectedCode = chapter.primaryGroupCode;
    this.commonService.setChapterFromDropdown(this.selectedCode);
  }

  /*
* Selection of reporting dates 
*/
  reportingDateSelection(dt: any) {
    if (dt !== undefined) {
      this.selectedRDate = _.find(this.reportingDates, { code: dt });
      this.commonService.setReportingDate(this.selectedRDate.code);
    }
  }


  showReportingDate(selected) {
    let showTabs = ['overview', 'membership', 'metrics'];
    if (showTabs.includes(selected)) {
      this.showDropDown = true;
    } else {
      this.showDropDown = false;
    }
  }


  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.setSponsor = res.sponsor;
      this.username = res.username;
      this.viewDetailMetrics = res.viewDetailMetrics;
      this.viewSocialMedia = res.viewSocialMedia;
      this.viewRevenue = res.viewRevenue;
      this.viewBoardMember = res.viewBoardMember || res.manageBoardMembers;
      this.viewSponsor = res.viewChapterSponsor || res.manageChapterSponsor;
      this.viewOpportunity = res.viewChapterOpportunities || res.manageChapterOpportunities;
      this.viewOverview = res.viewOverview;
      this.viewMemberships = res.viewMemberships;
      this.viewTotalrevenue = res.viewTotalrevenue;

      if (this.viewOverview) {
        this.routingUrl = './overview/';
      } else if (this.viewMemberships) {
        this.routingUrl = './membership/';
      } else if (this.viewDetailMetrics) {
        this.routingUrl = './metrics/';
      } else if (this.viewRevenue) {
        this.routingUrl = './revenue/';
        this.showDropDown = false;
      } else if (this.viewBoardMember) {
        this.routingUrl = './boardMembers/';
        this.showDropDown = false;
      } else if (this.viewSocialMedia) {
        this.routingUrl = './social/';
        this.showDropDown = false;
      } else if (this.viewSponsor) {
        this.routingUrl = './sponsorship/';
        this.showDropDown = false;
      } else if (this.viewOpportunity) {
        this.routingUrl = './pipeline/';
        this.showDropDown = false;
      }
    });
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    this.username = decodedToken.user_name;
    this.sponsor = decodedToken.authorities.some(el => el === 'View Sponsors') ||
      decodedToken.authorities.some(el => el === 'Manage Sponsors');
    this.setDropdown();
  }

  setRDetails(Rdetails, fiscaYear) {
    this.store.dispatch({
      type: 'SET_FISCAL_REPORT',
      payload: <any>{
        reportingDate: Rdetails,
        fiscalYear: fiscaYear
      }
    });
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

  selectedFiscalYear(data) {
    this.setRDetails(this.selectedValue.csvLog[0].reportingDate, data.fiscaYear);
  }

  compareByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.fiscaYear == itemTwo.fiscaYear;
  }
}
