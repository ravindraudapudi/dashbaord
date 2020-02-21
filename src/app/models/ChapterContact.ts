export class ChapterContact {

    id: number;
    fullName: string;
    chapterRole: string;
    company: string;
    companyRole: string;
    email: string;
    phone: string;
    other: string;

    constructor(id?: number, fullName?: string, chapterRole?: string,company?: string,companyRole?: string,email? :string , phone?:string,other?:string) {
        this.id = id;
        this.fullName = fullName;
        this.chapterRole = chapterRole;
        this.email = email;
        this.phone = phone;
        this.other =other;
    }
}