import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MembersDataSnapshot } from 'src/app/utils/pipes/trasformations.pipes';
import { CommonService } from 'src/app/utils/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { NationalService } from '../services/national-service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from 'src/app/configs/services/config.service';
import * as _ from 'lodash';

@Component({
  selector: 'em-national-sponsorship',
  templateUrl: './national-sponsorship.component.html',
  styleUrls: ['./national-sponsorship.component.css']
})
export class NationalSponsorshipComponent implements OnInit {

  @ViewChild('sponsorForm') sponsorForm;
  selectedChapter = 'ALL';
  chapterCodeHead: any;
  membersDataSnapshot = new MembersDataSnapshot();
  primaryGroupCode: any;
  dialog_heading = 'Contract Terms';
  selectedCode: any;
  sponsorshipData: any;
  filteredsponsorshipData: any;
  redeemedMembers = false;
  export: boolean;
  terms: boolean;
  redeemedMembership: any;
  reedemedTitle: any;
  termData: any;
  termPlus: string;
  loading = false;
  uniqueParteshipYear = [];
  uniqueChapters = [];
  defaultParteshipYear = { label: 'ALL', value: 'ALL' };
  termsOf = '';
  selectedValue = 'ALL';
  calculatedSponsor: any;
  confirmHead: string;
  displayDialog: boolean;
  dialogeHead: string;
  updateButton: boolean;
  addButton: boolean;
  numberExp: RegExp = /^[\d\(\)\-\.+]+$/;
  editSponsers: false;
  updateSponsor: false;
  invoiceDate = '';
  aggrementEndDate = '';
  expirationDate = '';
  paymentDate = '';
  errorMessage: String = '';
  userName: any;
  membershipCodes: any;
  pcTermsLengthError =  '' ;
  enable: boolean;
  model: any = {};

  constructor(private commonService: CommonService
    , private activatedRoute: ActivatedRoute
    , private nationalService: NationalService,
    private _notify: NotificationsService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.redeemedMembers = false;
    this.grantedPrivileges();
    this.getAllSponsors();
  }

  addSponsor() {
    this.model = {};
    this.errorMessage = '';
    this.addButton = true;
    this.updateButton = false;
    this.displayDialog = true;
    this.dialogeHead = 'Add Sponsor';
    this.sponsorForm.form.reset();
  }



  editSponsor(data) {
    this.model = {};
    this.errorMessage = '';
    this.addButton = false;
    this.updateButton = true;
    this.displayDialog = true;
    this.dialogeHead = 'Edit Sponsor';
    // this.updateButton = true;
    this.model = { ...data };

    if (data.invoiceDate) {
      this.model.invoiceDate = new Date(data.invoiceDate);
    } else {
      this.model.invoiceDate = data.invoiceDate;
    }

    if (data.aggrementEndDate) {
      this.model.aggrementEndDate = new Date(data.aggrementEndDate);
    } else {
      this.model.aggrementEndDate = data.aggrementEndDate;
    }

    if (data.expirationDate) {
      this.model.expirationDate = new Date(data.expirationDate);
    } else {
      this.model.expirationDate = data.expirationDate;
    }
  }

  /**
   *
   * @param data Save sponsor Service call
   */
  saveSponsor(data) {
    this.nationalService.saveSponsor(this.capitalizeValues(data)).subscribe((res) => {
        if (res["responseStatus"] == 200) {
          let tempData = this.filteredsponsorshipData.slice();
          console.log(res["sponsershipReport"]);
          tempData.push(res["sponsershipReport"]);
          this.filteredsponsorshipData = tempData;
        }
        this.responseMessage(res);
      });
  }

  /**
   *
   * @param data Update Sposnsor service call
   */ 
  updateSponsorData(data) {
    this.nationalService.updateSponsor(this.capitalizeValues(this.model)).subscribe((res) => {
      if(res['responseStatus'] == 200) {
       let indexTemp = this.filteredsponsorshipData.findIndex((sponData)=>{
         return sponData.id == this.model.id;
        });
        let tempData = this.filteredsponsorshipData.slice();
        tempData.splice(indexTemp,1, res['sponsershipReport']);
        this.filteredsponsorshipData = tempData;
      }
      this.displayDialog = false;
       this.responseMessage(res);
    });
  }

