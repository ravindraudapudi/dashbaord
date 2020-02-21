import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { UserService } from '../service/users.service';

@Component({
  selector: 'em-roleprivilege',
  templateUrl: './roleprivilege.component.html',
  styleUrls: ['./roleprivilege.component.css']
})
export class RoleprivilegeComponent implements OnInit {
  addRoleForm: FormGroup;
  addPrivilegeForm: FormGroup;
  @ViewChild('privilegesForm') privilegesForm: NgForm;
  role = '';
  roleAlert = 'Role name is Required';
  private _subscriptions: Array<Subscription> = [];
  selectedRole: string;
  selectedPrivilages: string[] = [];
  roles: any;
  privileges: any[];
  loading = false;
  enableUpdate = true;
  selRole: string;
  updatedRoleId: any;
  selectedView: string;
  flag: boolean;

  constructor(private _userService: UserService
    , private _notify: NotificationsService
    , private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getRole();
    this.getPrivilege();
  }

  /**
   * adding a new role to roles list
   * @param request role
   */
  addRole(request) {
    if(request) {
      const subsribeValue = this._userService.saveRole(request).subscribe(res => {
        this.responseMessage(res);
        this.getRole();
        // this.addRoleForm.reset();
      }, error => {
        this._notify.error('', error.message);
      });
      this._subscriptions.push(subsribeValue);
    }
  }


  /**
  * Updating a role to roles list
  * @param request role
  */
  updateRole(selRole) {
    const subsribeValue = this._userService.updateRole(this.selRole, this.updatedRoleId.id).subscribe(res => {
      this.responseMessage(res);
      this.getRole();
      // this.addRoleForm.reset();
    }, error => {
      this._notify.error('', error.message);
    });
    this._subscriptions.push(subsribeValue);
  }

  /**
  * Retrieving the roles list
  */
  getRole() {
    // this.enableUpdate = false;
    this._userService.getRole().subscribe(res => {
      this.roles = [];
      res.forEach(el => {
        if (el.role !== 'SuperAdmin') {
          this.roles.push(el);
        }
      });
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
  * Retrieving the Privilege list of selected Role
  */
  getPrevilagesForRole(role) {
    this.flag = true;
    this.enableUpdate = false;
    this.updatedRoleId = role;
    this.selRole = role.role;
    this.selectedPrivilages = [];
    this._userService.getPrivilegeForRole(role.role).subscribe(res => {
      res.forEach(el => {
        if (el.privilege.includes('National View')) {
          this.selectedView = 'National';
        } else if (el.privilege.includes('Chapter View')) {
          this.selectedView = 'Chapter';
        }
        this.selectedPrivilages.push(el.privilege);
      });
      this.getPrivilege();
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
   * Retieving a privilege list
   */
  getPrivilege() {
    this.privileges = [];
    this._userService.getPrivilege().subscribe(res => {
      if (this.selectedView === 'Chapter') {
        const chapterArr = res.filter(el => el.isNational === 'CHAPTER');
        chapterArr.filter(el => {
          if (el.privilege !== 'Chapter View' && el.privilege !== 'Visualise') {
            this.privileges.push(el.privilege);
          }
        });
      } else if (this.selectedView === 'National') {
        const nationalArr = res;
        nationalArr.filter(el => {
          if (el.privilege !== 'National View' && el.privilege !== 'Chapter View' && el.privilege !== 'Visualise') {
            this.privileges.push(el.privilege);
          }
        });
      }
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
  * loading the selected privileges of Roles
  * @param id checked element in privileged list
  */
  selectedPrivilegeList(id) {
    const selected = this.selectedPrivilages.slice();
    const index = selected.indexOf(id);
    if (index === -1) {
      selected.push(id);
    } else {
      selected.splice(index, 1);
    }
    this.selectedPrivilages = selected;
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

  /**
  * update the privileges list of selected Role
  */

  submitForm() {
    this.loading = true;
    // Based on isNational toggle selection assigning National View/Chapter View
    if (this.selectedView === 'National') {
      if (!this.selectedPrivilages.includes('National View')) {
        this.selectedPrivilages.push('National View');
      }
      for (let i = 0; i < this.selectedPrivilages.length - 1; i++) {
        if (this.selectedPrivilages[i] === 'Chapter View') {
          this.selectedPrivilages.splice(i, 1);
        }
      }
    } else {
      if (!this.selectedPrivilages.includes('Chapter View')) {
        this.selectedPrivilages.push('Chapter View');
      }
      for (let i = 0; i < this.selectedPrivilages.length - 1; i++) {
        if (this.selectedPrivilages[i] === 'National View') {
          this.selectedPrivilages.splice(i, 1);
        }
      }
    }
    const tempSelectedRole = this.selectedRole;
    this._userService.updatePrevilage(tempSelectedRole, this.selectedView, this.selectedPrivilages).subscribe(res => {
      this.loading = false;
      this.responseMessage(res);
      this.getRole();
    }, error => {
      this._notify.error('', error.message);
    });
  }
}

