import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ConfigService } from '../../configs/services/config.service';
import { CommonService } from 'src/app/utils/services/common.service';
import { BoardMember } from 'src/app/models/board-member';
import { DataTable } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { boardMembers } from 'src/app/utils/pipes/trasformations.pipes';
import * as moment from 'moment';

@Component({
  selector: 'em-boardmembers',
  templateUrl: './boardmembers.component.html',
  styleUrls: ['./boardmembers.component.css']
})
export class BoardmembersComponent implements OnInit {
  @ViewChild('boardMemberForm') myform: any;
  guidRegEx: RegExp = /^[a-zA-Z._-\d-]+$/;
  phoneRegEx: RegExp = /^[0-9\d-]+$/;
  nameRegEx: RegExp = /^[a-zA-Z ]*$/;
  emailRegEx: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  apiGuid: any;
  email: any;
  firstName: any;
  private _subscriptions: Array<Subscription> = [];
  lastName: any;
  memberRole: any;
  guidError: any;
  boardMember = new BoardMember();
  memberTable: { field: string; header: string; }[];
  memberDataTable: any;
  displayDialog: boolean;
  confirmDialog: boolean;
  dialogeHead: string;
  confirmHead: string;
  loading: boolean;
  export: boolean;
  viewBoardMember: boolean;
  selectedChapter: any;
  primaryGroupCode: any;
  boardMembers = new boardMembers();
  updateButton: boolean;
  addButton: boolean;
  edBoardMember = false;

  constructor(private _configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private _notify: NotificationsService
    , private confirmationService: ConfirmationService
    , private commonService: CommonService,
    private configService: ConfigService, ) {
    this.activatedRoute.params.subscribe(params => {
      if(params['selectedCode']){
        this.dropDownValue(params['selectedCode'])
      }
    });
    this.commonService.getChapterFromDropdown().subscribe(res => {
      if(res) {
        this.dropDownValue(res);
      }
    });
  }

  ngOnInit() {
    this.getBoardMembers();
    this.grantedPrivileges();
  }

