import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NationalService } from '../../national/services/national-service';
import { CommonService } from '../../utils/services/common.service';
import { MembersDataSnapshot } from '../../utils/pipes/trasformations.pipes';
import { UserService } from '../../common/users-mgmt/service/users.service';
import { TOKEN_NAME } from '../../common/auth/services/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'em-manage-all',
  templateUrl: './manage-all.component.html',
  styleUrls: ['./manage-all.component.css']
})
export class ManageAllComponent implements OnInit {
  @Input() selected;
  @Input() paidExpired;
  membersDataSnapshot = new MembersDataSnapshot();
  jwtHelper: JwtHelperService = new JwtHelperService();
  mail_box = 'New Message';
  selected_member: any;
  toAddress: any[];
  cc: any[];
  bcc: any[];
  firstName: any;
  lastName: any;
  title: any;
  professionalTitle: any;
  employerName: any;
  guid: any;
  city: any;
  country: any;
  memberData = {};
  memberView = false;
  membershipData: any;
  allMemberdetails: any;
  primaryGroupCode: string;
  loading = false;
  selectedCode: any;
  sendMailDialog = false;
  subject: string;
  message: string;
  select: boolean;
  export: boolean;
  sendMail: boolean;
  chapterFileName = '';
  maxRdate: any;
  enableCCFlag = false;
  enableBCCFlag = false;

  constructor(private nationalService: NationalService
    , private activatedRoute: ActivatedRoute
    , private commonService: CommonService
    , private userService: UserService,
    private _notify: NotificationsService) {
    this.activatedRoute.params.subscribe(params => this.dropDownValue(params['selectedCode']));
  }

  ngOnInit() {
    this.getMembers();
    this.commonService.getChapterName().subscribe((chapterName) => {
      this.chapterFileName = chapterName;
    });
    this.grantedPrivileges();

    this.commonService.getReportingDates().subscribe((res) => {
      this.maxRdate = res.csvLog[0].reportingDate;
    });

  }

  /**
 * Retrieving selcted primary group code to display member details belongs to selected chapter
 * @param val selected chapter primary group code from route parameter
 */
  dropDownValue(val) {
    this.commonService.setChapterCode(val);
    this.primaryGroupCode = val;

  }
  /**
 * Retrieving all the members detail belongs to the selected chapter
 */
  getMembers() {
    if (this.selected !== undefined) {
      this.getMembersForNational();
    } else {
      this.getMembersForChapter();
    }
  }

  /**
   * To get drilldown membership data for whoever login as a NATIONAL
   */
  getMembersForNational() {
    if (this.paidExpired === true) {
      this.loading = true;
      this.nationalService.getMembersForChpater(this.selected).subscribe(res => {
        this.loading = false;
        this.membershipData = this.membersDataSnapshot.transform(res);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    } else {
      this.membershipData = this.membersDataSnapshot.transform(this.paidExpired);
    }
  }

  /**
 * To get drilldown paid and expired membership data for whoever login as a Chapter
 */
  getMembersForChapter() {
    const val = localStorage.getItem('seeMemberDetails');
    const manage = JSON.parse(val);
    if (manage !== true) {
      this.loading = true;
      this.nationalService.getMembersForChpater(this.primaryGroupCode).subscribe(res => {
        this.loading = false;
        this.membershipData = this.membersDataSnapshot.transform(res, true);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    } else {
      const retrievedData = localStorage.getItem('PaidExired');
      const parsedData = JSON.parse(retrievedData);
      this.membershipData = this.membersDataSnapshot.transform(parsedData);
    }
  }

  /**
   * Assigning member details to memberData object
   * @param event member details of selected chapter
   */
  memberDetails(event) {
    this.memberView = true;
    this.memberData = {
      'firstName': event.data.firstName,
      'lastName': event.data.lastName,
      'professionalTitle': event.data.professionalTitle,
      'company': event.data.company,
      'guid': event.data.guid,
      'city': event.data.city,
      'country': event.data.country,
      'email': event.data.email,
      'alternateEmails': event.data.alternateEmails,
      'mobile': event.data.mobile,
      'phone': event.data.phone,
      'status': event.data.status,
      'memberSince': event.data.memberSince,
      'expiryDate': event.data.expiryDate,
      'lastFollowUp': event.data.lastFollowUp,
      'renewalDate': event.data.renewalDate,
      'pastEvent': event.data.pastEvent,
      'pastEventDate': event.data.pastEventDate,
      'futureEvent': event.data.futureEvent,
      'futureEventDate': event.data.futureEventDate,
    };
  }

  getStatus(expiryDate: any): any {
    return (moment().isBefore(expiryDate) ? true : false);
  }
  /**
   * Tracking selected members on membership table
   */
  onRowSelect() {
    this.toAddress = [];
    this.selected_member.forEach(el => {
      this.toAddress.push(el.email);
      if (this.toAddress.length > 0) {
        this.select = true;
      } else {
        this.select = false;
      }
    });
  }

  /**
 * Tracking Unselected members on membership table
 */
  onRowUnselect() {
    this.toAddress.pop();
    if (this.toAddress.length > 0) {
      this.select = true;
    } else {
      this.select = false;
    }
  }

  /**
   * send Mail function to initiate mail sending process
   * dialog is appears on screen
   */
  sendMailToMembers() {
    this.toAddress = [];
    this.cc = [];
    this.bcc = [];
    this.subject = '';
    this.message = '';
    this.enableBCCFlag = false;
    this.enableCCFlag = false;
    if (this.select) {
      this.sendMailDialog = true;
      this.selected_member.forEach(el => {
        this.toAddress.push(el.email);
      });
    }
  }

  /**send a mail to selected members */
  submitMail() {
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    const content = this.message.replace(/<br>/g, '').replace(/<\/p><p>/g, '<br>');

    const requestObj = {
      'to': this.toAddress,
      'cc': this.cc,
      'bcc': this.bcc,
      'message': content,
      'subject': this.subject,
      'sentBy': decodedToken.user_name,
      'fromChapter': this.primaryGroupCode
    };

    this.sendMailDialog = false;
    this.loading = true;
    this.userService.sendMailToMembers(requestObj).subscribe(res => {
      this.loading = false;
      this.responseMessage(res);
    }, error => {
      this.loading = false;
      console.log(error);
    });
    this.selected_member = [];
  }

  /**
   * @param displaying response to user
   */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this._notify.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this._notify.error('', responseValue.errorDescrition);
    }
  }

  /**
  * retriving privileges of the role to export chart
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
      this.sendMail = res.sendMail;
    });
  }

  exportCSV(dt: DataTable) {
    let name = '';
    this.chapterFileName.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });
    const fileName = name + ' Membership List.csv';
    this.commonService.downloadCSVFile(dt, fileName);
  }

  /**
   * Enable CC filed
   */
  enableCC() {
    this.enableCCFlag = !this.enableCCFlag;
  }

  enableBCC() {
    this.enableBCCFlag = !this.enableBCCFlag;
  }
}
