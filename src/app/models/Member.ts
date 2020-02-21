import { Address } from './Address';
import { Employer } from './Employer';
import { MemberPersonalInfo } from './MemberPersonalInfo';
import { MemberOfficialDetails } from './MemberOfficialDetails';


export class Member {
	public apiGuid: string;
	public primaryGroupCode: string;
	public firstName: string;
	public middleName: string;
	public lastName: string;
	public nickName: string;
	public nameTitle: string;
	public namePrefix: string;
	public email: string;
	public status = true;
	public alternateEmails: string;
	public mobile: string;
	public expiryDate: Date;
	public lastRenewed: Date;
	public tenancyId: number;
    public forPaid = true;
    public address: Address;
    public employer: Employer;
    public personalInfo: MemberPersonalInfo;
    public officialDetails: MemberOfficialDetails;
}
