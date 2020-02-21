import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CommonService } from "../../utils/services/common.service";
import { NationalService } from "../../national/services/national-service";
import { MembersDataSnapshot } from "../../utils/pipes/trasformations.pipes";
import { ConfigService } from "../../configs/services/config.service";
import { DataTable, ConfirmationService } from "primeng/primeng";
import { NotificationsService } from "angular2-notifications";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import * as _ from "lodash";

@Component({
  selector: "em-chapters-sponsorship",
  templateUrl: "./chapters-sponsorship.component.html",
  styleUrls: ["./chapters-sponsorship.component.css"]
})
export class ChaptersSponsorshipComponent implements OnInit {
  @ViewChild("sponsorForm") sponsorForm;
  selectedChapter: any;
  membersDataSnapshot = new MembersDataSnapshot();
  primaryGroupCode: any;
  dialog_heading = "Contract Terms";
  selectedCode: any;
  sponsorshipData: any;
  filteredsponsorshipData: any;
  redeemedMembers = false;
  export: boolean;
  pcTermsLengthError = "";
  enable: boolean;
  terms: boolean;
  redeemedMembership: any;
  reedemedTitle: any;
  termData: any;
  termPlus: string;
  loading = false;
  uniqueParteshipYear = [];
  defaultParteshipYear = { label: "ALL", value: "ALL" };
  termsOf = "";
  selectedValue = "ALL";
  calculatedSponsor: any;
  confirmHead: string;
  displayDialog: boolean;
  dialogeHead: string;
  updateButton: boolean;
  addButton: boolean;
  numberExp: RegExp = /^[\d\(\)\-\.+]+$/;
  editSponsers: boolean = false;
  updateSponsor: boolean = false;
  errorMessage: String = "";
  invoiceDate = "";
  aggrementEndDate = "";
  expirationDate = "";
  paymentDate = "";
  model: any = {};

  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private nationalService: NationalService,
    private _notify: NotificationsService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    this.activatedRoute.params.subscribe(params =>
      this.dropDownValue(params["selectedCode"])
    );
    this.commonService.getChapterFromDropdown().subscribe(res => {
      this.dropDownValue(res);
    });
  }

  ngOnInit() {
    this.redeemedMembers = false;
    this.getSponsorsForChapter();
    this.grantedPrivileges();
  }

  addSponsor() {
    this.model = {};
    this.errorMessage = "";
    this.addButton = true;
    this.updateButton = false;
    this.displayDialog = true;
    this.dialogeHead = "Add Sponsor";
    this.sponsorForm.form.reset();
  }

  editSponsor(data) {
    this.model = {};
    this.errorMessage = "";
    this.addButton = false;
    this.updateButton = true;
    this.displayDialog = true;
    this.dialogeHead = "Edit Sponsor";
    this.updateButton = true;
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

  saveSponsor(data) {
    this.nationalService
.saveSponsor(this.capitalizeValues(this.sponsorForm.value))
      .subscribe(res => {
        this.displayDialog = false;
        if (res["responseStatus"] == 200) {
          let tempData = this.filteredsponsorshipData.slice();
          console.log(res["sponsershipReport"]);
          tempData.push(res["sponsershipReport"]);
          this.filteredsponsorshipData = tempData;
        }
        this.responseMessage(res);
      });
  }

  updateSponsorData(data) {
    this.nationalService
      .updateSponsor(this.capitalizeValues(this.model))
      .subscribe(res => {
        if (res["responseStatus"] == 200) {
          let indexTemp = this.filteredsponsorshipData.findIndex(sponData => {
            return sponData.id == this.model.id;
          });
          let tempData = this.filteredsponsorshipData.slice();

          // console.log(res["sponsershipReport"]);
          tempData.splice(indexTemp, 1, res["sponsershipReport"]);

          this.filteredsponsorshipData = tempData;
        }
        this.displayDialog = false;
        this.responseMessage(res);
      });
  }

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
    }
    return data;
  }

  formatdate(date) {
    let dateObj = new Date(date);
    let momentobj = moment(dateObj);
    return momentobj.format("MM/DD/YYYY");
  }

  /**
   * set selected Primary group code to get active chapter
   * @param val primary group code from route parameter
   */
  dropDownValue(val) {
  this.selectedCode = val;
    this.configService.getChapters().subscribe(res => {
      res.forEach(el => {
        if (el.primaryGroupCode === val) {
          this.selectedChapter = el.chapterName;
          this.commonService.setChapterCode(el.primaryGroupCode);
          // console.log('primary', el.primaryGroupCode)
          // console.log(this.commonService.setChapterCode);
          this.commonService.setChapterName(this.selectedChapter);
        }
      });
    });
    this.load();
  }

  load() {
    this.getSponsorsForChapter();
  }
  /**
   * Get Sponsorship details for selected Chapter
   */

  getSponsorsForChapter() {
    if (this.selectedCode) {
      this.nationalService.getSponsorsForChapter(this.selectedCode).subscribe(
        res => {
          this.loading = true;
          this.uniqueParteshipYear = [];
          this.loading = false;
          this.uniqueParteshipYear.push({ label: "ALL", value: "ALL" });
          this.sponsorshipData = res;
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
            let isFound = this.uniqueParteshipYear.find(sponsorValues => {
              return sponsorValues.label === sponsor.partenershipYear;
            });

            if (!isFound && sponsor.partenershipYear !== null) {
              this.uniqueParteshipYear.push({
                label: sponsor.partenershipYear,
                value: sponsor.partenershipYear
              });
            }
          });
          this.uniqueParteshipYear = _.reverse(
            _.orderBy(this.uniqueParteshipYear, ["label"], ["asc"])
          );
          this.partnershipYearSelection();
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }

  /**
   *  filetr years by partnership years
   */
  partnershipYearSelection() {
    if (this.selectedValue === "ALL") {
      this.filteredsponsorshipData = this.sponsorshipData;
    } else {
      this.filteredsponsorshipData = this.sponsorshipData.filter(
        sponsorData => {
          return sponsorData.partenershipYear === this.selectedValue;
        }
      );
    }
    this.getCalculatedReport();
  }

  getCalculatedReport() {
    let totalTemp = 0;
    let issuedTotalTemp = 0;
    let redeemedTotalTemp = 0;
    let unUsedTotalTemp = 0;
    this.filteredsponsorshipData.forEach(data => {
      if (data != undefined) {
        totalTemp += data.amount;
        issuedTotalTemp += data.issued;
        redeemedTotalTemp += data.redeemed;
        unUsedTotalTemp += data.unused;
      }
    });

    this.calculatedSponsor = {
      totalTemp,
      issuedTotalTemp,
      redeemedTotalTemp,
      unUsedTotalTemp
    };
  }

  /**
   * Retieving redeemed Sponsoship details
   */
  redeemedSponsorship(redeem) {
    this.redeemedMembers = true;
    this.reedemedTitle = redeem.discountCode;
    this.nationalService
      .getReedemedMembersForSponserhip(redeem.discountCode)
      .subscribe(
        res => {
          this.redeemedMembership = this.membersDataSnapshot.transform(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * Retrieving Contract terms
   */
  contractTerms(data) {
    this.termData = data.contractTerm
      .replace(/<br>/g, "")
      .replace(/<\/p><p>/g, "<br>")
      .replace(/<\/p><p/g, "<br");
    this.termsOf = data.sponsor;
    this.terms = true;
  }

  copyTerms(termsDiv) {
    this.selectedChapter = this.selectedChapter.replace(
      /([^\W_]+[^\s-]*) */g,
      $1 => $1.toUpperCase()
    );
    const title = `<h4>Ascend ${this.selectedChapter}: ${this.termsOf} -Partnership Terms<h4>`;
    let text = (title + termsDiv.innerText).replace(/<(?:.|\n)*?>/gm, "");
    text = text.replace(/^(.)|\s(.)/g, $1 => {
      if ($1 === "↵•" || $1 === "•") return "\n\r•";
      else return $1;
    });
    function selectElementText(element) {
      var range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
    var element = document.createElement("DIV");
    element.textContent = text;
    document.body.appendChild(element);
    selectElementText(element);
    document.execCommand("copy");
    element.remove();
  }

  printTerms(termsDiv) {
    this.selectedChapter = this.selectedChapter.replace(
      /([^\W_]+[^\s-]*) */g,
      $1 => $1.toUpperCase()
    );
    const title = `<h4>Ascend ${this.selectedChapter}: ${this.termsOf} -Partnership Terms<h4>`;
    function printDiv() {
      const contents = title + termsDiv.innerHTML;
      const frame1: any = document.createElement("iframe");
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      window.document.body.appendChild(frame1);
      const frameDoc: any = frame1.contentWindow
        ? frame1.contentWindow
        : frame1.contentDocument.document
        ? frame1.contentDocument.document
        : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write("<html><head><title>DIV Contents</title>");
      frameDoc.document.write("</head><body>");
      frameDoc.document.write(contents);
      frameDoc.document.write("</body></html>");
      frameDoc.document.close();
      setTimeout(function() {
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
      this.updateSponsor = res.manageChapterSponsor;
    });
  }

  exportCSV(dt: DataTable) {
    let name = "";
    this.selectedChapter.split(" ").forEach(myObject => {
      name = name + " " + myObject.charAt(0).toUpperCase() + myObject.slice(1);
    });

    const fileName = name + " Sponsorship Report.csv";

    let exportColumns = [
      "sponsorId",
      "sponsor",
      "sponserLevel",
      "primaryGroupCode",
      "amount",
      "invoiceNumber",
      "invoiceDate",
      "aggrementEndDate",
      "partenershipYear",
      "discountCode",
      "issued",
      "redeemed",
      "unused",
      "expirationDate",
      "contractTerm",
      "nationalBenefit",
      "relationWithNational",
      "crm",
      "sponserContact",
      "type"
    ];

    let UpdatedExportColumns = [
      "Sponsorship_Id",
      "Sponsor",
      "Source",
      "Primary_Group_Code",
      "Amount",
      "Invoice_Number",
      "Invoice_Date",
      "Agreement_End_Date",
      "Accounting_Year",
      "Promotional_Code",
      "Memberships_Issued",
      "Memberships_Redeemed",
      "Memberships_Unused",
      "Expiration_Date_of_Code",
      "Contract_Terms",
      "National_Benefit?",
      "Relationship_With_National?",
      "Chapter_Contact",
      "Sponsor_Contact",
      "Type"
    ];

    let formmatedList = [];
    let dataTemp;
    let dtTemp = dt.value.slice();
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};

      if (field["contractTerm"]) {
        field["contractTerm"] = field["contractTerm"]
          .replace(/<[^>]*>?/gm, "")
          .replace(/&nbsp/gm, "");
        field["contractTerm"] = field["contractTerm"].replace(/,/g, " ");
      }

      exportColumns.forEach((key, index) => {
        dataTemp[UpdatedExportColumns[index]] =
          field[key] === undefined || field[key] === null
            ? ""
            : field[key] instanceof Date
            ? new Date(field[key])
                .toLocaleString()
                .split(" ")[0]
                .replace(",", "")
            : String(field[key]).replace(",", "");
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }

  exportReddemedCSV(dt: DataTable) {
    const fileName =
      "Membership Redeemption for " + this.reedemedTitle + ".csv";
    const exportColumns = [
      "guid",
      "firstName",
      "middleName",
      "lastName",
      "email",
      "company",
      "memberSince",
      "expiryDate",
      "membership",
      "primaryGroupCode",
      "amount",
      "paymentType",
      "dateProcessed",
      "sponsor",
      "promotionalCode",
      "emailBounced",
      "gender",
      "alternateEmails",
      "homePhoneAreaCode",
      "phone",
      "mobileAreaCode",
      "mobile",
      "professionalTitle",
      "employerPhoneAreaCode",
      "employerPhone"
    ];

    const updatedExportColumns = [
      "API_GUID",
      "First_Name",
      "Middle_Name",
      "Last_Name",
      "Email_Address",
      "Employer_Name",
      "Member_Sign_up",
      "Date_Membership_Expires",
      "Membership Type",
      "Primary_Group_Code",
      "Amount",
      "Payment_Type",
      "Processed_Date",
      "Sponsor",
      "Promotional_Code",
      "Email_Bounced",
      "Gender",
      "Email_Address_Alternate",
      "Home_Phone_Area_Code",
      "Home_Phone",
      "Mobile_Area_Code",
      "Mobile",
      "Professional_Title",
      "Employer_Phone_Area_Code",
      "Employer_Phone"
    ];

    let formmatedList = [];
    let dataTemp;
    dt.value.map((field, index) => {
      let keys = Object.keys(field);
      dataTemp = {};
      exportColumns.forEach((key, index) => {
        dataTemp[updatedExportColumns[index]] =
          (field[key] === field[key]) === undefined || field[key] === null
            ? ""
            : field[key] instanceof Date
            ? moment(field[key]).format("MM/DD/YYYY")
            : String(field[key]).replace(",", "");
      });
      formmatedList.push(dataTemp);
    });
    this.commonService.toCSV(formmatedList, fileName);
  }

  confirmation(rowData) {
    this.confirmHead = "Confirmation";
    this.confirmationService.confirm({
      message: "Do you want to remove this Sponsor?",
      accept: () => {
        this.loading = true;
        this.nationalService.deleteSponsor(rowData.id).subscribe(
          res => {
            let indexTemp = this.filteredsponsorshipData.findIndex(sponData => {
              return sponData.id == rowData.id;
            });
            let tempData = this.filteredsponsorshipData.slice();
            tempData.splice(indexTemp, 1);
            this.filteredsponsorshipData = tempData;
            this.loading = false;
            this.responseMessage(res);
          },
          error => {
            this.loading = false;
            this._notify.error("", error.message);
          }
        );
      }
    });
  }

  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (
      responseValue.responseStatus === "201" ||
      responseValue.responseStatus === "200"
    ) {
      this.displayDialog = false;
      this._notify.success("", responseValue.successDescription);
    } else if (responseValue.responseStatus === "500") {
      this.displayDialog = true;
      this.errorMessage = responseValue.errorDescrition;
    }
  }

  checkLengthOfCharacters(data) {
    if (data.textValue.length > 6000) {
      this.enable = false;
      this.pcTermsLengthError = "Proposed contract terms exceed the limit";
    } else {
      this.enable = true;
      this.pcTermsLengthError = "";
    }
  }
}