  dropDownValue(val) {
    this.primaryGroupCode = val;
    // this.commonService.setChapterCode(val);
    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterCode(el.primaryGroupCode);
          this.commonService.setChapterName(this.selectedChapter);
        }
      });
    });
    this.getBoardMembers();
  }


  /**
   * configuring dialog box
   */
  showDialog() {
    this.guidError = null;
    this.displayDialog = true;
    this.updateButton = false;
    this.addButton = true;
    this.dialogeHead = 'Add Board Member';
    this.boardMember.apiGuid = '',
      this.boardMember.email = '',
      this.boardMember.firstName = '',
      this.boardMember.lastName = '',
      this.boardMember.memberRole = '',
      this.boardMember.phone = null,
      this.boardMember.organisation = '',
      this.boardMember.alternateEmail = '',
      this.myform.form.markAsPristine();
    this.myform.form.markAsUntouched();
  }



  /**
   * configuring dialog box
   */
  editBoardMember(data) {
    this.guidError = null;
    this.displayDialog = true;
    this.updateButton = true;
    this.addButton = false;
    this.dialogeHead = 'Edit Board Member';
    this.boardMember.id = data.id,
      this.boardMember.apiGuid = data.apiGuid,
      this.boardMember.email = data.email,
      this.boardMember.firstName = data.firstName,
      this.boardMember.lastName = data.lastName,
      this.boardMember.memberRole = data.memberRole,
      this.boardMember.phone = data.phone,
      this.boardMember.organisation = data.organisation,
      this.boardMember.alternateEmail = data.alternateEmail
  }


  focusOutFunction(apiGuid) {
    this._configService.getMemberDetailsForApiGuid(apiGuid.target.value).subscribe(res => {
      this.boardMember.firstName = res.firstName;
      this.boardMember.lastName = res.lastName;
      this.boardMember.email = res.email;
      this.boardMember.phone = res.mobile;
      this.boardMember.alternateEmail = res.alternateEmails;
      this.boardMember.organisation = res.employer.name;
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
 * Add members as a boardmember
 **/
  addBoardMember() {
    this.loading = true;
    this.boardMember = {
      id: null,
      primaryGroupCode: this.primaryGroupCode,
      apiGuid: this.boardMember.apiGuid,
      email: this.boardMember.email,
      firstName: this.boardMember.firstName,
      lastName: this.boardMember.lastName,
      memberRole: this.boardMember.memberRole,
      phone: this.boardMember.phone,
      organisation: this.boardMember.organisation,
      alternateEmail: this.boardMember.alternateEmail,
      status: this.boardMember.status
    };
    this.displayDialog = false;
    const subsribeValue = this._configService.addBoardMembers(this.boardMember)
      .subscribe(res => {
        const responseValue = JSON.parse(JSON.stringify(res));
        if (responseValue.responseStatus === '201') {
          this.displayDialog = false;
        } else {
          this.guidError = responseValue.errorDescrition;
          this.displayDialog = false;
        }
        this.loading = false;
        this.responseMessage(res);
        this.getBoardMembers();
      }, error => {
        this.loading = false;
      });
    this._subscriptions.push(subsribeValue);
  }

  updateBoardMember(data) {
    this.boardMember = {
      id: this.boardMember.id,
      primaryGroupCode: this.primaryGroupCode,
      apiGuid: this.boardMember.apiGuid,
      email: this.boardMember.email,
      firstName: this.boardMember.firstName,
      lastName: this.boardMember.lastName,
      memberRole: this.boardMember.memberRole,
      phone: this.boardMember.phone,
      organisation: this.boardMember.organisation,
      alternateEmail: this.boardMember.alternateEmail,
      status: this.boardMember.status
    };
    this.displayDialog = false;
    const subsribeValue = this._configService.updateBoardMembers(this.boardMember)
      .subscribe(res => {
        const responseValue = JSON.parse(JSON.stringify(res));
        if (responseValue.responseStatus === '201') {
          this.displayDialog = false;
        } else {
          this.guidError = responseValue.errorDescrition;
          this.displayDialog = false;
        }
        this.loading = false;
        this.responseMessage(res);
        this.getBoardMembers();
      }, error => {
        this.loading = false;
      });
    this._subscriptions.push(subsribeValue);

  }

  /**
  * get boardmembers
  **/
  getBoardMembers() {
    this.loading = true;
    this._configService.getAllBoardMembers(this.primaryGroupCode).subscribe(res => {
      this.memberDataTable = this.boardMembers.transform(res);
      this.loading = false;
    }, error => {
      this._notify.error('', error.message);
    });
  }

  confirmation(rowData) {
    this.confirmHead = 'Confirmation';
    this.confirmationService.confirm({
      message: 'Do you want to delete this member?',
      accept: () => {
        this.loading = true;
        this._configService.deleteBoardMember(rowData.id).subscribe(res => {
          this.loading = false;
          this.responseMessage(res);
          this.getBoardMembers();
        }, error => {
          this.loading = false;
          this._notify.error('', error.message);
          this.getBoardMembers();
        });
      }
    });
  }

  /**
  * retriving privileges for the role to add board Member
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
      this.edBoardMember = res.manageBoardMembers;
    });
  }

  /**
    * Response and Error messages show
    */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this._notify.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this._notify.error('', responseValue.errorDescrition);
    }
  }

  exportCSV(dt: DataTable) {

    let name = '';
    this.selectedChapter.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    const fileName = name + ' Board Members Contact List.csv';

    let exportColumns = ['apiGuid', 'firstName', 'middleName', 'lastName', 'email',
      'memberRole', 'organisation', 'alternateEmail', 'phone', 'employerName',
      'memberSignup', 'expiryDate', 'membershipType', 'primaryGroupCode', 'amount',
      'paymentType', 'processedDate', 'sponsor', 'promotionalCode', 'emailBounced',
      'gender'
    ];

    let UpdatedExportColumns = ['API_GUID', 'First_Name', 'Middle_Name', 'Last_Name', 'Email_Address',
      'Chapter_Role', 'Organisation', 'Email_Address_Alternate', 'phone', 'Employer_Name',
      'Member_Sign_up', 'Date_Membership_Expires', 'Membership Type', 'Primary_Group_Code', 'Amount',
      'Payment_Type', 'Processed_Date', 'Sponsor', 'Promotional_Code', 'Email_Bounced',
      'Gender'
    ];

    let formmatedList = [];
    let dataTemp;
    let dtTemp = dt.value.slice();
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};
      exportColumns.forEach((key, index) => {
        dataTemp[UpdatedExportColumns[index]] = field[key] === undefined
         || field[key] === null ? '' : field[key] 
         instanceof Date ? moment(field[key]).format('MM/DD/YYYY') : String(field[key]).replace(',', '');
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }
}
