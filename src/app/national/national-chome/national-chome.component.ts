import { Component, OnInit, OnChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../../common/auth/services/auth.constant';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../../configs/services/config.service';
import { CommonService } from '../../utils/services/common.service';
import * as ujs from 'underscore';
import * as _ from 'lodash';
import { UserService } from '../../common/users-mgmt/service/users.service';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'em-chapters-dashboard',
  templateUrl: './national-chome.component.html',
  styleUrls: ['./national-chome.component.css']
})
export class NationalChaptersComponent implements OnInit {
  
  jwtHelper: JwtHelperService = new JwtHelperService();
  chapters: any;
  loading = false;
  primaryGroupCode: string;
  chapterName: any;
  selectedChapter: any;
  selectedCode: string;
  dashboard = true;
  membersTable = false;
  sponsorsTable = false;
  detailMetrics = false;
  element: any[];
  username: string;
  userRole: string;
  setSponsor: boolean;
  sponsor = false;
  selectedRDate: any;
  reportingDates = [];
  showUploadInconsistent: boolean;
  showDropDown = true;
  accessOpportunity: any;
  routingUrl: string;
  sponsored: any;
  nonSponsored: any;
  viewDetailMetrics: any;
  viewSocialMedia: any;
  viewBoardMember: any;
  viewSponsor: any;
  viewOpportunity: any;
  viewOverview: any;
  viewMemberships: any;
  viewTotalrevenue: any;
  viewRevenue: any;

  constructor(
    private router: Router
    ,private activatedRoute: ActivatedRoute,
     private notify: NotificationsService
    , private configService: ConfigService
    , private commonService: CommonService
    , private userService: UserService) {
      this.activatedRoute.params.subscribe(params => {
        this.dropDownValue(params["selectedCode"])
        // console.log('param',params["selectedCode"]);
      }
      );
    }
    
  ngOnInit() {
    this.grantedPrivileges();
  }

  setDropdown() {
    this.commonService.getChapterCode().subscribe(val => {
      this.loading = true;
      let res = [];
      this.loading = false;
      res = JSON.parse(localStorage.getItem('chapters'));
      res = _.orderBy(res, ['chapterName'], ['asc']);
      this.chapters = res;
      this.selectedCode = val;
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

    this.commonService.getReportingDates().subscribe(dates => {
      this.reportingDates = this.commonService.transformRDates(dates.csvLog);
      if (this.reportingDates.length > 0) {
        if (this.commonService.RDate_Observable.source['value']) {
          return this.reportingDateSelection(this.commonService.RDate_Observable.source['value']);
        }
        this.reportingDateSelection(this.reportingDates[0].code);
      }
    });
  }

  dropDownValue(val) {
    this.commonService.setChapterCode(val);
    this.selectedCode = val;
      this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterName(this.selectedChapter);
        }
      });
    });
  
  }


  
  /**
   * assign the chapterNames to dropdown
   * @param chapter chapter object to load dropdown
   */
  dropdownChapterData(chapter) {
    this.dashboard = true;
    this.membersTable = false;
    this.sponsorsTable = false;
    this.selectedCode = '';
    this.selectedChapter = chapter.chapterName;
    this.selectedCode = chapter.primaryGroupCode;
    this.commonService.setChapterFromDropdown(this.selectedCode);
  }
  //   /**
  // * Retrieve assigned role of the user who login into the system
  // */
  getUserRole(role) {
    this.userService.getUserRole(role).subscribe(res => {
      this.userRole = res.role.role;
      this.setDropdown();
    },
      error => {
        this.notify.error('', error.message);
      });
  }

  /**
 * decoding the token to get username
 */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.setSponsor = res.sponsor;
      this.username = res.username;
      this.accessOpportunity = res.accessOpportunity;
      this.sponsored = res.sponsored;
      this.nonSponsored = res.nonSponsored;
      this.viewDetailMetrics = res.viewDetailMetrics;
      this.viewSocialMedia = res.viewSocialMedia;
      this.viewBoardMember = res.viewBoardMember || res.manageBoardMembers;
      this.viewSponsor = res.manageChapterSponsor || res.viewChapterSponsor;
      this.viewOpportunity = res.manageChapterOpportunities || res.viewChapterOpportunities;
      this.viewOverview = res.viewOverview;
      this.viewMemberships = res.viewMemberships;
      this.viewRevenue = res.viewRevenue;

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
      } else {
        this.routingUrl = './overview/';
        this.viewOverview = true;
      }
      this.getUserRole(this.username);
    });
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    this.username = decodedToken.user_name;
    this.sponsor = decodedToken.authorities.some(el => el === 'View Sponsors') ||
      decodedToken.authorities.some(el => el === 'Manage Sponsors');
  }

  /*
 * Populate reporting dates from server 
 */
  reportingDateSelection(dt: any) {
    if (dt !== undefined) {
      this.selectedRDate = ujs.find(this.reportingDates, { code: dt });
      if (this.commonService.RDate_Observable.source['value'] !== dt) {
        this.commonService.setReportingDate(this.selectedRDate.code);
      }
    }
  }

  setUpReportFlag(tabSelected) {
    const Show = ['overview', 'membership', 'metrics'];
    if (Show.includes(tabSelected)) {
      this.showDropDown = true;
    } else {
      this.showDropDown = false;
    }
  }
}
