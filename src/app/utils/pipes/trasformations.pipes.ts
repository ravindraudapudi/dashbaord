import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

// formatting dynamic headers (sorting)
@Pipe({ name: 'dynamicHeaderSort' })
export class DynamicHeaderSort implements PipeTransform {
    transform(value: any): any {
        const mockFinalHeadValue = [];
        const c = Object.keys(value).length;
        for (let i = 0; i < c; i++) {
            mockFinalHeadValue.push({ field: Object.keys(value)[i], header: Object.values(value)[i] });
        }
        return mockFinalHeadValue;
    }
}

// formatting dynamic columns (sorting)
@Pipe({ name: 'dynamicColumnsSort' })
export class DynamicColumnsSort implements PipeTransform {
    transform(value: any): any {
        if (!value) return '';
        const mockFinalColValue = [];
        value.forEach((el, i) => {
            if(el.chapterName != 'Total'){
            mockFinalColValue.push(el);
            }
        });
        return mockFinalColValue;
    }
}

@Pipe({ name: 'removespace', pure: false })
export class RemoveSpace implements PipeTransform {
    transform(input: string): string {
        return input.length > 0 ? input.replace(/[\s+()\/\\#+()$~%.'":*<>{}]/g, '') : '';
    }
}

// formatting headers dropdown from CSVJSON
@Pipe({ name: 'dynamicHeaderDropDownCSV' })
export class DynamicHeaderDropDownCSV implements PipeTransform {
    transform(value: any): any {
        const finalHeaderCsv = [];
        value.forEach((el, i) => {
            finalHeaderCsv.push({ id: i, name: el.charAt(0).toUpperCase() + el.slice(1) });
        });
        return finalHeaderCsv;
    }
}

// formatting headers from CSVJSON
@Pipe({ name: 'dynamicHeaderCSV' })
export class DynamicHeaderCSV implements PipeTransform {
    transform(value: any): any {
        const finalHeaderCsv = [];
        value.forEach((el, i) => {
            finalHeaderCsv.push({ field: el, header: el.charAt(0).toUpperCase() + el.slice(1) });
        });
        finalHeaderCsv.push({ field: 'action', header: 'Action' });
        return finalHeaderCsv;
    }
}

// formatting columns from CSVJSON
@Pipe({ name: 'dynamicColumnsCSV' })
export class DynamicColumnsCSV implements PipeTransform {
    transform(value: any): any {
        const mockFinalColCsv = [];
        const val = JSON.parse(value);
        val.forEach(el => {
            el.action = true;
            mockFinalColCsv.push(el);
        });
        return mockFinalColCsv;
    }
}

// formatting data for Dropdown
@Pipe({ name: 'dropDownData' })
export class DropDownData implements PipeTransform {
    transform(value: any): any {
        const finalDropDownValue = [];
        value.forEach(el => {
            const objValue = Object.keys(el);
            objValue.forEach(obj => {
                if (obj === 'role') {
                    finalDropDownValue.push({ id: el.id, role: el.role });
                } else if (obj === 'chapterName') {
                    finalDropDownValue.push({ id: el.id, chapterName: el.chapterName, description: el.chapterName });
                }
            });
        });
        return finalDropDownValue;
    }
}



// formatting data to Update CSV Json element
@Pipe({ name: 'updateCSVJSONData' })
export class UpdateCSVJSONData implements PipeTransform {
    transform(value: any): any {
        let updateCsvJson = {};
        if (value.action === true) {
            updateCsvJson = { id: value.id, label: value.label, color: value.color, keyCode: value.keyCode };
        }
        return updateCsvJson;
    }
}

// formatting First Letter UpperCase of Each Word
@Pipe({ name: 'arrayFirstLetterUpperCase' })
export class ArrayFirstLetterUpperCase implements PipeTransform {
    transform(value: any, j: any): any {
        let lbl: string = value.roles[j];
        lbl = lbl.substring(0, 1).toUpperCase() + lbl.substring(1);
        return lbl;
    }
}

// formatting data for Member Snapshot Table
@Pipe({ name: 'membersDataSnapshot' })
export class MembersDataSnapshot implements PipeTransform {
    transform(value: any, setStatus: boolean = false): any {
        const finalMemberData = [];
        value.forEach(el => {
            const companyName = el.employer.name;
            const pTitle = el.officialDetails;
            const homeCity = el.homeAddress;
            let homePhoneAreaCode = el.homeAddress.homePhoneAreaCode;
            let eDate;
            let dDate;
            let st;
            let memberSignUp;
            let renewalDate;

            if (el.expiryDate != null) {
                eDate = new Date(el.expiryDate);
            }

            if (eDate != null) {
                if (moment().isBefore(eDate)) {
                    st = "ACTIVE";
                } else {
                    st = "EXPIRED";
                }
            } else {
                st = el.membership;
            }

            if (el.dateProcessed != null) {
                 dDate = new Date(el.dateProcessed);
            }

            if (el.registrationDate != null) {
                memberSignUp = new Date(el.registrationDate);
           }

           if (el.lastRenewed != null) {
            renewalDate = new Date(el.lastRenewed);
       }

           
            
        
            finalMemberData.push({
                guid: el.apiGuid,
                firstName: el.firstName, 
                middleName: el.middleName,
                lastName: el.lastName,
                email: el.email,
                company: companyName,
                memberSince: memberSignUp,
                expiryDate: eDate, 
                membership:el.membership,
                primaryGroupCode:el.primaryGroupCode,
                amount:el.amount,
                paymentType: el.paymentType,
                dateProcessed:dDate,
                sponsor:el.sponsor,
                promotionalCode:el.promotionalCode,
                emailBounced:el.emailBounced,
                gender:el.gender,
                alternateEmails: el.alternateEmails, 
                mobileAreaCode:el.mobileAreaCode,
                homePhoneAreaCode:homePhoneAreaCode,
                employerPhone:companyName.employerPhone || '',
                employerPhoneAreaCode:companyName.employerPhoneAreaCode || '',
                professionalTitle: pTitle.professionalTitle, 
                city: homeCity.city, 
                country: homeCity.country,
                status: st,
                mobile: el.mobile,
                phone: el.phone || '',
                lastFollowUp: el.lastUpdated,
                renewalDate: renewalDate,
                sponsershipCode: el.promotionalCode,
            });
        });
        return finalMemberData;
    }
}

@Pipe({ name: 'boardMembers' })
export class boardMembers implements PipeTransform {
    transform(value: any, setStatus: boolean = false): any {
        const finalMemberData = [];
        value.forEach(el => {

            let st ;
            if (el.expiryDate != null) {
                if (moment().isBefore(el.expiryDate)) {
                    st = "ACTIVE";
                } else {
                    st = "EXPIRED";
                }
            } else {
                st = el.membershipType;
            }

            finalMemberData.push({
                alternateEmail : el.alternateEmail,
                apiGuid: el.apiGuid,
                email: el.email,
                expiryDate : el.expiryDate,
                firstName :el.firstName,
                phone :el.phone,
                id : el.id,
                lastName: el.lastName,
                memberRole: el.memberRole,
                membershipType: el.membershipType,
                organisation: el.organisation,
                status : st,
                amount  : el.amount,
                emailBounced : el.emailBounced,
                employerName:el.employerName,
                employerPhone : el.employerPhone,
                employerPhoneAreaCode : el.employerPhoneAreaCode,
                gender : el.gender,
                homePhoneAreaCode : el.homePhoneAreaCode,
                memberSignup : el.memberSignup,
                middleName : el.middleName,
                mobile : el.mobile,
                mobileAreaCode : el.mobileAreaCode,
                paymentType : el.paymentType,
                primaryGroupCode : el.primaryGroupCode,
                processedDate : el.processedDate,
                professionalTitle : el.professionalTitle,
                sponsor : el.sponsor,
                promotionalCode : el.promotionalCode
            });
        });
        return finalMemberData;
    }
}
