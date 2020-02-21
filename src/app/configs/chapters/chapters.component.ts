import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ConfigService } from '../services/config.service';
import { Chapter1 } from '../../models/chapter';
import { UserService } from '../../common/users-mgmt/service/users.service';
import { CommonService } from 'src/app/utils/services/common.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'em-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  @ViewChild('imgInput') clearImg: ElementRef;
  chapterForm: FormGroup;
  createChap: boolean;
  dialogeHead: string;
  displayDialog: boolean;
  updateButton: boolean;
  addButton: boolean;
  private _subscriptions: Array<Subscription> = [];
  colsForTable: any;
  dataForTable: any;
  chapter = new Chapter1();
  urlreadStatus = true;
  profileSizeError = false;
  btDis = true;
  filestring: any;
  chapterLogo: boolean;
  topMargin = false;
  noSpecial: RegExp = /^[a-zA-Z ]*$/;
  primaryGroupCode = '';
  chapterName: string;
  chapterImage: string;
  associatedWith: string;
  chapterNameAlert = 'Chapter name required';
  primaryGroupCodeAlert = 'Primary group code required';
  chapterTypeAlert: 'Chapter type required';
  chapterImageAlert: 'Chpater logo is required';
  associatedWithAlert: 'Associated chapter code required';
  chapterEmailAlert = 'Chapter email required';
  chapterPasswordAlert = 'Chapter email password required';
  loading: boolean;
  chapterType: { label: string; value: any; }[];
  isAssociated: boolean;
  username: string;
  userRole: string;
  confirmHead: string;
  editChapterdetails: boolean = false;
  primaryTempCode: any;

  constructor(private commonService: CommonService,
    private _configService: ConfigService,
    private _notify: NotificationsService,
    private confirmationService: ConfirmationService,
    private userService: UserService, private fb: FormBuilder) {
    this.chapterIn();
    this.chapterType = [
      { label: 'Professional', value: 'PROFESSIONAL' },
      { label: 'Student', value: 'STUDENT' },
    ];
  }

  ngOnInit() {
    this.grantedPrivileges();
    this.commonService.reset();
    this.addButton = true;
    this.updateButton = false;
  }

  chapterIn() {
    this.chapterForm = this.fb.group({
      'chapterName': [null, Validators.compose([Validators.required, Validators.pattern(this.noSpecial),
      Validators.minLength(3), Validators.maxLength(100)])],
      'primaryGroupCode': [null, Validators.compose([Validators.required, Validators.pattern(this.noSpecial),
      Validators.minLength(2), Validators.maxLength(20)])],
      'type': [null, Validators.compose([Validators.required])],
      'associatedWith': [null],
      'chapterImage': [null],
      'chapterEmail': [null, Validators.compose([Validators.required])],
      'chapterPassWord': [null, Validators.compose([Validators.required])]
    });
  }

  showDialog() {
    this.displayDialog = true;
    this.dialogeHead = 'Add Chapter';
    this.addButton = true;
    this.updateButton = false;
    this.chapterForm.reset();
    this.chapterImage = '';
    this.filestring = '';
    this.chapterLogo = false;
    this.isAssociated = false;
  }

  selectType(e) {
    if (e.value === 'STUDENT') {
      this.isAssociated = true;
      this.filestring = '';
      this.chapterLogo = false;
    } else {
      this.isAssociated = false;
      this.chapterForm.controls['associatedWith'].setValue('');
    }
  }

  /**
  * Retrieve all Chapters
  */
  getChaptersDetails() {
      this.loading = true;
      this._configService.getChapters().subscribe(res => {
        this.dataForTable = _.orderBy(res, ['chapterName'], ['asc']);
        this.loading = false;
      }, error => {
        this.loading = false;
        this._notify.error('', error.message);
      });
  }

  /**
   * Add new Chapter
   */
  addChapter(chapter) {
    this.editChapterdetails = true;
    let chapterObj = {};
    chapterObj = ({
      'chapterName': chapter.chapterName.toLocaleLowerCase(),
      'primaryGroupCode': chapter.primaryGroupCode.toLocaleUpperCase(),
      'type': chapter.type,
      'associatedWith': chapter.associatedWith,
      'chapterEmail': chapter.chapterEmail,
      'chapterPassWord': chapter.chapterPassWord
    });
    this.displayDialog = false;
    this.loading = true;
    const subsribeValue = this._configService.saveChapter(chapterObj).subscribe(res => {
      this.loading = false;
      this.responseMessage(res);
    }, error => {
      this.displayDialog = false;
      this.loading = false;
      this._notify.error('', error.message);
    });
    this._subscriptions.push(subsribeValue);
  }

  /**
  * Response and Error messages show
  */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this._notify.success('', responseValue.successDescription);
      this.getChaptersDetails();
      this.chapterForm.reset();
      this.displayDialog = false;
    } else if (responseValue.responseStatus === '500') {
      this._notify.error('', responseValue.errorDescrition);
    }
  }

  editChapter(data) {
    this.primaryTempCode = data.primaryGroupCode;
    this.editChapterdetails = true;
    if (this.createChap === true) {
      this.displayDialog = true;
    } else {
      this.displayDialog = false;
    }
    this.dialogeHead = 'Edit Chapter';
    this.addButton = false;
    this.updateButton = true;
    this.chapterForm.controls['chapterName'].setValue(data.chapterName);
    this.chapterForm.controls['primaryGroupCode'].setValue(data.primaryGroupCode);
    this.chapterForm.controls['type'].setValue(data.type);
    if (data.type === 'PROFESSIONAL') {
      this.isAssociated = false;
      this.chapterForm.controls['associatedWith'].setValue('');
    } else {
      this.isAssociated = true;
      this.chapterForm.controls['associatedWith'].setValue(data.associatedWith);
    }
    this.chapter.id = data.id;
    this.chapterForm.controls['chapterEmail'].setValue(data.chapterEmail);
    this.chapterForm.controls['chapterPassWord'].setValue(data.chapterPassWord);
  }

  /**
   * Updating Chapter details
   * @param data edited chapter info
   */
  updateChapter(data) {
    this.displayDialog = false;
    this.loading = true;
    let tempData = this.dataForTable.slice();
    let tempDoc = _.find(tempData, { 'primaryGroupCode': data.primaryGroupCode.toLocaleUpperCase() });
    if (tempDoc === undefined) {
      this.transformChapterData(data);
    } else if (tempDoc.primaryGroupCode === this.primaryTempCode) {
      this.transformChapterData(data);
    } else {
      this._notify.error('', 'Primary group code present in other chapter');
      this.loading = false;
    }
  }

  transformChapterData(data) {
    let chapterObj;
    chapterObj = {
      'id': this.chapter.id,
      'chapterName': data.chapterName.toLocaleLowerCase(),
      'primaryGroupCode': data.primaryGroupCode.toLocaleUpperCase(),
      'type': data.type,
      'associatedWith': data.associatedWith,
      'chapterEmail': data.chapterEmail,
      'chapterPassWord': data.chapterPassWord
    };
    this._configService.updateChapter(chapterObj)
      .subscribe(res => {
        this.responseMessage(res);
        this.getChaptersDetails();
        this.displayDialog = false;
        this.loading = false;
      }, error => {
        this.displayDialog = false;
        this.loading = false;
        this._notify.error('', error.message);
      });
  }
  /*
  * Chapter Logo upload
  */
  readUrl(event: any) {
    this.urlreadStatus = false;
    if (event.target.files[0].size > 256000) {
      this.btDis = true;
      this.profileSizeError = true;
    } else {
      this.profileSizeError = false;
      const ftype = event.target.files[0].type;
      switch (ftype) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
          this.profileSizeError = false;
          this.btDis = false;
          break;
        default: this.profileSizeError = true;
          break;
      }
      if (this.profileSizeError === false) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (load: any) => {
            this.chapterImage = load.target.result;
            this.chapterLogo = true;
            this.filestring = this.chapterImage.substring(this.chapterImage.indexOf('base64,') + 7);
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
    }
  }

  /**
 * Retrieving assigned user role who login into the system
 */
  getUserRole(role) {
    this.userService.getUserRole(role).subscribe(res => {
      this.userRole = res.role.role;
      this.getChaptersDetails();
    },
      error => {
        this._notify.error('', error.message);
      });
  }

  /**
* Retriving Chapter Creation privilege by token
*/
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.createChap = res.createChapter;
      this.username = res.username;
      this.getUserRole(this.username);
    });
  }

  confirmation(rowData) {
    this.confirmHead = 'Confirmation';
    this.confirmationService.confirm({
      message: 'Do you want to delete this Chapter?',
      accept: () => {
        this.loading = true;
        let tempData = [];
        this._configService.deleteChapter(rowData.id).subscribe(res => {
          this.dataForTable.filter((data) => {
            if (data.id !== rowData.id) {
              tempData.push(data);
            }
          })
          this.dataForTable = tempData;
          const responseValue = JSON.parse(JSON.stringify(res));
          if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
            this._notify.success('', responseValue.successDescription);
            this.chapterForm.reset();
            this.displayDialog = false;
          } else if (responseValue.responseStatus === '500') {
            this._notify.error('', responseValue.errorDescrition);
          }
          this.loading = false;
        }, error => {
          this.getChaptersDetails();
          this.loading = false;
          this._notify.error('', error.message);
        });
      }
    });
  }
}
