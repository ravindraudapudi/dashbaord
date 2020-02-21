import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from 'src/app/utils/services/common.service';

@Component({
  selector: 'em-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})
export class ConfigHomeComponent implements OnInit {
  setUpPipeline: any;
  [x: string]: any;

  enableUserModule: boolean = false;
  accessOpportunity: any;
  createChapter: any;
  setFy: any;
  setGoal: any;
  createUser: any;

  constructor(private router: Router,
    private commonService: CommonService
    , private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.grantedPrivileges();

  }

  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.accessOpportunity = res.viewOpportunities || res.manageOpportunities;
      this.createChapter = res.createChapter;
      this.setFy = res.setFy;
      this.setGoal = res.setGoal;
      this.createUser = res.createUser;
      this.setUpPipeline = res.setUpPipeline;
    });

    if (this.createChapter) {
      this.router.navigate(['./chapters'], { relativeTo: this.activeRoute });
    } else if (this.setFy) {
      this.router.navigate(['./fydata'], { relativeTo: this.activeRoute });
    } else if (this.setGoal) {
      this.router.navigate(['./goals'], { relativeTo: this.activeRoute });
    } else if (this.createUser) {
      this.router.navigate(['./usermanagement/user'], { relativeTo: this.activeRoute });
    }  else if (this.setUpPipeline) {
      this.router.navigate(['./pipeline'], { relativeTo: this.activeRoute });
    }
  }
}