  /**
   *
   * @param data Modify the sponsor detail
   */
  capitalizeValues(data) {
    data.discountCode = data.discountCode.toUpperCase();
    data.nationalBenefit = data.nationalBenefit.toUpperCase();
    data.relationWithNational = data.relationWithNational.toUpperCase();
    data.type = data.type.toUpperCase();
    data.primaryGroupCode = data.primaryGroupCode.toUpperCase();
    data.sponserLevel = data.sponserLevel.toUpperCase();

    if (data.expirationDate != null && data.expirationDate.length !== 0) {
      data.expirationDate = this.formatdate(new Date(data.expirationDate));
    } else {
      data.expirationDate = this.expirationDate;
    }

    if (data.aggrementEndDate != null && data.aggrementEndDate.length !== 0) {
      data.aggrementEndDate = this.formatdate(new Date(data.aggrementEndDate));
    } else {
      data.aggrementEndDate = this.aggrementEndDate;
    }

    if (data.invoiceDate != null && data.invoiceDate.length !== 0) {
      data.invoiceDate = this.formatdate(new Date(data.invoiceDate));
    } else {
      data.invoiceDate = this.invoiceDate;
    }return data;
  }

  /**
   *
   * @param date fomrat date
   */
  formatdate(date) {
    const dateObj = new Date(date);
    const momentobj = moment(dateObj);
    return momentobj.format('MM/DD/YYYY');
  }


