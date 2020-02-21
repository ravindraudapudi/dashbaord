// import { Role } from './role';
import { Chapter } from './chapter';

export class User {

    public id: number;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public username: string;
    public password: string;
    // public emailId: string;
    // public emailPassword: string;
    public roles: string;
    public designation: string;
    public chapters: Chapter;
    public status = true;
    public createdBy?: string;
    public createdDate?: any;
    public updatedBy?: string;
    public updatedDate?: any;
}
