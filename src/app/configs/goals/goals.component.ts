import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../services/config.service';
import { UserService } from 'src/app/common/users-mgmt/service/users.service';
import { CommonService } from 'src/app/utils/services/common.service';
import { MenuItem } from 'primeng/primeng';
import { FiscalYearData } from 'src/app/models/fiscal-year-data';

@Component({
  selector: 'em-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  items: MenuItem[];
  displayDialog: boolean;
  goalData: any;
  selectedGoal: any;
  selectedFiscalYear: any;
  goalCol: any[];
  eidtId: any;
  loading = false;
  editchapterName: any;
  editPrimaryGroupCode: any;
  dialogeHead: string;
  setGoal: boolean;
  username: string;
  userRole: string;
  fyData: any;
  fiscal = new FiscalYearData();
  constructor(private _configService: ConfigService
    , private _notify: NotificationsService
    , private userService: UserService
    , private commonService: CommonService) { }

  fiscalYears = [
    {
      label: '2016',
      code: '2016'
    }, {
      label: '2017',
      code: '2017'
    },
    {
      label: '2018',
      code: '2018'
    },
    {
      label: '2019',
      code: '2019'
    },
    {
      label: '2020',
      code: '2020'
    },
    {
      label: '2021',
      code: '2021'
    },
    {
      label: '2022',
      code: '2022'
    },
    {
      label: '2023',
      code: '2023'
    },
    {
      label: '2024',
      code: '2024'
    }
  ];

  ngOnInit() {
    this.grantedPrivileges();
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  /**
 * Retrieve assigned role of the user who login into the system
 */
  getUserRole(role) {
    this.userService.getUserRole(role).subscribe(res => {
      this.userRole = res.role.role;
      this.getFiscalYearGoalData('2017');
    },
      error => {
        this._notify.error('', error.message);
      });
  }

  /**
  * get fiscal year data from database
  * @param year fiscal year
  */
  getFiscalYearGoalData(year: string) {
    const professionalFy = [];
    if (this.userRole === 'SuperAdmin') {
      this.loading = true;
      this._configService.getAllFiscalYearData(year).subscribe(res => {
        this.loading = false;
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.goalData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
    } else {
      this.loading = true;
      this._configService.getFiscalYearData(year, this.username).subscribe(res => {
        this.loading = false;
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.goalData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
    }
  }

  /**
   * Render the table data according to fiscal year
   */
  fiscalSelection() {
    const professionalFy = [];
    if (this.userRole === 'SuperAdmin') {
      this.loading = true;
      this._configService.getAllFiscalYearData(this.selectedFiscalYear.code).subscribe(res => {
        this.loading = false;
        res.forEach(el => {
          if (el != null && el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.goalData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });

    } else {
      this.loading = true;
      this._configService.fiscalYearCode(this.selectedFiscalYear.code, this.username).subscribe(res => {
        this.loading = false;
        res.forEach(el => {
          if (el.type === 'PROFESSIONAL') {
            professionalFy.push(el);
          }
        });
        this.goalData = _.orderBy(professionalFy, ['chapterName'], ['asc']);
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
  editGoal(rowData) {
    if (this.setGoal === true) {
      this.displayDialog = true;
    } else {
      this.displayDialog = false;
    }
    this.dialogeHead = 'Edit Fiscal Year Goal';
    this.eidtId = rowData.id;
    this.fiscal.fiscalYear = rowData.fiscalYear;
    this.fiscal.chapterName = rowData.chapterName;
    this.fiscal.totalActiveMembershipGoal = rowData.totalActiveMembershipGoal;
    this.fiscal.paidMembershipGoal = rowData.paidMembershipGoal;
    this.fiscal.localSponseredMembershipGoal = rowData.localSponseredMembershipGoal;
    this.fiscal.nationalSponsoredMembershipGoal = rowData.nationalSponsoredMembershipGoal;
    this.fiscal.totalRevenueGoal = rowData.totalRevenueGoal;
    this.fiscal.membershipRevenueGoal = rowData.membershipRevenueGoal;
    this.fiscal.registrationEventsGoal = rowData.registrationEventsGoal;
    this.fiscal.programRevenueGoal = rowData.programRevenueGoal;
    this.fiscal.expirationRateGoal = rowData.expirationRateGoal;
    this.fiscal.otherRevenueGoal = rowData.otherRevenueGoal;
    
  }

  /**
   * To save fiscal year data
   */
  saveGoal() {
    this.displayDialog = false;
    this.loading = true;
    this._configService.updateFiscalYearGoal(this.eidtId, this.fiscal).subscribe(res => {
      this.loading = false;
      this.getFiscalYearGoalData(this.fiscal.fiscalYear);
      this.displayDialog = false;
      this.responseMessage(res);
    }, error => {
      this.loading = false;
      this._notify.error('', error.message);
    });
  }

  /**
  * retriving privileges for the role to edit goal
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.setGoal = res.setGoal;
      this.username = res.username;
      this.getUserRole(this.username);
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
}
