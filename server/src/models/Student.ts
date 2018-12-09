import { IStudent, ISubmission } from "collections";

export default class Student implements IStudent {
    _id: string;
    theHuxleyName: string;
    login: string;
    submissions: ISubmission[];

    constructor({_id, theHuxleyName, login, submissions} : IStudent) {
        this._id = _id;
        this.theHuxleyName = theHuxleyName;
        this.login = login;
        this.submissions = submissions;
    }
}