  /**
   * Get All Sponsors
   */
  getAllSponsors() {
    this.loading = true;
    this.nationalService.getAllSponsors(this.userName, 'SPONSOR').subscribe(res => {
      this.uniqueParteshipYear = [];
      this.uniqueChapters = [];
      this.loading = false;
      this.uniqueParteshipYear.push({ label: 'ALL', value: 'ALL' });
      this.uniqueChapters.push({ label: 'ALL', value: 'ALL' });
      this.sponsorshipData = res;
      this.sponsorshipData = _.orderBy(this.sponsorshipData, ['sponsor'], ['asc']);
      this.sponsorshipData.map(x => {
        if (x.expirationDate) {
          x.expirationDate = new Date(x.expirationDate);
        } else {
          x.expirationDate = x.expirationDate;
        }
        if (x.invoiceDate) {
          x.invoiceDate = new Date(x.invoiceDate);
        } else {
          x.invoiceDate = x.invoiceDate;
        }
        if (x.aggrementEndDate) {
          x.aggrementEndDate = new Date(x.aggrementEndDate);
        } else {
          x.aggrementEndDate = x.aggrementEndDate;
        }
      });

      this.sponsorshipData.forEach(sponsor => {
        const isFound = this.uniqueParteshipYear.find((sponsorValues) => {
          return sponsorValues.label === sponsor.partenershipYear;
        });
        if (!isFound && sponsor.partenershipYear !== null) {
          this.uniqueParteshipYear.push({ label: sponsor.partenershipYear, value: sponsor.partenershipYear });
        }
        const isChapterCodeFound = this.uniqueChapters.find((sponsorValues) => {
          return sponsorValues.label === sponsor.primaryGroupCode;
        });
        if (!isChapterCodeFound && sponsor.primaryGroupCode.trim() !== null) {
          this.uniqueChapters.push({ label: sponsor.primaryGroupCode, value: sponsor.primaryGroupCode });
        }
      });
      this.uniqueChapters = _.orderBy(this.uniqueChapters, ['label'], ['asc']);
      this.uniqueParteshipYear = _.reverse(_.orderBy(this.uniqueParteshipYear, ['label'], ['asc']));
      this.partnershipYearSelection();
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  /**
   *  filetr years by partnership years
   */
  partnershipYearSelection() {
    if (this.selectedValue === 'ALL') {
      if (this.selectedChapter === undefined || this.selectedChapter === 'ALL') {
        this.filteredsponsorshipData = this.sponsorshipData;
      } else {
        if (this.selectedChapter === 'ALL') {
          return this.filteredsponsorshipData = this.sponsorshipData;
        }
        this.filteredsponsorshipData = this.sponsorshipData.filter((sponsorData) => {
          return sponsorData.primaryGroupCode === this.selectedChapter;
        });
      }
    } else {
      this.filteredsponsorshipData = this.sponsorshipData.filter((sponsorData) => {
        if (this.selectedChapter === 'ALL') {
          return sponsorData.partenershipYear === this.selectedValue;
        } else {
          return sponsorData.partenershipYear === this.selectedValue && sponsorData.primaryGroupCode === this.selectedChapter;
        }
      });
    }
    this.getCalculatedReport();

   
  }

  /**
   *  filetr years by partnership years
   */
  chapterSelection() {
    if (this.selectedChapter === 'ALL') {
      this.filteredsponsorshipData = this.sponsorshipData.filter((sponsorData) => {
        if (this.selectedValue !== 'ALL') {
          return sponsorData.partenershipYear === this.selectedValue;
        } else {
          return this.filteredsponsorshipData = this.sponsorshipData;
        }
      });
    } else {
      this.filteredsponsorshipData = this.sponsorshipData.filter((sponsorData) => {
        return sponsorData.primaryGroupCode === this.selectedChapter &&
          (sponsorData.partenershipYear === this.selectedValue || this.selectedValue === 'ALL');
      });
    }
    this.getCalculatedReport();
  }

/**
 * Report calulations
 */
  getCalculatedReport() {
    let totalTemp = 0;
    let issuedTotalTemp = 0;
    let redeemedTotalTemp = 0;
    let unUsedTotalTemp = 0;
    this.filteredsponsorshipData.forEach((data) => {
      if (data != undefined) {
        totalTemp += data.amount;
        issuedTotalTemp += data.issued;
        redeemedTotalTemp += data.redeemed;
        unUsedTotalTemp += data.unused;
      }
    });

    this.calculatedSponsor = {
      totalTemp, issuedTotalTemp, redeemedTotalTemp, unUsedTotalTemp
    };
  }


  /**
   * Retieving redeemed Sponsoship details
   */
  redeemedSponsorship(redeem) {
    this.redeemedMembers = true;
    this.reedemedTitle = redeem.discountCode;
    this.nationalService.getReedemedMembersForSponserhip(redeem.discountCode).subscribe(res => {
      this.redeemedMembership = this.membersDataSnapshot.transform(res);
    }, error => {
      console.log(error);
    });
  }

  /**
  * Retrieving Contract terms
  */
  contractTerms(data) {
    this.termData = data.contractTerm.replace(/<br>/g, '').replace(/<\/p><p>/g, '<br>').replace(/<\/p><p/g, '<br');
    this.termsOf = data.sponsor;
    this.chapterCodeHead = data.primaryGroupCode;
    this.terms = true;
  }

  /**
   *
   * @param termsDiv Copy Terms
   */
  copyTerms(termsDiv) {
    this.selectedChapter = this.selectedChapter.replace(/([^\W_]+[^\s-]*) */g, ($1) => $1.toUpperCase());
    const title = `<h4>Ascend ${this.selectedChapter}: ${this.termsOf} -Partnership Terms<h4>`;
    let text = (title + termsDiv.innerText).replace(/<(?:.|\n)*?>/gm, '');
    text = text.replace(/^(.)|\s(.)/g,
      ($1) => {
        if ($1 === '↵•' || $1 === '•')
          return '\n\r•';
        else
          return $1;
      });
    function selectElementText(element) {
      var range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
    var element = document.createElement('DIV');
    element.textContent = text;
    document.body.appendChild(element);
    selectElementText(element);
    document.execCommand('copy');
    element.remove();
  }

  /**
   *
   * @param termsDiv Print a terms
   */
  printTerms(termsDiv) {
    if (this.chapterCodeHead) {
      this.chapterCodeHead =  this.chapterCodeHead.replace(/([^\W_]+[^\s-]*) */g, ($1) => $1.toUpperCase());
    } else {
      this.chapterCodeHead =  '';
    }
    const title = `<h4>Ascend ${ this.chapterCodeHead}: ${this.termsOf} -Partnership Terms<h4>`;
    function printDiv() {
      const contents = title + termsDiv.innerHTML;
      const frame1: any = document.createElement('iframe');
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      window.document.body.appendChild(frame1);
      const frameDoc: any = (frame1.contentWindow) ? frame1.contentWindow :
       (frame1.contentDocument.document) ? frame1.contentDocument.document : 
       frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write('<html><head><title>DIV Contents</title>');
      frameDoc.document.write('</head><body>');
      frameDoc.document.write(contents);
      frameDoc.document.write('</body></html>');
      frameDoc.document.close();
      setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        window.document.body.removeChild(frame1);
      }, 500);
      return false;
    }
    printDiv();
  }

  /**
  * retriving privileges of the role to export chart
  */
  grantedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe(res => {
      this.export = res.export;
      this.updateSponsor = res.manageNationalSponsor;
      this.userName = res.username;
    });
  }

  /**
   *
   * @param dt Export National Sponsorship report
   */
  exportCSV(dt: DataTable) {
    const fileName = 'National Sponsorship Report.csv';
    const exportColumns = ['sponsorId', 'sponsor', 'sponserLevel', 'primaryGroupCode'
      , 'amount', 'invoiceNumber', 'invoiceDate', 'aggrementEndDate',
      'partenershipYear', 'discountCode', 'issued', 'redeemed',
      'unused', 'expirationDate', 'contractTerm', 'nationalBenefit',
      'relationWithNational', 'crm', 'sponserContact', 'type'
    ];

    const UpdatedExportColumns = ['Sponsorship_Id', "Sponsor", "Source", "Primary_Group_Code",
      "Amount", "Invoice_Number", "Invoice_Date", "Agreement_End_Date",
      "Accounting_Year", "Promotional_Code", "Memberships_Issued", "Memberships_Redeemed",
      "Memberships_Unused", "Expiration_Date_of_Code", "Contract_Terms", "National_Benefit?",
      "Relationship_With_National?", "Chapter_Contact", "Sponsor_Contact", "Type"]

    const formmatedList = [];
    let dataTemp;
    const dtTemp = this.filteredsponsorshipData.slice();
    dt.value.map((field, index) => {
      const keys = Object.keys(field);
      dataTemp = {};
      if (field['contractTerm']) {
        field['contractTerm'] = (field['contractTerm'].replace(/<[^>]*>?/gm, '')).replace(/&nbsp/gm, '');
        field['contractTerm']  = field['contractTerm'].replace(/,/g, ' ');
      }

      exportColumns.forEach((key, index) => {
        dataTemp[UpdatedExportColumns[index]] = field[key] === undefined ||
        field[key] === null ? '' : field[key] instanceof Date ?
        (new Date(field[key]).toLocaleString()).split(' ')[0].replace(',', '') :
         String(field[key]).replace(',', '');
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }

  /**
   *
   * @param dt Export redeemed members
   */
  exportReddemedCSV(dt: DataTable) {
    const fileName = 'Membership Redeemption for ' + this.reedemedTitle + '.csv';
    const exportColumns = ['guid', 'firstName', 'middleName',
      'lastName', 'email', 'company', 'memberSince',
      'expiryDate', 'membership', 'primaryGroupCode',
      'amount', 'paymentType', 'dateProcessed', 'sponsor',
      'promotionalCode', 'emailBounced', 'gender',
      'alternateEmails', 'homePhoneAreaCode', 'phone',
      'mobileAreaCode', 'mobile', 'professionalTitle',
      'employerPhoneAreaCode', 'employerPhone'
    ];

    const updatedExportColumns = ['API_GUID', 'First_Name', 'Middle_Name',
      'Last_Name', 'Email_Address', 'Employer_Name', 'Member_Sign_up', 'Date_Membership_Expires',
      'Membership Type', 'Primary_Group_Code', 'Amount', 'Payment_Type', 'Processed_Date', 'Sponsor',
      'Promotional_Code', 'Email_Bounced', 'Gender',
      'Email_Address_Alternate', 'Home_Phone_Area_Code', 'Home_Phone',
      'Mobile_Area_Code', 'Mobile', 'Professional_Title',
      'Employer_Phone_Area_Code', 'Employer_Phone'
    ];

    let formmatedList = [];
    let dataTemp;
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};
      exportColumns.forEach((key, index) => {
        dataTemp[updatedExportColumns[index]] = field[key] === field[key] === 
        undefined || field[key] === null ? '' : field[key] instanceof Date ?
         (new Date(field[key]).toLocaleString()).split(' ')[0].replace(',', '') :
          String(field[key]).replace(',', '');
      })
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }

  /**
   *
   * @param rowData Delete the sponsor
   */
  confirmation(rowData) {
    this.confirmHead = 'Confirmation';
    this.confirmationService.confirm({
      message: 'Do you want to remove this Sponsor?',
      accept: () => {
        this.loading = true;
        this.nationalService.deleteSponsor(rowData.id).subscribe(res => {
       let indexTemp = this.filteredsponsorshipData.findIndex((sponData)=>{
           return sponData.id == rowData.id;
           });
           let tempData = this.filteredsponsorshipData.slice();
           tempData.splice(indexTemp,1);
           this.filteredsponsorshipData = tempData;
          this.loading = false;
          this.responseMessage(res);
        }, error => {
          this.loading = false;
          this._notify.error('', error.message);
        });
      }
    });
  }

  /**
   *
   * @param res Common Reponse Object
   */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.displayDialog = false;
      this.loading = false;
      this._notify.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this.displayDialog = true;
      this.loading = false;
      this.errorMessage = responseValue.errorDescrition;
    }
  }

  /**
   *
   * @param dt Export National Sponsorship report
   */
  exportMembershipCodeCSV() {

    this.loading = true;
    this.nationalService.getAllSponsors(this.userName, 'MEMBER').subscribe( (res) => {
      this.membershipCodes = res;
    });
    const fileName = 'National Membership Code Report.csv';
    const exportColumns = ['sponsorId', 'sponsor', 'sponserLevel', 'primaryGroupCode'
      , 'amount', 'invoiceNumber', 'invoiceDate', 'aggrementEndDate',
      'partenershipYear', 'discountCode', 'issued', 'redeemed',
      'unused', 'expirationDate', 'contractTerm', 'nationalBenefit',
      'relationWithNational', 'crm', 'sponserContact', 'type'
    ];

    const UpdatedExportColumns = ['Sponsorship_Id', 'Sponsor', 'Source', 'Primary_Group_Code',
      'Amount', 'Invoice_Number', 'Invoice_Date', 'Agreement_End_Date',
      'Accounting_Year', 'Promotional_Code', 'Memberships_Issued', 'Memberships_Redeemed',
      'Memberships_Unused', 'Expiration_Date_of_Code', 'Contract_Terms', 'National_Benefit?',
      'Relationship_With_National?', 'Chapter_Contact', 'Sponsor_Contact', 'Type']

    const formmatedList = [];
    let dataTemp;

    if (this.membershipCodes) {
      const dtTemp = this.membershipCodes.slice();
    dtTemp.map((field, index) => {
      const keys = Object.keys(field);
      dataTemp = {};

        if (field['contractTerm']) {
        field['contractTerm'] = (field['contractTerm'].replace(/<[^>]*>?/gm, '')).replace(/&nbsp/gm, '');
        field['contractTerm']  = field['contractTerm'].replace(/,/g, ' ');
      }

      exportColumns.forEach((key, index) => {
        dataTemp[UpdatedExportColumns[index]] = field[key] ===
        undefined || field[key] === null ? '' : field[key] instanceof Date ?
         (new Date(field[key]).toLocaleString()).split(' ')[0].replace(',', '')
         : String(field[key]).replace(',', '');
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
    }
    this.loading = false;
  }

  /** Get System client System date  */
  // getSystemDateFormat() {
  //   let fullDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  //   let dateTemp = fullDate.toString().split(',')[0].split('/');
  //   let dateFormat = []
  //   dateTemp.forEach((dTemp, index) => {
  //     if (+dTemp === +new Date().getMonth() + 1) {
  //       return dateFormat[index] = 'MM';
  //     }

  //     if (+dTemp === +new Date().getDate()) {
  //       return dateFormat[index] = 'DD';
  //     }

  //     if (+dTemp === + new Date().getFullYear()) {
  //       return dateFormat[index] = 'YYYY';
  //     }
  //   });
  //   return dateFormat[0] + '/' + dateFormat[1] + '/' + dateFormat[2];
  // }

  checkLengthOfCharacters(data) {
    if (data.textValue.length > 6000) {
      this.enable = false;
      this.pcTermsLengthError = 'Proposed contract terms exceed the limit';
    } else {
      this.enable = true;
      this.pcTermsLengthError = '';
    }
  }
}
