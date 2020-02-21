import { Component, OnInit, ViewChild, ViewEncapsulation, OnChanges } from '@angular/core';
import { PipelineService } from 'src/app/services/pipeline.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/utils/services/common.service';
import { ConfigService } from 'src/app/configs/services/config.service';
import { ChapterContact } from 'src/app/models/ChapterContact';
import { NatioalContact } from 'src/app/models/NationalContact';
import { SponsorContact } from 'src/app/models/SponsorContact';
import { NotificationsService } from 'angular2-notifications';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService } from 'primeng/api';
import { DataTable } from 'primeng/primeng';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'em-sponsorship-pipeline',
  templateUrl: './sponsorship-pipeline.component.html',
  styleUrls: ['./sponsorship-pipeline.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})


export class SponsorshipPipelineComponent implements OnInit {
  @ViewChild("opportunityForm") opportunityForm;
  selectedCode: any;
  selectedChapter: any;
  opportunities: any;
  displayDialog: boolean = false;
  model: any = {};
  notes: any = {};
  stages: any;
  opportunityName: string ;
  chapterContact = new ChapterContact();
  expandedRows: {} = {};
  dialogeHead: string;
  cols: any[];
  alphaExp: RegExp = /^[A-Za-z]+$/;
  alphaNumeric: RegExp = /^([a-zA-Z0-9 _-]+)$/;
  export: boolean;
  deleteOpportunity: boolean;
  chapterContacts: any = [];
  sponsorContacts: any = [];
  nationalContacts: any = [];
  chapterContactsInputs: any = [];
  sponsorContactsInputs: any = [];
  nationalContactsInputs: any = [];
  workFlowInputs: any = [];
  proposedContractTermsInput: any = [];
  colorObject;

  sponsorNameAlert = 'Sponsor Name is required';
  sponsorstatusAlert = 'Sponsor status is required';
  existingSponsorAlert = 'Existing Sponsor is required';
  relationshipWithNationalsAlert = 'Relationship with sponsor required';
  NCConventionAlert = 'National Convention is Required';
  ownerAlert = 'Owner is Required';
  winningPercentageAlert = 'Winning Percentage is required';
  proposedAmountInputAlert = 'Proposed Amount is required';
  descriptionAlert = 'Description is required';
  tagsAlert = 'Tag is required';
  membershipProposedAlert = 'Membership Proposed is required';
  stagesAlert = 'Stage is required';
  addButton = true;
  errorMessage: any;
  confirmHead: string;
  notesDialogeHead: string;
  displayNotesDialog: boolean;
  sponsrId: void;
  sponsorId: any;
  followUps: any = [];
  viewdisplayNotesDialog: boolean;
  viewNotesDialogeHead: any;
  filteredopportunities: any;
  updateButton: boolean;
  termData: any = "";
  terms: boolean;
  pcTermsLengthError: string = "";
  enable: any = true; viewOpportunity: any;
  description: any;
  invoice: any;
  manageOpportunities: any;
  loading: boolean = false;
  editOpportunityDialogeHead: string;
  userName: any;
  updatedBy: any;

  constructor(private pipelineService: PipelineService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private configService: ConfigService,
    private _notify: NotificationsService,
    private activatedRoute: ActivatedRoute) {
    this.chapterContacts.push(new ChapterContact());
    this.nationalContacts.push(new NatioalContact());
    this.sponsorContacts.push(new SponsorContact());
    this.activatedRoute.params.subscribe(params => this.dropDownValue(params['selectedCode']));
  }

  ngOnInit() {
    this.getOpporunitiesForChapter();
    this.getGratnedPrivileges();
    this.cols = [
      { field: 'sponsorName', header: 'Sponsor Name' },
      { field: 'status', header: 'Status' },
      { field: 'stage', header: 'Stage' },
      { field: 'existingSponsor', header: 'Existing Sponsor' },
      { field: 'membershipProposed', header: 'Membership Proposed' },
      { field: 'createdOn', header: 'Date Created' },
      { field: 'Relation With Nationals', header: 'relationWithNationals' },
      { field: 'tags', header: 'Tags' },
      { field: 'winningPercentage', header: 'Winning Percentage' },
      { field: 'relationWithNationals', header: 'Relation With Nationals' },
      { field: 'invoice', header: 'Invoice' },
      { field: 'description', header: 'Description' },
      { field: 'proposedAmount', header: 'Proposed Amount' },
      { field: 'nationalBenefits', header: 'National Benefits' },
    ];
  }

  addOpportunity() {
    this.model = {};
    this.chapterContacts = [];
    this.stages = [];
    this.sponsorContacts = [];
    this.nationalContacts = [];
    this.pcTermsLengthError = '';
    this.chapterContacts.push(new ChapterContact());
    this.sponsorContacts.push(new SponsorContact());
    this.nationalContacts.push(new NatioalContact());
    this.addButton = true;
    this.updateButton = false;
    this.opportunityForm.form.reset();
    this.displayDialog = true;
    this.dialogeHead = 'Add Opportunity';
    this.getStages();
  }

  /**
   * To get Opportunities for chapter
   */
  getOpporunitiesForChapter() {
    if (this.selectedCode) {
      this.loading = true;
      this.pipelineService.getOpportunitiesForChapter(this.selectedCode).subscribe((res => {
        this.loading = false;
        this.opportunities = res;
        this.opportunities.map(element => {
          if (element.stages && element.stages.stage) {
            element.stage = element.stages.stage;
          }
        });
      }));
    }
  }

  /**
   * set selected Primary group code to get active chapter
   * @param val primary group code from route parameter
   */
  dropDownValue(val) {
    this.commonService.setChapterCode(val);
    this.selectedCode = val;
    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterName(this.selectedChapter);
        }
      });
    });
    this.getOpporunitiesForChapter();
  }

  /**
   * Get All stages
   */
  getStages() {
    this.configService.getStages().subscribe((res) => {
      this.stages = res;
    });
  }

  addChapterContacts() {
    this.chapterContacts.push(new ChapterContact());
  }

  addSponsorContacts() {
    this.sponsorContacts.push(new SponsorContact());
  }

  addNationalContacts() {
    this.nationalContacts.push(new NatioalContact());
  }

  /**
   * 
   * @param data To save Opportunity
   */
  saveOpportunity(data) {
    data.sponsorContacts = this.sponsorContacts;
    data.nationalContacts = this.nationalContacts;
    data.chapterContacts = this.chapterContacts;
    const opportunityObject = {
      ...data,
        'primaryGroupCode': this.selectedCode,
    };
    this.loading = true;
    this.pipelineService.addOpportunity(opportunityObject).subscribe((res) => {
      this.loading = false;
      this.responseMessage(res);
    }, error => {
      this.loading = false;
      this._notify.error('', error.message);
    });
  }

  /**
   * To edit Opportunity
   */
  editOpportunity(data) {
    this.getStages();
    this.updateButton = true;
    this.addButton = false;
    this.displayDialog = true;
    this.dialogeHead = 'Update Opportunity for ' + data.sponsorName;
    this.model = { ...data };
    if (data.createdOn) {
      this.model.createdOn = new Date(data.createdOn);
    } else {
      this.model.createdOn = data.createdOn;
    }

    if (data.potentionalCoseDate) {
      this.model.potentionalCoseDate = new Date(data.potentionalCoseDate);
    } else {
      this.model.potentionalCoseDate = data.potentionalCoseDate;
    }
    // this.model.createdOn = new Date(data.createdOn);
    // this.model.potentionalCoseDate = new Date(data.potentionalCoseDate);
    this.chapterContacts = data.chapterContacts;
    this.sponsorContacts = data.sponsorContacts;
    this.nationalContacts = data.nationalContacts;
  }

  onRowRemoveChapterContact(data) {
    this.chapterContacts.splice(data, 1);
  }

  onRowRemoveNationalContact(data) {
    this.nationalContacts.splice(data, 1);
  }

  onRowRemoveSponsorContact(data) {
    this.sponsorContacts.splice(data, 1);
  }

  /**
  *  To view the response message
  * @param res 
  */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.displayDialog = false;
      this.displayNotesDialog = false;
      this.model = {};
      this.notes = {};
      this._notify.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this.displayDialog = true;
      this.displayNotesDialog = true;
      this.errorMessage = responseValue.errorDescrition;
    }
    this.getOpporunitiesForChapter();
  }

  filterOpportunity(data) {
    this.chapterContactsInputs = data.data.chapterContacts;
    this.sponsorContactsInputs = data.data.sponsorContacts;
    this.nationalContactsInputs = data.data.nationalContacts;
    this.workFlowInputs = data.data.followUps;
    this.description = data.data.description;
    this.invoice = data.data.invoice;
    this.proposedContractTermsInput = data.data.ProposedContractTerms;
  }
  /**
   * Delete Opportunity
   */
  confirmation(rowData) {
    this.confirmHead = 'Confirmation';
    this.confirmationService.confirm({
      message: 'Do you want to remove this opportunity?',
      accept: () => {
        this.pipelineService.deleteOpportunity(rowData.id).subscribe(res => {
          this.responseMessage(res);
        }, error => {
          this._notify.error('', error.message);
        });
      }
    });
  }

  /**
   * 
   * @param data Add Notes to User
   */
  addNotesPopUp(data) {
    this.sponsorId = data.id;
    this.getStages();
    this.notes.stages = [];
    this.notesDialogeHead = 'Add Notes to ' + data.sponsorName + ' (' + data.primaryGroupCode + ')';
    this.displayNotesDialog = true;
  }

  /**
   * add Notes to to Opportunity
   * @param 
   */
  addNotesDetails(data) {
    data.updatedBy = this.updatedBy;
    this.pipelineService.addNotesToOpportunity(this.sponsorId, data).subscribe((res => {
      this.responseMessage(res);
    }));
  }

  compareByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.stage == itemTwo.stage;
  }

  compareNotesByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.stage == itemTwo.stage;
  }

  ViewNotesPopUp(data) {
    this.viewNotesDialogeHead = ' Notes for ' + data.sponsorName + ' (' + data.primaryGroupCode + ')';
    this.viewdisplayNotesDialog = true;
    this.followUps = _.orderBy(data.followUps, ['followUpDate'], ['asc']);
    this.followUps.map((element) => {
      return element.notes = element.notes.replace(/<br>/g, '').replace(/<\/p><p>/g, '<br>').replace(/<\/p><p/g, '<br');
    });
  }

  exportCSV(pipelineDt: DataTable) {

    const fileName = this.selectedChapter + ' opportunity Report .csv';

    const exportColumns = ['sponsorName', 'createdOn', 'potentionalCoseDate',
      'primaryGroupCode', 'status', 'existingSponsor', 'owner',
      'nationalConventionSponsor', 'nationalBenefits', 'membershipProposed',
      'description', 'invoice', 'proposedAmount', 'proposedContractTerms',
      'relationWithNationals', 'tags', 'winningPercentage',
      'stage', 'nationalContacts', 'chapterContacts', 'sponsorContacts'
    ];

    const updatedExportColumns = ['Sponsor Name', 'Date Created', 'Potential Close Date',
      'Primary Group Code', 'Status', 'Existing Sponsor', 'Owner', 'National Convention Sponsor',
      'National Benefits', 'Membership Proposed', 'Description', 'Invoice', 'Proposed Amount', 'Proposed Contract Terms',
      'Relation With Nationals', 'Tags', 'Winning Percentage',
      'Stage', 'National Contacts', 'Chapter Contacts', 'Sponsor Contacts'
    ];

    let formmatedList = [];
    let dataTemp;
    const dtTemp = [...pipelineDt.value.slice()];
    dtTemp.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};

      let nationalContacts;
      if (field['nationalContacts']) {
        nationalContacts = field['nationalContacts'].map((elem, index) => {
          if (elem.fullName) {
          return (index + 1 + (") " + String(elem.fullName ? elem.fullName : "") +
            ' '  + String(elem.role ? elem.role : "") + " " +
            " " + String(elem.email ? elem.email : "") + " " +
            String(elem.phone ? elem.phone : "") + " " +
            " " + String(elem.other ? elem.other : "")))
          } else {
            return '';
          }
        }).join(',');
      }
      field['nationalContacts'] = nationalContacts;


      let chapterContacts;
      if (field['chapterContacts']) {
        chapterContacts = field['chapterContacts'].map((elem, index) => {
          if (elem.fullName) {
          return (index + 1 + (") " + String(elem.fullName ? elem.fullName : "") +
            " " + String(elem.role ? elem.role : "") + " " +
            " " + String(elem.company ? elem.company : "") +
            " " + String(elem.companyRole ? elem.companyRole : " ") +
            " " + String(elem.email ? elem.email : "") + " " +
            String(elem.phone ? elem.phone : "") + " "))
          } else {
            return '';
          }
        }).join(",");
      }
      field['chapterContacts'] = chapterContacts;

      let sponsorContacts;
      if (field['sponsorContacts']) {
        sponsorContacts = field['sponsorContacts'].map((elem, index) => {
          if (elem.fullName) {
            return (index + 1 + (") " + String(elem.fullName ? elem.fullName : "") +
              " " + String(elem.company ? elem.company : "") +
              " " + String(elem.companyRole ? elem.companyRole : " ") +
              " " + String(elem.role ? elem.role : "") +
              " " + String(elem.email ? elem.email : "") +
              " " + String(elem.phone ? elem.phone : "") +
              String(elem.other ? elem.other : "")))
          } else {
            return '';
          }
        }).join(',');
      }
      field['sponsorContacts'] = sponsorContacts;

      if (field['proposedContractTerms']) {
        field['proposedContractTerms'] = (field['proposedContractTerms'].replace(/<[^>]*>?/gm, '')).replace(/&nbsp/gm, '');
        field['proposedContractTerms']  = field['proposedContractTerms'].replace(/,/g, ' ');
      }

      exportColumns.forEach((key, index) => {
        dataTemp[updatedExportColumns[index]] = field[key] === undefined || field[key] === null ? '' :
          field[key] instanceof Date ? moment(field[key]).format('MM/DD/YYYY') :
            String(field[key]).replace(',', '');
      });

      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
    this.getOpporunitiesForChapter();
  }

  /**
   * 
   * @param data Update Opportunity details
   */
  updateOpportunity(data) {
    data.sponsorContacts = this.sponsorContacts;
    data.nationalContacts = this.nationalContacts;
    data.chapterContacts = this.chapterContacts;
    data.id = this.model.id;
    let opportunityObject = {
      ...data,
      "primaryGroupCode": this.selectedCode,
    }
    this.pipelineService.updateOpportunity(opportunityObject).subscribe((res) => {
      this.responseMessage(res);
    })
  }

  /**
 * Retrieving Contract terms
 */
  contractTerms(data) {
    this.termData = data.proposedContractTerms.replace(/<br>/g, '').replace(/<\/p><p>/g, '<br>').replace(/<\/p><p/g, '<br');
    this.opportunityName = data.sponsorName;
    this.terms = true;
  }

  copyTerms(termsDiv) {
    this.selectedChapter = this.selectedChapter.replace(/([^\W_]+[^\s-]*) */g, ($1) => $1.toUpperCase());
    const title = `<h4>Ascend ${this.selectedChapter}  -Partnership Terms<h4>`;
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

  printTerms(termsDiv) {
    this.selectedChapter = this.selectedChapter.replace(/([^\W_]+[^\s-]*) */g, ($1) => $1.toUpperCase());
    const title = `<h4>Ascend ${this.selectedChapter} -Partnership Terms<h4>`;
    function printDiv() {
      const contents = title + termsDiv.innerHTML;
      const frame1: any = document.createElement('iframe');
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      window.document.body.appendChild(frame1);
      const frameDoc: any = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
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

  checkLengthOfCharacters(data) {
    this.enable;
    if (data.textValue.length > 6000) {
      this.enable = false;
      this.pcTermsLengthError = "Proposed contract terms exceed the limit";
    } else {
      this.enable = true;
      this.pcTermsLengthError = "";
    }
  }


  copyNotes(termsDiv) {
    this.selectedChapter = this.selectedChapter.replace(/([^\W_]+[^\s-]*) */g, ($1) => $1.toUpperCase());
    const title = `<h4>Ascend ${this.selectedChapter}  -Partnership Terms<h4>`;
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

  printNotes(termsDiv) {
    const title = `<h4>${this.viewNotesDialogeHead}</h4>`;
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

  getGratnedPrivileges() {
    this.commonService.getGrantedPrivileges().subscribe((res => {
      this.viewOpportunity = res.viewChapterOpportunities;
      this.manageOpportunities = res.manageChapterOpportunities;
      this.userName = res.username;
      this.updatedBy = res.username;
      this.export = res.export;
      this.deleteOpportunity = res.deleteChapterOpportunity;
    }));
  }

}
