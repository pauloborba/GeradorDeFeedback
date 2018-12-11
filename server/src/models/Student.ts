import { IStudent } from "collections";
import Submission from './Submission'

export default class Student {
    _id: string;
    theHuxleyName: string;
    login: string;
    submissions: Array<Submission>

    constructor({ _id, theHuxleyName, login, submissions }: Student) {
        this._id = _id;
        this.theHuxleyName = theHuxleyName;
        this.login = login;
        this.submissions = submissions;
    }
}