import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonService } from '../../utils/services/common.service';
import { MembersDataSnapshot } from '../../utils/pipes/trasformations.pipes';
import { DataTable } from 'primeng/primeng';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'em-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.css']
})
export class SnapshotComponent implements OnInit, OnChanges {
  @Input() forSponsership: boolean;
  @Input() exportName: any;
  @Input() dataForTable: any;
  @Input() fileNameData: any;
  @Input() reportingDate;
  @Input() selectedChapter;
  membersDataSnapshot = new MembersDataSnapshot();
  memberDataTable: any;
  memberData = {};
  memberView = false;
  export: boolean;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.grantedPrivileges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.memberDataTable = this.membersDataSnapshot.transform(this.dataForTable);
  }

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
      'sponsor': event.data.sponsor,
      'sponsershipCode': event.data.sponsershipCode
    };
  }

  getStatus(expiryDate: any): any {
    return (moment().isBefore(new Date(expiryDate)) ? true : false);
  }

  /**
  * retriving privileges of the role to export chart
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
    });
  }


  /**
   *
   * @param dt
   */
  exportCSV(dt: DataTable) {
    let fileNameOf;
    if (this.fileNameData === 'Paid') {
      fileNameOf = ' Member-Paid Memberships as of ';
    } else if (this.fileNameData === 'Expired') {
      fileNameOf = ' Expired Member-Paid Memberships as of  ';
    } else if (this.fileNameData === 'National Sponsor-Paid') {
      fileNameOf = ' National Sponsor-Paid Memberships as of ';
    } else if (this.fileNameData === 'Member Paid') {
      fileNameOf = ' Member-Paid Memberships as of ';
    } else if (this.fileNameData === 'Local Sponsor-Paid') {
      fileNameOf = ' Local Sponsor-Paid Memberships as of ';
    } else if (this.fileNameData === 'Other') {
      fileNameOf = ' Other Memberships as of ';
    }

    let name = '';
    this.selectedChapter.split(' ').forEach( (myObject) => {
      name  =  name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    const fileName = name + fileNameOf + this.reportingDate + '.csv';
    this.commonService.downloadCSVFile(dt, fileName);
   }
}
