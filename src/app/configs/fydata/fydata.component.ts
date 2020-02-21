import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { NotificationsService } from 'angular2-notifications';
import { MenuItem } from 'primeng/primeng';
import { FiscalYearData } from '../../models/fiscal-year-data';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { CommonService } from '../../utils/services/common.service';
import { UserService } from '../../common/users-mgmt/service/users.service';

@Component({
  selector: 'em-fydata',
  templateUrl: './fydata.component.html',
  styleUrls: ['./fydata.component.css']
})
export class FydataComponent implements OnInit {
  loading: boolean;
  items: MenuItem[];
  displayDialog: boolean;
  selectedFiscalYear: any;
  fiscal = new FiscalYearData();
  fyForm: FormGroup;
  selectedGoal: any;
  fyData: any;
  fyCol: any[];
  eidtId: any;
  editchapterName: any;
  editPrimaryGroupCode: any;
  dialogeHead: string;
  setFy: boolean;
  username: string;
  userRole: string;

  fiscalYears = [
  {
    label: '2017',
    code: '2017'
  },
  {
    label: '2016',
    code: '2016'
  }];

  constructor(private _configService: ConfigService
    , private _notify: NotificationsService
    , private commonService: CommonService
    , private userService: UserService) { }

  ngOnInit() {
    this.grantedPrivileges();
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  /**
   * get fiscal year data from database
   * @param year fiscal year
   */

  getUserRole(role) {
    this.userService.getUserRole(role).subscribe(res => {
      this.userRole = res.role.role;
      this.getFiscalYearData('2017');
    },
      error => {
        this._notify.error('', error.message);
      });
  }

  getFiscalYearData(year: string) {
    const professionalFy = [];
    if (this.userRole === 'SuperAdmin') {
      this.loading = true;
      this._configService.getAllFiscalYearData(year).subscribe(res => {
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.fyData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
        this.loading = false;
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
    } else {
      this.loading = true;
      this._configService.getFiscalYearData(year, this.username).subscribe(res => {
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.fyData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
        this.loading = false;
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
    }
  }

  /**
   * Updating the fy data
   * @param rowData getting from fy data table
   */
  editFyData(rowData) {
    if (this.setFy === true) {
      this.displayDialog = true;
    } else {
      this.displayDialog = false;
    }
    this.dialogeHead = 'Edit Fiscal Year';
    this.eidtId = rowData.id;
    this.fiscal.fiscalYear = rowData.fiscalYear;
    this.fiscal.chapterName = rowData.chapterName;
    this.fiscal.totalActiveMembership = rowData.totalActiveMembership;
    this.fiscal.paidMembership = rowData.paidMembership;
    this.fiscal.localSponseredMembership = rowData.localSponseredMembership;
    this.fiscal.nationalSponseredMembership = rowData.nationalSponseredMembership;
    this.fiscal.totalRevenue = rowData.totalRevenue;
  }

  /**
   * To save fiscal year data
   */
  saveFiscalYear() {
    this.displayDialog = false;
    this.loading = true;
    this._configService.updateFiscalyear(this.eidtId, this.fiscal).subscribe(res => {
      this.getFiscalYearData(this.fiscal.fiscalYear);
      this.loading = false;
      this.displayDialog = false;
      this.responseMessage(res);
    }, error => {
      this.loading = false;
      this._notify.error('', error.message);
    });
  }

  /**
  * Displaying Response and Error message
  */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this._notify.success('', responseValue.successDescription);
      // this.fyForm.reset();
    } else if (responseValue.responseStatus === '500') {
      this._notify.error('', responseValue.errorDescrition);
    }
  }

  /**
   * render the table data according to fiscal year
   */
  fiscalSelection() {
    const professionalFy = [];
    if (this.userRole === 'SuperAdmin') {
      this.loading = true;
      this._configService.getAllFiscalYearData(this.selectedFiscalYear.code).subscribe(res => {
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.fyData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
        this.loading = false;
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
    } else {
      this.loading = true;
      this._configService.getFiscalYearData(this.selectedFiscalYear.code, this.username).subscribe(res => {
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.fyData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
        this.loading = false;
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
    }
  }
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.setFy = res.setFy;
      this.username = res.username;
      this.getUserRole(this.username);
    });
  }
}
