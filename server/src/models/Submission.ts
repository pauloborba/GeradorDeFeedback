import { ISubmission, IList } from '../types/collections'
import List from './List'
import Report from './Report'

export default class Submission {
    _id: string;
    list: List;
    report: Report;
    answers: {theHuxleyId: string, score: string} [];

    constructor({_id, list, report, answers}: ISubmission) {
        this._id = _id;
        this.list = new List(list);
        this.report = report;
        this.answers = answers;
    }   
}