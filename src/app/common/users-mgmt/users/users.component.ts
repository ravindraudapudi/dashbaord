import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DropDownData, ArrayFirstLetterUpperCase } from '../../../utils/pipes/trasformations.pipes';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { User } from '../../../models/user';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../service/users.service';
import { CommonService } from '../../../utils/services/common.service';
import { ConfigService } from 'src/app/configs/services/config.service';

@Component({
  selector: 'em-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('addUserForm') myform: any;
  heading = 'User Management';
  noSpace = /^\S*$/;
  nameRegEx: RegExp = /^[a-zA-Z ]*$/;
  private _subscriptions: Array<Subscription> = [];
  dialog_header: string;
  displayDialog = false;
  update_button = false;
  add_button: boolean;
  delete_button = false;
  new_user: boolean;
  userRead: boolean;
  passData = false;
  usersDetails: any;
  oldId: number;
  oldStatus: boolean;
  userStatus: string;
  userInfo = new User();
  loading: boolean;
  chapters: string[] = [];
  selectedChapters = [];
  dropDownData = new DropDownData();
  arrayFirstLetterUpperCase = new ArrayFirstLetterUpperCase();
  userRoles: any[] = [];
  selectedRoles: string[] = [];
  dialogStatus: boolean;
  selectedValue: boolean;
  oldName: any;
  oldRoles: any;
  downicon = 'fa fa-angle-down';
  oldEmailId: any;
  isRole: boolean;
  dropDownVal: any[];
  chaptersArray: string[] = [];
  passTab: boolean;
  sortedChapter: any[];
  edit = false;
  createUser: boolean;
  useremail: string;
  userRole: string;

  /**
  *This is invoked when Angular creates a component or directive by calling new on the class.
  * @param _userService is for User Management CRUD related operations,
  * @param _notify is for Notification( success, error, warning) show or hide
  */
  constructor(private _notify: NotificationsService,
    private _userService: UserService
    , private configService : ConfigService
    , private fb: FormBuilder
    , private commonService: CommonService) {
  }

  /**
  * Invoked when given component has been initialized.
  */
  ngOnInit() {
    this.getRolesDetail();
    this.getChaptersDetail();
    this.getUsersDetail();
    this.grantedPrivileges();
  }

  showDialogToAddUser() {
    this.new_user = true;
    this.add_button = true;
    this.update_button = false;
    this.displayDialog = true;
    this.passData = true;
    this.passTab = false;
    this.myform.form.markAsPristine();
    this.myform.form.markAsUntouched();
    this.userRead = false;
    this.dialog_header = 'Add New User';
    this.clearUserInfo();
  }

  /**
  * Used to Clear UserInfo in ngModel
  */
  clearUserInfo() {
    this.userInfo = {
      id: null,
      firstName: '',
      middleName: '',
      lastName: '',
      username: '',
      password: '',
      designation: '',
      status: true,
      roles: '',
      chapters: {
        id: null,
        chapterName: '',
        description: ''
      }
    };
    this.selectedChapters = [];
  }

  // User Status Dialogue Start
  userActive(rowdata) {
      if ((rowdata.status === true)) {
        this.selectedValue = true;
      } else {
        this.selectedValue = false;
      }
      this.oldId = rowdata.id;
      this.oldName = rowdata.userName;
      this.oldRoles = rowdata.selectedRoles;
      this.oldEmailId = rowdata.emailId;
      this.updateStatus();
  }

  updateStatus() {
    if (this.selectedValue === false) {
      this.oldStatus = true;
    } else {
      this.oldStatus = false;
    }
    let userActiveObj = {};
    userActiveObj = ({
      'status': this.oldStatus
    });
    const subsribeValue = this._userService.userStatus(this.oldId, userActiveObj).subscribe(res => {
      this.responseMessage(res);
      this.getUsersDetail();
    }, error => {
      this._notify.error('', error.message);
    });
    this._subscriptions.push(subsribeValue);

  }

  // onChangeRole(event) {
  //   const tempObj = {id: null, role: ''};
  //   tempObj['id'] = event.value.id;
  //   tempObj['role'] = event.value.role;
  //   this.userInfo.roles = tempObj;
  //   }

  onChangeChapter(event) {
    this.chaptersArray = [];
    event.value.forEach(el => {
      this.chaptersArray.push(el.chapterName);
    });
  }

  /* Create and Update User Details,
  *  userInfo as user details,
  *  saveUser() is single method used to create and update user,
  *  also active/deactive the status
  *  userS is for Create new User,
  */
  saveUser() {
    let userSaveObj = {};
    userSaveObj = ({
      firstName: this.userInfo.firstName.toLocaleLowerCase(),
      middleName: this.userInfo.middleName.toLocaleLowerCase(),
      lastName: this.userInfo.lastName.toLocaleLowerCase(),
      username: this.userInfo.username.toLocaleLowerCase(),
      password: this.userInfo.password,
      // emailId: this.userInfo.emailId,
      // emailPassword: this.userInfo.emailPassword,
      status: this.userInfo.status,
      roles: this.userInfo.roles,
      chapters: this.chaptersArray
    });
    this.loading = true;
    const subsribeValue = this._userService.saveUser(userSaveObj).subscribe(res => {
      this.loading = false;
      this.responseMessage(res);
    }, error => {
      this._notify.error('', error.message);
    });
    this._subscriptions.push(subsribeValue);
  }

  /**
   * retrieve user details in dialog
   * @param rowUser user details
   */
  userEditDailogue(rowUser) {
   // if (this.userRole === 'SuperAdmin') {
      this.displayDialog = true;
  //  } else {
    //   this.displayDialog = false;
    // }
    this.clearUserInfo();
    this.dialog_header = 'Edit User';
    this.update_button = true;
    this.add_button = false;
    this.delete_button = false;
    this.passData = false;
    this.passTab = true;
    this.userInfo.id = rowUser.id;
    this.userInfo.firstName = rowUser.firstName;
    this.userInfo.middleName = rowUser.middleName;
    this.userInfo.lastName = rowUser.lastName;
    this.userInfo.username = rowUser.username;
    this.userInfo.password = rowUser.password;
    this.userInfo.username = rowUser.username;
    this.userInfo.roles = rowUser.roles;
    this.selectedChapters = [];
    this.chaptersArray = [];
    rowUser.chapters.forEach((values) => {
      this.chapters.filter((intVal) => {
        if (intVal['chapterName'] === values) {
          this.selectedChapters.push(intVal);
        }
      });
    });
    this.selectedChapters.forEach(el => {
      this.chaptersArray.push(el.chapterName);
    });
  }

  /**
   * Updating user details
   */
  updateUser() {
    let userEditObj = {};
    userEditObj = ({
      id: this.userInfo.id,
      firstName: this.userInfo.firstName.toLocaleLowerCase(),
      middleName: this.userInfo.middleName.toLocaleLowerCase(),
      lastName: this.userInfo.lastName.toLocaleLowerCase(),
      username: this.userInfo.username.toLocaleLowerCase(),
      password: this.userInfo.password,
      status: this.userInfo.status,
      roles: this.userInfo.roles.toLocaleLowerCase(),
      designation: this.userInfo.designation.toLocaleLowerCase(),
      chapters: this.chaptersArray,
    });
    this.loading = true;
    const subsribeValue = this._userService.editUser(this.userInfo.id, userEditObj).subscribe(res => {
      this.loading = false;

      this.configService.getChaptersForUser(this.useremail).subscribe((res) => {
        localStorage.setItem("chapters", JSON.stringify(res));
      })
     // this.configService.iSChaptersForUserServiceInvoked = false;
     // this.configService.getChaptersForUser(this.useremail).subscribe(()=>{});
      this.responseMessage(res);
    }, error => {
      this._notify.error('', error.message);
    });
    this._subscriptions.push(subsribeValue);

  }

  /**
  * Retrieve all Roles
  */
  getRolesDetail() {
    this._userService.getRoles().subscribe(res => {
      const resDemo = [];
      res.forEach(el => {
        if (el.role !== 'SuperAdmin') {
          resDemo.push(el);
        }
      });
      resDemo.forEach(el => {
        this.userRoles.push(el.role);
      });
      // this.userRoles = resDemo;
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
  * Retrieve all PROFESSIONAL CHAPTERS
  */
  getChaptersDetail() {
    const professionalChapter = [];
    this._userService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.type === 'PROFESSIONAL') {
          professionalChapter.push(el);
        }
      });
      res = _.orderBy(professionalChapter, ['chapterName'], ['asc']);
      this.chapterDropDown(res);
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
  * Retrieve all Users
  */
  getUsersDetail() {
    this._userService.getUsers().subscribe(res => {
      res.map(el => {
        el.chapters.sort();
      });
      this.usersDetails = res;
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
   * Retrieve assigned role of the user who login into the system
   */
  getUserRole(role) {
    this._userService.getUserRole(role).subscribe(res => {
      this.userRole = res.role.role;
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
  * Response and Error messages show
  */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this._notify.success('', responseValue.successDescription);
      this.getUsersDetail();
      this.displayDialog = false;
    } else if (responseValue.responseStatus === '500') {
      this._notify.error('', responseValue.errorDescrition);
    } else if (responseValue.status === 'OK') {
      this._notify.error('', responseValue.message);
    }
  }

  /**
   * Cancel Dialogue
   */
  cancel() {
    this.displayDialog = false;
    this.dialogStatus = false;
  }

  /**
  * Chapter Dropdown Data
  */
  chapterDropDown(data: any[]) {
    this.chapters = this.dropDownData.transform(data);
  }

  /**
  * retriving privileges for the role to create User
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.createUser = res.createUser;
      this.useremail = res.username;
      this.getUserRole(this.useremail);
    });

    // const ac = localStorage.getItem(TOKEN_NAME);
    // const decodedToken = this.jwtHelper.decodeToken(ac);
    // this.useremail = decodedToken.user_name;
    // this.createUser = decodedToken.authorities.some(el => el === 'Allow User Creation');
    // this.getUserRole(this.useremail);
  }

  /**
  * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
  * Use for any custom cleanup that needs to occur when the instance is destroyed.
  */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    for (const subs of this._subscriptions) {
      subs.unsubscribe(); // used to unsubscribe all subscribed services
    }
  }

}
