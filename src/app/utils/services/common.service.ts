import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../../common/auth/services/auth.constant';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import * as _ from 'underscore';
import 'rxjs/Rx';
import { catchError, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class CommonService {
    REPORTING_DATE_KEY = 'REPORTING_DATES';
    reportingDateSub: Observable<any>;
    jwtHelper: JwtHelperService = new JwtHelperService();
    createChapter: boolean;
    headers: any;
    body: any;
    _RDate_Subject: BehaviorSubject<string>;
    public reportingDateList;

    public RDate_Observable: Observable<string>;

    public username: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public currentFiscalYear: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public code;
    public selectedTab;
    public title;
    public selctedChapterCode;
    public selctedChapterName;
    public tokenStore;
    public tokenCheck = false;
    private http;
    tokenObj: { 'username': any; 'createChapter': any; };

    constructor(private httpclient: HttpClient) {
        this.username = new BehaviorSubject<string>(null);
        this.code = new BehaviorSubject<string>(null);
        this.selectedTab = new BehaviorSubject<string>(null);
        this.selctedChapterCode = new BehaviorSubject<string>(null);
        this.selctedChapterName = new BehaviorSubject<string>(null);
        this.tokenStore = new BehaviorSubject<string>(null);
        this.http = httpclient;
        this._RDate_Subject = new BehaviorSubject<string>('');
        this.reportingDateList = new BehaviorSubject<any>(null);
        this.RDate_Observable = this._RDate_Subject.asObservable();
    }

    /*
    * For updating Reporting Date across components
    */
    public setReportingDate(rDate: string): void {
        this._RDate_Subject.next(rDate);
    }

    /**
     * To set the username/email after successfull login
     * @param title username
     */
    public setUsername(title: string) {
        this.username.next(title);
    }

    /**
     * To get the username/email to display on header at app component
     */
    public getUsername(): any {
        return this.username;
    }

    /**
     * To set the tab id at national-chome component
     * @param key selected tab name in subMenu navigation
     */
    public setTabKey(key) {
        this.selectedTab.next(key);
    }

    /**
     * To get the tab id at national-ch-dashboard component
     */
    public getTabKey(): Observable<any> {
        return this.selectedTab.asObservable();
    }

    public setChapterFromDropdown(chapterCode: string) {
        this.code.next(chapterCode);
    }

    public getChapterFromDropdown(): any {
        return this.code;
    }

    // Passing the selected primaryGroupCode from national-ch-dashbaord to national-chome component
    // using BehaviorSubject
    /**
     * setting parimaryGroupCode in national-ch-dashbaord component
     * @param key primaryGroupCode
     */
    public setChapterCode(key) {
        this.selctedChapterCode.next(key);
    }

    /**
     * getting parimaryGroupCode in national-chome component
     */
    public getChapterCode(): Observable<any> {
        return this.selctedChapterCode.asObservable();
    }

    // Passing the selected primaryGroupCode from national-ch-dashbaord to national-chome component
    // using BehaviorSubject
    /**
     * setting parimaryGroupCode in national-ch-dashbaord component
     * @param key primaryGroupCode
     */
    public setChapterName(key) {
        this.selctedChapterName.next(key);
    }

    /**
     * getting parimaryGroupCode in national-chome component
     */
    public getChapterName(): Observable<any> {
        return this.selctedChapterName.asObservable();
    }
    /**
 * To set the username/email after successfull login
 * @param title username
 */
    public setCurrentFiscalYear(currentFiscalYear: string) {
        this.currentFiscalYear.next(currentFiscalYear);
    }

    /**
     * To get the username/email to display on header at app component
     */
    public getCurrentFiscalYear(): any {
        return this.currentFiscalYear;
    }

    /**
    * Retriving Chapter Creation privilege by token
    */
    getGrantedPrivileges(): Observable<any> {
        return this.grantedPrivileges();
    }

    grantedPrivileges() {
        const ac = localStorage.getItem(TOKEN_NAME);
        const decodedToken = this.jwtHelper.decodeToken(ac);
        const tokenObj = {
            'username': decodedToken.user_name,

            // common Privieleges
            'export': decodedToken.authorities.some(el => el === 'Export Charts and Reports'),
            'upload': decodedToken.authorities.some(el => el === 'Allow Upload files'),
            'createChapter': decodedToken.authorities.some(el => el === 'Allow Chapter Creation'),
            'createUser': decodedToken.authorities.some(el => el === 'Allow User Creation'),
            'setGoal': decodedToken.authorities.some(el => el === 'Allow User to Set a Goal'),
            'setFy': decodedToken.authorities.some(el => el === 'Allow User to Set a Fy Data'),
            'setUpPipeline': decodedToken.authorities.some(el => el === 'Set up Pipeline stages'),
            'sendMail': decodedToken.authorities.some(el => el === 'Allow User to Send an Email'),

            // chapter Privileges
            'viewOverview': decodedToken.authorities.some(el => el === 'View Overview'),
            'viewMemberships': decodedToken.authorities.some(el => el === 'View Memberships'),
            'viewSocialMedia': decodedToken.authorities.some(el => el === 'View Social Media'),
            'viewDetailMetrics': decodedToken.authorities.some(el => el === 'View Detail Metrics'),
            'viewRevenue': decodedToken.authorities.some(el => el === 'View Revenue'),

            'viewBoardMember': decodedToken.authorities.some(el => el === 'View Board Members'),
            'manageBoardMembers': decodedToken.authorities.some(el => el === 'Manage Board Members'),

            'viewNationalSponsor': decodedToken.authorities.some(el => el === 'View  National Sponsors'),
            'manageNationalSponsor': decodedToken.authorities.some(el => el === 'Manage National Sponsors'),

            'viewNationalOpportunities': decodedToken.authorities.some(el => el === 'View  National Opportunities'),
            'manageNationalOpportunities': decodedToken.authorities.some(el => el === 'Manage National Opportunities'),

            'viewChapterSponsor': decodedToken.authorities.some(el => el === 'View Chapter Sponsors'),
            'manageChapterSponsor': decodedToken.authorities.some(el => el === 'Manage Chapter Sponsors'),

            'viewChapterOpportunities': decodedToken.authorities.some(el => el === 'View Chapter Opportunity'),
            'manageChapterOpportunities': decodedToken.authorities.some(el => el === 'Manage Chapter Opportunity'),

            'deleteNationalOpportunity': decodedToken.authorities.some(el => el === 'Delete National Opportunity'),
            'deleteChapterOpportunity': decodedToken.authorities.some(el => el === 'Delete Chapter Opportunity'),

            // National Privileges
            'NationalView': decodedToken.authorities.some(el => el === 'National View'),
            'viewTotalActiveMembers': decodedToken.authorities.some(el => el === 'View Total active members'),
            'viewPaidMembers': decodedToken.authorities.some(el => el === 'View Paid members'),
            'viewNationalSponsoredMembers': decodedToken.authorities.some(el => el === 'View National sponsored members'),
            'viewLocalSponsoredMembers': decodedToken.authorities.some(el => el === 'View Local sponsored members'),
            'viewTotalrevenue': decodedToken.authorities.some(el => el === 'View Total revenue'),
        };
        this.tokenStore.next(tokenObj);
        this.tokenCheck = true;
        return this.tokenStore.asObservable();
    }

    reset() {
        this.tokenCheck = false;
    }


    /**
* export chart as .png
*/
    downloadChart(id, value) {
        const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        const nameValue = value.title + ' (' + value.heading + ').png';
        if (isIEOrEdge) {
            html2canvas(document.getElementById(id), { width: 500, height: 500 })
                .then((canvas) => {
                    const imgageData = canvas.toDataURL('image/png');
                    const newData = imgageData.replace(/^data:image\/png/, 'data:application/octet-stream');
                    saveAs(newData, nameValue);
                });
        } else {
            domtoimage.toBlob(document.getElementById(id))
                .then(function (blob) {
                    saveAs(blob, nameValue);
                });
        }
    }

    toCSV(data: Array<any>, fileName: string): String {

        const NEW_LINE = '\n';
        if (data && data.length === 0) return 'No Data!';
        let csv = _.keys(data[0]).toString() + NEW_LINE;
        data.forEach(rowObj => {
            if (_.isEmpty(rowObj)) return;
            csv = csv + _.values(rowObj).toString() + NEW_LINE;
        });

        this.downloadCSV(csv, fileName.trim());
        return csv;
    }

    downloadCSV(data: string, fileName: string) {
        var blob = new Blob([data], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', fileName);
                link.click();
            }
            else {
                let csv = 'data:text/csv;charset=utf-8,' + data;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }

    public getReportingDates(): Observable<any> {
        const crDate = moment().format('MM-DD-YYYY');
        return this.http.get(environment.apiGetAllReportingDates, {
            headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME))
        }).pipe(tap((dates: any) => {
            this.setCurrentFiscalYear(dates.fiscaYear);
            return dates;
        }),
            catchError(apiError => {
                return throwError(apiError);
            })
        );
    }

    public transformRDates(dates: any[]): any[] {
        const reportingDates = [];
        const crDate = moment().format('MM-DD-YYYY');
        if (dates) {
            dates.forEach(log => {
                const dt = moment(log.reportingDate).format('MM-DD-YYYY');
                const items = _.where(reportingDates, { code: dt });
                if (items.length === 1 && items[0].docType != log.docType) {
                    items[0].isPartial = false;
                } else if (items.length === 0) {
                    reportingDates.push({ label: dt, code: dt, docType: log.docType, reportingDate: log.reportingDate, isPartial: true });
                }
            });
        }
        if (reportingDates.length === 0) {
            reportingDates.push({ label: crDate, code: crDate });
        }
        return reportingDates;
    }


    downloadCSVFile(dt: any, fileName: string) {

        const exportColumns = ['guid', 'firstName', 'middleName',
            'lastName', 'email', 'company', 'memberSince',
            'expiryDate', 'membership', 'primaryGroupCode', 'amount', 'paymentType', 'dateProcessed', 'sponsor',
            'promotionalCode', 'emailBounced', 'gender',
            'alternateEmails', 'homePhoneAreaCode', 'phone',
            , 'mobileAreaCode', 'mobile', 'professionalTitle',
            'employerPhoneAreaCode', 'employerPhone'
        ];

        const UpdatedExportColumns = ['API_GUID', 'First_Name', 'Middle_Name',
            'Last_Name', 'Email_Address', 'Employer_Name', 'Member_Sign_up', 'Date_Membership_Expires',
            'Membership Type', 'Primary_Group_Code', 'Amount', 'Payment_Type', 'Processed_Date', 'Sponsor',
            'Promotional_Code', 'Email_Bounced', 'Gender',
            'Email_Address_Alternate', 'Home_Phone_Area_Code', 'Home_Phone',
            , 'Mobile_Area_Code', 'Mobile', 'Professional_Title',
            'Employer_Phone_Area_Code', 'Employer_Phone'
        ];

        let formmatedList = [];
        let dataTemp;
        let dtTemp = dt.value.slice();
        dt.value.map((field, index) => {
            let keys = Object.keys(field);
            dataTemp = {};
            exportColumns.forEach((key, index) => {
                dataTemp[UpdatedExportColumns[index]] = field[key] === undefined || field[key] === null ? '' :
                 field[key] instanceof Date ? moment(field[key]).format('YYYY/MM/DD').toString() : String(field[key]).replace(',', '');
            });
            formmatedList.push(dataTemp);
        });
        this.toCSV(formmatedList, fileName);
    }
}
