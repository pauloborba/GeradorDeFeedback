import { IList, IReport, ISubmission } from "collections";

export default class Submission {
    _id: string;
    list: IList;
    report: IReport;
    answers: {theHuxleyId: string, score: string, code: string} [];

    constructor({_id, list, report, answers}: ISubmission) {
        this._id = _id;
        this.list = list;
        this.report = report;
        this.answers = answers;
    }
}