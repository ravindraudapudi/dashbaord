import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NationalService } from '../../national/services/national-service';
import { CommonService } from '../../utils/services/common.service';
import { ConfigService } from '../../configs/services/config.service';
import * as html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { ImageExportService } from 'src/app/common/services/image-export.service';

@Component({
  selector: 'em-social',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
  loading: boolean;
  selectedCode: string;
  selectedChapter: string;
  socialMediaConfig: any;
  socialMedia: any[] = [];
  socialMediaList = ['Distribution List of Professional Group',
    'Facebook Page Likes', 'LinkedIn Page Followers', 'LinkedIn Group Members',
    'Instagram Followers', 'Twitter Followers'];

  export: boolean;
  distrubutionConfig: { title: string; heading: any; height: number; };
  constructor(private configService: ConfigService,
    private imageExportService: ImageExportService,
    private activatedRoute: ActivatedRoute,
    private nationalService: NationalService,
    private commonService: CommonService) {
    this.activatedRoute.params.subscribe(params =>{
      if(params['selectedCode']){
    this.dropDownValue(params['selectedCode'])
      }
    });
    this.commonService.getChapterFromDropdown().subscribe(res => {
      if(res) {
      this.dropDownValue(res);
      }
    });
  }

  ngOnInit() {
    this.grantedPrivileges();
    this.getConfigureChart(this.selectedChapter);
    this.getChartSocialMedia(this.selectedCode);
  }

  dropDownValue(val) {
    // this.commonService.setChapterCode(val);
    this.selectedCode = val;
    // console.log("selected",this.selectedCode)
    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterCode(el.primaryGroupCode);
          // console.log("prm",el.primaryGroupCode)
          this.commonService.setChapterName(this.selectedChapter);
          this.getConfigureChart(el.chapterName);

        }
      });
    });
    this.getChartSocialMedia(this.selectedCode);
  }


  /**
 * Retriving monthly membership revenue
 * Assigning retrived value to Line chart
 * @param code primary group code of selected chapter
 */
  getChartSocialMedia(code) {
    const socialMediaTempArr = [];
    let transformSocialMediaArr = [];
    if (code) {
      this.loading = true;
      this.nationalService.getSocialMediaDetails(code).subscribe(res => {
        res.forEach((el, index) => {
          transformSocialMediaArr = [];
          this.socialMediaList.forEach((socialMediakey) => {
            if (el.key === socialMediakey) {
              transformSocialMediaArr.push(el);
              socialMediaTempArr[el.key] = transformSocialMediaArr;
            }
          });
        });
        this.socialMedia = socialMediaTempArr;
        this.loading = false;
      }, error => {
        console.log(error);
      });

    }
  }

  /**
     * Configuring  Chart headers dynamically
     * @param chapterName Name of the chapter
     */
  getConfigureChart(chapterName) {
    this.socialMediaConfig = {
      title: '',
      heading: chapterName,
      height: 250,
    };

    this.distrubutionConfig = {
      title: '',
      heading: chapterName,
      height: 250,
    };
  }


  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
    });
  }

  /**
 * export chart as .png
 */
  downloadChart(value, filename) {
  
    let name = '';
    this.selectedChapter.split(' ').forEach((myObject) => {
      name = name + ' ' + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    })
    name = name + ' ' + filename;
    this.loading = true;
    this.imageExportService.exportImageData(value, name , (cb) => {
      this.loading = false;
    })
  }
}
