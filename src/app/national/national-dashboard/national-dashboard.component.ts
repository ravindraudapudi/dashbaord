import { Component, OnInit, OnChanges, ModuleWithComponentFactories } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../../common/auth/services/auth.constant';
import * as _ from 'lodash';
import { NationalService } from '../services/national-service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from 'src/app/configs/services/config.service';
import { CommonService } from '../../utils/services/common.service';
import { AuthService } from 'src/app/common/auth/services/auth.service';
import * as moment from 'moment';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-national-dashboard',
  templateUrl: './national-dashboard.component.html',
  styleUrls: ['./national-dashboard.component.css']
})
export class NationalDashboardComponent implements OnInit {

  loading: boolean;
  jwtHelper: JwtHelperService = new JwtHelperService();
  _metricsToShow = 'TM';
  dashBoardDetails: any;
  nationalSponsored: any;
  localSponsoredDetails: any;
  revenueDetails: any;
  totalActiveMembers: any;
  paidMembers: any;
  selectedPrivilages: any[];
  download: boolean;
  view_only: boolean;
  fyData: any;
  selectedFiscalYear: any;
  selectedRDate: any;
  reportingDates = [];
  today: any;

  fiscalYears = [];
  export: any;
  year: any;
  showUploadInconsistent: boolean;
  showRdDate = true;
  updateSponsor = false;
  accessOpportunity: any;
  sponsored: any;
  nonSponsored: any;
  isGrantedPrivallage: boolean;
  viewOpportunities: any;
  manageOpportunities: any;
  viewTotalActiveMembers: any;
  viewPaidMembers: false;
  viewNationalSponsoredMembers: any;
  viewLocalSponsoredMembers: any;
  viewTotalrevenue: any;
  enableSponsor: any;
  enableOppportunities: any;
  username: any;
  showDropDown = true;
  getRDetails: Store<any>;
  temp_metricsToShow = 'TM';

  constructor(
    private nationalService: NationalService
    , private commonService: CommonService
    , private authService: AuthService
    , private configService: ConfigService
    , private notification: NotificationsService
    , private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('setRDateDetails').subscribe((store) => {
     if (store && store.reportingDate && store.fiscalYear) {
      this.selectedRDate = store.reportingDate;
      this.isGrantedPrivallage = true;
      this.grantedPrivileges();
      this.loadDashboardData(store.reportingDate, store.fiscalYear);
     }
    });
  }

  loadDashboardData(rDate, year): any {
    if (rDate && year) {
      this._metricsToShow = this.temp_metricsToShow;
      this.loading = true;
      this.nationalService.requestDataFromMultipleSources(year, rDate.toString(), this.username).subscribe(responseList => {
        this.totalActiveMembers = responseList[0];
        this.paidMembers = responseList[1];
        this.localSponsoredDetails = responseList[2];
        this.nationalSponsored = responseList[3];
        this.revenueDetails = responseList[4];
        this.loading = false;
    });
    }
  }

  /**
  * Displaying Response and Error message
  */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.notification.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this.notification.error('', responseValue.errorDescrition);
    }
  }

  showMetrics(metricsType: string) {
    this._metricsToShow = metricsType;
    this.temp_metricsToShow = metricsType;
  }
  /**
  * Retrieve all Local Sponsored Memberships
  */
  getTotalActive(year, rDate, username) {
    this.nationalService.getTotalActiveMembers(year, rDate, username).subscribe(res => {
      this.totalActiveMembers = res;
      return res;
    }, error => {
      console.log(error);
      return error;
    });
  }

  /**
  * Retrieve all paid members
  */
  getPaidMembers(year, code, username) {
    this.nationalService.getPaidMembers(year, code, username).subscribe(res => {
      this.paidMembers = res;
      return res;
    }, error => {
      console.log(error);
      return error;
    });
  }

  /**
  * Retrieve all Local Sponsored Memberships
  */
  getLocalSponsored(year, code, username) {
    this.nationalService.getLocalSponsoredMembership(year, code, username).subscribe(res => {
      this.localSponsoredDetails = res;
      return res;
    }, error => {
      console.log(error);
      return error;
    });
  }

  /**
  * Retrieve all Local Sponsored Memberships
  */
  getNationalSponsored(year, code, username) {
    this.nationalService.getNationalSponsoredMembership(year, code, username).subscribe(res => {
      this.nationalSponsored = res;
      return res;
    }, error => {
      console.log(error);
      return error;
    });
  }

  /**
  * Retrieve Memberships revenue
  */
  getMembershipRevenue(year, username) {
    this.nationalService.getMembershipRevenue(year, username).subscribe(res => {
      this.revenueDetails = res;
      return res;
    }, error => {
      console.log(error);
      return error;
    });
  }

  /**
  * retriving privileges for the role to export data to CSV
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.username = res.username;
      this.export = res.export;
      this.viewOpportunities = res.viewOpportunities;
      this.manageOpportunities = res.manageOpportunities;
      this.viewTotalActiveMembers = res.viewTotalActiveMembers;
      this.viewPaidMembers = res.viewPaidMembers;
      this.viewNationalSponsoredMembers = res.viewNationalSponsoredMembers;
      this.viewLocalSponsoredMembers = res.viewLocalSponsoredMembers;
      this.viewTotalrevenue = res.viewTotalrevenue;
      this.enableSponsor = res.viewNationalSponsor || res.manageNationalSponsor;
      this.enableOppportunities = res.manageNationalOpportunities || res.viewNationalOpportunities;
      if (this.isGrantedPrivallage) {
        if (this.viewTotalActiveMembers) {
          this._metricsToShow = 'TM';
        } else if (this.viewPaidMembers) {
          this._metricsToShow = 'PM';
        } else if (this.viewLocalSponsoredMembers) {
          this._metricsToShow = 'LSM';
        } else if (this.viewNationalSponsoredMembers) {
          this._metricsToShow = 'NSM';
        } else if (this.viewTotalrevenue) {
          this._metricsToShow = 'MR';
        } else if (this.enableSponsor) {
          this._metricsToShow = 'NS';
          this.showDropDown = false;
        } else if (this.enableOppportunities) {
          this._metricsToShow = 'NSP';
          this.showDropDown = false;
        } else {
          this._metricsToShow = 'TM';
          this.viewTotalActiveMembers = true;
        }
        this.isGrantedPrivallage = false;
      }
    });
  }


  showReportingDate(selected) {
    const show = ['total-membership', 'paid-membership', 'sponsored-membership', 'national-sponsored-membership'];
    if (show.includes(selected)) {
      this.showRdDate = true;
    } else {
      this.showRdDate = false;
    }
  }
}
