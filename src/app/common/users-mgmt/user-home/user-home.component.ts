import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../../auth/services/auth.constant';
import { UserService } from '../service/users.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'em-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
jwtHelper: JwtHelperService = new JwtHelperService();
_metrics = 'user';
buttonUser = '#FFA500';
buttonRole = '#636363';
useremail: string;
userRole: string;
roleButton: boolean;
  allowUser: any;
  setUpRoles: any;

constructor(private router: Router
  , private activeRoute: ActivatedRoute
  , private userService: UserService
  , private notify: NotificationsService) {
  this.router.navigate(['./user'], { relativeTo: this.activeRoute });
}

ngOnInit() {
  this.grantedPrivileges();
}

showMetrics(metricsType: string) {
  this._metrics = metricsType;
}

userActive() {
  this.buttonUser = '#FFA500';
  this.buttonRole = '#636363';
}
roleActive() {
  this.buttonUser = '#636363';
  this.buttonRole = '#FFA500';
}

  /**
   * Retrieve assigned role of the user who login into the system
   */
  getUserRole (role) {
    this.userService.getUserRole(role).subscribe(res => {
     this.userRole =  res.role.role;
     this.rolePrivileges();
    }, error => {
      this.notify.error('', error.message);
    });
  }

  rolePrivileges() {
    if (this.userRole === 'SuperAdmin') {
      this.roleButton = true;
    } else {
      this.roleButton = false;
    }
  }

   /**
   * retriving privileges for the role to create User
   */
  grantedPrivileges() {
    const ac = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(ac);
    this.useremail = decodedToken.user_name;
    //this.createUser = decodedToken.authorities.some(el => el === 'Allow User Creation');
    this.setUpRoles = decodedToken.authorities.some(el => el === 'Set up Roles and Privileges');
    this.getUserRole(this.useremail);
  }
}


