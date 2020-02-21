import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { TOKEN_NAME } from '../services/auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ConfigService } from '../../../configs/services/config.service';

@Component({
  selector: 'em-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();

  resetPasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  confirmPassword: FormControl;
  mismatch: boolean;
  error = '';
  oldPasswordAlert = ' ';
  newPasswordAlert = ' ';
  confirmPasswordAlert = ' ';
  // passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[$!@#&])[A-Za-z0-9\d$!@#&]{8,14}';
  // passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[$!@#&])[A-Za-z0-9\d$!@#&]{8,}';
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*-]).{8,}$';
  noSpace: RegExp = /^\S*$/;
  loading: boolean;
  nationalView: any;
  defaultChapter: any;


  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationsService,
    private configService: ConfigService,
    private fb: FormBuilder,
  ) {
    this.resetPassword();
  }

  ngOnInit() {
  }

  resetPassword() {
    //  this.resetPasswordForm = this.fb.group({
    this.oldPassword = this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(8),
    Validators.maxLength(14), Validators.pattern(this.passwordPattern)]));

    this.newPassword = this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(8),
    Validators.maxLength(14), Validators.pattern(this.passwordPattern)]));

    this.confirmPassword = this.fb.control(null, Validators.compose([Validators.required]));

    this.resetPasswordForm = new FormGroup({
      'oldPassword': this.oldPassword,
      'newPassword': this.newPassword,
      'confirmPassword': this.confirmPassword

    });

    this.oldPassword.valueChanges.subscribe(
      value => {
        if (this.oldPassword.hasError('required')) {
          this.oldPasswordAlert = 'Password is mandatory';
        } else if (this.oldPassword.hasError('minLength')) {
          this.oldPasswordAlert = 'Too short';
        } else if (this.oldPassword.hasError('pattern')) {
          this.oldPasswordAlert = 'Invalid password';
        } else {
          this.oldPasswordAlert = '';
        }
      }
    );
    this.newPassword.valueChanges.subscribe(
      value => {
        if (this.newPassword.hasError('required')) {
          this.newPasswordAlert = 'Password is mandatory';
        } else if (this.newPassword.hasError('minLength')) {
          this.newPasswordAlert = 'Too short';
        } else if (this.newPassword.hasError('pattern')) {
          this.newPasswordAlert = 'Invalid password';
        } else {
          this.newPasswordAlert = ' ';
        }
      }
    );
    this.confirmPassword.valueChanges.subscribe(
      value => {
        if (this.confirmPassword.hasError('required')) {
          this.confirmPasswordAlert = 'Password is mandatory';
        } else if (this.confirmPassword.hasError('mismatch')) {
          this.confirmPasswordAlert = 'Password mismatch';
        } else {
          this.oldPasswordAlert = ' ';
        }
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value === g.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  reset(data) {
    this.loading = true;
    if (data.newPassword === data.confirmPassword) {
      this.authService.resetPassword(data).subscribe(
        result => {
          this.loading = false;
          this.responseMessage(result);
        },
        error_msg => {
        }
      );
    } else {
      this.loading = false;
      // this.mismatch = true ;
      this.notification.error('Your password and confirmation password do not match');
    }
  }

  loginBack() {
    const code = [];
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    const username = decodedToken.user_name;
    this.configService.getChaptersForUser(username).subscribe(res => {
      this.nationalView = decodedToken.authorities.includes('National View');
      let homeUri = '';
      if (this.nationalView) {
        homeUri = 'national/dashboard';
      } else {
        res.forEach(el => {
          code.push(el.primaryGroupCode);
          this.defaultChapter = code[0];
          homeUri = '/chapters/overview/' + this.defaultChapter;
        });
      }
      this.router.navigateByUrl(homeUri);
    });
  }

  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.notification
        .success('', 'Your password has been reset and sent to your primary email address successfully.');
      this.authService.logout();
      this.router.navigateByUrl('login');
    } else {
      this.notification.error('', 'Invalid Current Password');
      this.resetPasswordForm.reset();
      // this.resetPasswordForm.clearValidators();
      // this.resetPasswordForm.markAsPristine();
      // this.resetPasswordForm.markAsPristine();
    }
  }
}
