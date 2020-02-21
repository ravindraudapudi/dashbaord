import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { TOKEN_NAME } from '../services/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CommonService } from '../../../utils/services/common.service';
import { ConfigService } from '../../../configs/services/config.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'em-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  passwordForm: FormGroup;
  username: FormControl;
  password: FormControl;
  jwtHelper: JwtHelperService = new JwtHelperService();
  defaultChapter: any;
  loading = false;
  error = '';
  forgotdisplay: boolean;
  logindisplay = true;
  usernameAlert = ' ';
  passwordAlert = ' ';
  showDropDown = true;
 emailPattern = "^[a-zA-Z0-9.!#$%&amp;'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,63})*$";
   passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  noSpace: RegExp = /^\S*$/;
  recoverForm: FormGroup;
  nationalView: any;
  serviceError: string;
  enableForm: boolean = false;
  routingUrl: string;
  viewOverview: any;
  viewTotalrevenue: any;
  viewOpportunity: any;
  viewSponsor: any;
  viewBoardMember: any;
  viewRevenue: any;
  viewSocialMedia: any;
  viewDetailMetrics: any;
  setSponsor: any;
  viewMemberships: any;
  sponsor: any;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notification: NotificationsService,
    private configService: ConfigService,
    private fb: FormBuilder,
    private commonService: CommonService) {
  }

  ngOnInit() {
    this.checkSessionStatus();
  }


  checkSessionStatus(): any {
    if (this.authService.isAuthenticated()) {
      this.navigateAfterSuccess();
    } else {
      this.intiForm();
    }
  }

  intiForm() {
    this.enableForm = true;
    this.password = this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(8),
    Validators.maxLength(14), Validators.pattern(this.passwordPattern)]));
    this.username = this.fb.control(null, Validators.compose([Validators.required, Validators.email, Validators.minLength(8)
    ,Validators.pattern(this.emailPattern)]));
    this.signInForm = new FormGroup({
      'username': this.username,
      'password': this.password
    });

    this.recoverForm = new FormGroup({
      'username': this.username
    });

    this.username.valueChanges.subscribe(
      value => {
        if (this.username.hasError('required')) {
          this.usernameAlert = 'User email id mandatory';
        } else if (this.username.hasError('email')) {
          this.usernameAlert = 'Please enter valid email id';
        } else if (this.username.hasError('pattern')) {
          this.usernameAlert = 'Please enter valid email id';
        } else if (this.username.hasError('minlength && pattern')) {
          this.usernameAlert = 'Email id too short';
        } else {
          this.usernameAlert = ' ';
        }
      }
    );

    this.password.valueChanges.subscribe(
      value => {
        if (this.password.hasError('required')) {
          this.passwordAlert = 'Password is mandatory';
        } else if (this.password.hasError('minLength')) {
          this.passwordAlert = 'Too short';
        } else if (this.password.hasError('pattern')) {
          this.passwordAlert = 'Invalid password';
        } else {
          this.passwordAlert = ' ';
        }
      }
    );
  }


  /**
   * Calling the login function on Keyup.Enter event
   * @param data Sign in form data(Username and Password)
   */
  submitOnEnter(data) {
  }

  /**
   * Login function
   * @param data Sign in form data(Username and Password)
   */
  login(data) {
    let userObj = {};
    userObj = ({
      'username': data.username,
      'password': data.password
    });
    this.authService.validateCredentials(userObj).subscribe(res => {
      const responseValue = JSON.parse(JSON.stringify(res));
      if (responseValue.responseStatus === '500') {
        this.notification.error(responseValue.errorDescrition);
      } else {
        this.loading = true;
        this.authService.login(data.username, data.password).subscribe(
          result => {
            this.loading = false;
            this. grantedPrivileges();
            this.configService.getChaptersForUser(data.username).subscribe((res) => {
              localStorage.setItem('chapters', JSON.stringify(res));
            });
            this.commonService.setUsername(data.username);
            this.navigateAfterSuccess();
          }, error => {
            this.loading = false;
            this.notification.error('User access is denied');
          });
      }
    });
  }

  /**
   * To send a forgot password request mail
   * @param data email id
   */
  recoverPwd(data) {
    this.loading = true;
    this.authService.recoverPassword(data.username).subscribe(res => {
      this.loading = false;
      this.responseMessage(res);
    });
  }

  /**
   * navigate to home page based on National/Chapter
   * after successful Login
   */
  private navigateAfterSuccess() {
    const code = [];
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    const username = decodedToken.user_name;
    this.configService.getChaptersForUser(username).subscribe(res => {
      this.nationalView = _.includes(decodedToken.authorities, 'National View');
      let homeUri = '';
      if (this.nationalView) {
        homeUri = 'national/dashboard';
      } else {
        res = _.orderBy(res, ['chapterName'], ['asc']);
        homeUri = '/chapters/' + this.routingUrl + '/' + res[0].primaryGroupCode;
      }
      this.router.navigateByUrl(homeUri);
    });
  }

  /**
   * enabling the send button in forgot password page
   */
  forgotPassword() {
    this.forgotdisplay = true;
    this.logindisplay = false;
  }

  /**
   * Navigating to login, if user clicks on cancel button in forgot password page
   */
  loginback() {
    this.forgotdisplay = false;
    this.logindisplay = true;
  }

  /**
   * Toast message to display Notification
   * @param res Success or Error
   */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.loginback();
      this.notification.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this.notification.error('', responseValue.errorDescrition);
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
        this.routingUrl = 'overview';
      } else if (this.viewMemberships) {
        this.routingUrl = 'membership';
      } else if (this.viewDetailMetrics) {
        this.routingUrl = 'metrics';
      } else if (this.viewRevenue) {
        this.routingUrl = 'revenue';
        this.showDropDown = false;
      } else if (this.viewBoardMember) {
        this.routingUrl = 'boardMembers';
        this.showDropDown = false;
      } else if (this.viewSocialMedia) {
        this.routingUrl = 'social';
        this.showDropDown = false;
      } else if (this.viewSponsor) {
        this.routingUrl = 'sponsorship';
        this.showDropDown = false;
      } else if (this.viewOpportunity) {
        this.routingUrl = 'pipeline';
        this.showDropDown = false;
      }
    });
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    this.username = decodedToken.user_name;
    this.sponsor = decodedToken.authorities.some(el => el === 'View Sponsors') ||
      decodedToken.authorities.some(el => el === 'Manage Sponsors');
  }

}
