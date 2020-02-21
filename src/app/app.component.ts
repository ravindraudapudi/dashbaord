import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common/auth/services/auth.service';
import { CommonService } from './utils/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  email: any;
  private wasInside = false;

  public options = {
    position: ['top', 'right'],
    lastOnBottom: true,
    animate: 'fromRight',
    timeOut: 2000,
    showProgressBar: true,
    clickToClose: false
  };

  /**
   * HostListener for autologout
   */
  @HostListener('click')
  clickInside() {
    this.commonlog();
    this.wasInside = true;
  }
  /**
   * HostListener for autologout
   */
  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.commonlog();
    }
    this.wasInside = false;
  }
  constructor(
    private authService: AuthService
    , private commonService: CommonService
    , private router: Router) {
  }

  get hasSignedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get userName(): string {
    return this.authService.username;
  }

  ngOnInit() {
    this.commonService.getUsername().subscribe(mail => {
      if (mail) {
        this.email = mail;
      } else {
        this.email = this.authService.userName();
      }
    });
    this.commonlog();
  }

  logout() {
    if (this.authService.logout()) {
      this.router.navigateByUrl('login');
    }
  }

  resetPassword() {
    this.router.navigateByUrl('reset');
  }

  commonlog() {
    if (this.authService.autoLogout() === true) {
      this.router.navigate(['/']);
    }
  }
}
