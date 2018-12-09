
import { IReport } from "collections";

export default class Report {
    correction: {theHuxleyId: string, comment: string} [];
    finalComment: string;

    constructor({correction, finalComment}: IReport) {
        this.correction = correction;
        this.finalComment = finalComment;
    }
}