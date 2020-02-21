import { Component, OnInit, ViewChild, ElementRef, ModuleWithComponentFactories } from '@angular/core';
import {
  DROPDOWNCSV, distrubutionColumns, transactionColumns,
  sponsorshipColumns, socialMediaColumns, profitAndLoss
} from 'src/app/utils/mockmodel/mock.model';
import { UploadService } from './services/upload-csv-service';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../common/auth/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { element } from '@angular/core/src/render3/instructions';
import { ConfigService } from 'src/app/configs/services/config.service';
 import * as XLSX from 'xlsx';

@Component({
  selector: 'em-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})

export class UploadsComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  membershipIncome: number;
  registrationEvent: number;
  programRevenue: number;
  contributionRevenue: number;
  kindDonations: number;
  fiscalYear: string;
  totalRevenue: number;
  lifeTimeMembership: number;
  donationService: number;
  chooseFile = false;
  selectedCategory = false;
  isFileValidated = [];
  dropDownData: any[];
  dropDownChaptersData = [];
  dropDownfiscalYearssData = [];
  headersFromJson: any[];
  JSONData: any;
  text: any;
  enableCalendar = false;
  fileName: any;
  result = [];
  dateValue: any;
  uploadError: string;
  loading: boolean;
  chapterName: any;
  selectedValue = '';
  selectedChapterCode: string;
  selectedData: string;
  dropDownArray: any[];
  mandatoryElements: any[];
  selectedFileName: any;
  uploadClicked: boolean;
  lastUploadedDate: string;
  reportingDate: string;
  revenueTerm: any;
  uploadPLFlag: boolean;
  dataString: any;
  uploadMessage: any;
  errorFlag: boolean;

  constructor(private uploadService: UploadService,
    private _notify: NotificationsService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe,
    private configService: ConfigService

  ) {
  }

  ngOnInit() {
    this.dropDownData = DROPDOWNCSV;
    this.getReportedDate();
  }
  /*
  *Validating CSV file type and minimum size
  */
  validateFile(event: any) {
    this.fileName = '';
    if (event.target.files[0].size <= 1 * 1) {
      this.uploadError = '';
      this.uploadError = 'File size should be more than 1MB';
    } else {
      this.uploadError = '';
      this.fileName = event.target.files[0].name;
      const res = this.fileName.split('.')[1];
      const app = '.';
      const ftype = app.concat(res);
      switch (ftype) {
        case '.csv':
        case 'application/vnd.ms-excel':
          this.chooseFile = true;
          break;
        default: this.chooseFile = false;
          break;
      }
    }
  }

  /**
   * reading csv data
   * @param input CSV data
   */
  readingCSV(input) {
    if (this.selectedValue !== 'PL') {
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        this.text = reader.result;
        this.chooseFile = true;
      };
    }
  }

  /**
   * category selection for csv
   */
  dropemitvalue() {
    this.dropDownArray = [];
    this.uploadPLFlag = false;
    this.dropDownData.forEach(el => {
      this.dropDownArray.push(el.name, el.code);
      if (this.selectedValue === el.name) {
        this.selectedData = el.code;
        this.selectedCategory = true;
        this.selectedFileName = el.name;
        if (this.selectedData === "MD") {
          this.mandatoryElements = distrubutionColumns;
        } else if (this.selectedData === "SM") {
          this.mandatoryElements = socialMediaColumns;
        } else if (this.selectedData === "TL") {
          this.mandatoryElements = transactionColumns;
        } else if (this.selectedData === "SL") {
          this.mandatoryElements = sponsorshipColumns;
        } else if (this.selectedData === "PL") {
          this.initilizeChapters();
          this.uploadPLFlag = true;
          this.mandatoryElements = profitAndLoss;
        }
      }
    });

    if (this.selectedData == 'TL' || this.selectedData == 'MD') {
      this.enableCalendar = true;
    } else {
      this.enableCalendar = false;
    }
  }

  /**
  * To clear dropDown and fileInput
  */
  cancel() {
    // this.dropDown = Math.random();
    this.selectedValue = '';
    this.selectedData = '';
    this.fileName = '';
    this.input.nativeElement.value = '';
    this.chooseFile = false;
    this.selectedCategory = false;
    this.uploadClicked = false;
  }

  /**
   * Converting CSV to JSON
   * Uploading JSON file content, filename, type, uploaded by
   */
  uploadCSV() {
    this.uploadClicked = true;
    this.input.nativeElement.value = '';
    if (this.selectedCategory === this.chooseFile) {
      this.selectedCategory = false;
      this.result = [];
      const lines = this.text.replace(/(\r\n|\n|\r)/gm, '\n').split('\n');
      const headers = lines[0].split(',');
      this.headersFromJson = headers;
      this.isFileValidated = [];

      if (this.selectedData !== 'PL') {
        this.isFileValidated = this.validateCsvFile(this.headersFromJson, this.selectedData);
      }

      if (this.isFileValidated.length === 0) {

        if (this.selectedData === 'PL') {
          this.uploadProfitAndLosss();
        } else {
          for (let i = 1; i <= lines.length - 1; i++) {
            const obj = {};
            obj['id'] = i;
            const currentline = lines[i].split(',');
            for (let j = 0; j <= headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            this.result.push(obj);
          }
        }
        let dateTemp = null;
        if (this.selectedData === 'MD' || this.selectedData === 'TL') {
          dateTemp = `${this.dateValue.getMonth() + 1}/${this.dateValue.getDate()}/${this.dateValue.getFullYear()}`;
        }

        const uplaodObj = {
          'type': this.selectedData,
          'fileName': this.fileName,
          'content': this.result,
          'uploadedBy': this.authService.userName(),
          'reportedDate': dateTemp
        };

        let envApi: string;

        switch (uplaodObj.type) {
          case 'MD': envApi = environment.apiProcessMembers;
            break;
          case 'TL': envApi = environment.apiProcessTransaction;
            break;
          case 'SL': envApi = environment.apiProcessSponsers;
            break;
          case 'SM': envApi = environment.apiProcessSocialMedia;
            break;
        }
        this.uploadClicked = false;
        this.loading = true;
        this.uploadService.uploadCsv(uplaodObj, envApi).subscribe(res => {
          this.getReportedDate();
          this.loading = false;
          this.fileName = '';
          this.selectedValue = '';
          this.chooseFile = false;
          this.selectedCategory = false;
          this.responseMessage(res);
          this.result = [];
        }, error => {
          this.loading = false;
          // this._notify.error('', error.message);
        });
      } else {
        this._notify.error('Please add the below columns to upload', this.selectedFileName);
        this.fileName = '';
        this.selectedValue = '';
        this.chooseFile = false;
        this.selectedCategory = false;
      }
    } else {
      this._notify.error('CSV file is not valid');
    }
  }



  /**
   *  Uploading the P&L data.
   */
  uploadProfitAndLosss(): any {

    this.membershipIncome = 0;
    this.registrationEvent = 0;
    this.programRevenue = 0;
    this.contributionRevenue = 0;
    this.totalRevenue = 0;
    this.contributionRevenue = 0;
    this.totalRevenue = 0;
    this.kindDonations = 0;
    this.lifeTimeMembership = 0;

    if (this.dataString) {
      this.dataString.forEach(element => {

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('4210014')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.membershipIncome = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('4210015')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.registrationEvent = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('4220011')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.programRevenue = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('4010010')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.contributionRevenue = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('4210011')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.lifeTimeMembership = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('4030011')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.kindDonations = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }

        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('October')) {
          if (element[Object.keys(element)[0]]) {
            this.revenueTerm = element[Object.keys(element)[0]];
          }
        }


        if (element[Object.keys(element)[0]] && element[Object.keys(element)[0]].includes('Total Income')) {
          const tempKey = Object.keys(element)[1];
          if (tempKey) {
            this.totalRevenue = +(element[tempKey].toString().replace(/\$/g, '').trim());
          }
        }
      }
      );
    }

    const payload = {
      'revenueTerm': this.revenueTerm,
      'chapterName': this.chapterName,
      'registrationEvent': this.registrationEvent,
      'programRevenue': this.programRevenue,
      'membershipIncome': this.membershipIncome,
      'contributionRevenue': this.contributionRevenue,
      'fiscalYear': this.fiscalYear,
      'totalRevenue': this.totalRevenue,
      'lifeTimeMembership': this.lifeTimeMembership,
      'kindDonations': this.kindDonations
    };

    const uplaodObj = {
      'type': this.selectedData,
      'fileName': this.fileName,
      'content': payload,
      'uploadedBy': this.authService.userName()
    };
    this.uploadService.uploadCsv(uplaodObj, environment.apiProcessProfitAndLoss).subscribe(res => {
      this.loading = false;
      this.fileName = '';
      this.selectedValue = '';
      this.chooseFile = false;
      this.selectedCategory = false;
      this.uploadService.getReportedDate().subscribe(res => { });
      this.responseMessage(res);
      this.result = [];
    }, error => {
      this.loading = false;
    });
  }


  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        if (name.trim() == 'Profit and Loss') {
          const sheet = workBook.Sheets[name];
          initial = XLSX.utils.sheet_to_json(sheet);
        }
        return initial;
      }, {});
      this.dataString = jsonData;
    };
    reader.readAsBinaryString(file);
  }


  /**
   *  Validating CSV file with each column
   * @param headersFromJson
   * @param selectedData
   */
  validateCsvFile(headersFromJson: any[], selectedData: string): any {
    let requiredCols = [];
    if (selectedData === 'MD') {
      for (const element of distrubutionColumns) {
        if (!headersFromJson.includes(element)) {
          requiredCols.push(element);
        }
      }
      return requiredCols;
    }

    if (selectedData === 'TL') {
      let requiredCols = [];

      for (const element of transactionColumns) {
        if (!headersFromJson.includes(element)) {
          requiredCols.push(element);
        }
      }
      return requiredCols;
    }

    if (selectedData === 'SL') {
      let requiredCols = [];
      for (const element of sponsorshipColumns) {
        if (!headersFromJson.includes(element)) {
          requiredCols.push(element);
        }
      }
      return requiredCols;
    }

    if (selectedData === 'PL') {
      let requiredCols = [];
      return requiredCols;
    }

    if (selectedData === 'SM') {
      let requiredCols = [];
      for (const element of socialMediaColumns) {
        if (!headersFromJson.includes(element)) {
          requiredCols.push(element);
        }
      }
      return requiredCols;
    }
  }

  /**
  * To get the uploaded file history
  */
  getReportedDate() {
    this.uploadService.getReportedDate().subscribe(res => {
      this.lastUploadedDate = this.datePipe.transform(res.uploadedOn, 'M/d/yyyy');
      this.reportingDate = this.datePipe.transform(res.reportingDate, 'M/d/yyyy');
    }, error => {
      this._notify.error('', error.message);
    });
  }

  /**
   * To display the response message
   * @param res service response
   */
  responseMessage(res) {
    this.loading = false;
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.uploadMessage  = responseValue.successDescription;
      this.errorFlag = false;
      this._notify.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this.uploadMessage  = responseValue.errorDescrition;
      this.errorFlag = true;
      this._notify.error('', responseValue.errorDescrition);
    } else if (responseValue.responseStatus === '400') {
      this.uploadMessage  = responseValue.errorDescrition;
      this.errorFlag = true;
      responseValue.errors.forEach(element => {
        this._notify.error('', element);
      });
    }
  }

  retrivechapter(chapterSelection) {
    this.chapterName = chapterSelection;
  }

  retriveFiscalYear(fiscalYear) {
    this.fiscalYear = fiscalYear;
  }


  initilizeChapters() {

    this.dropDownChaptersData = [];
    this.configService.getChapters().subscribe(res => {
      this.dropDownfiscalYearssData = [];
      res[0].fyData.forEach(element => {
        this.dropDownfiscalYearssData.push(element.fiscalYear);
      });
      res.forEach(element => {
        if (element.type === 'PROFESSIONAL') {
          this.dropDownChaptersData.push(element);
        }
      });
    });
  }
}


