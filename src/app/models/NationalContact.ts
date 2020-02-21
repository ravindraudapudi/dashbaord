export class NatioalContact {
    id : number ;
    contactName: string;
    role : string;
    email: string;
    phone : string;
    other : string;

    constructor(id? : number, contactName?: string,role?:string,email?:string,phone?:string,other?:string){
        this.id = id;
        this.contactName = contactName;
        this.role = role;
        this.email= email;
        this.phone = phone;
        this.other = other;    
    }
}