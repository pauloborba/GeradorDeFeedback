export interface IUser {
    _id?: string;
    isAdmin?: boolean;
    username: string;
    password: string;
    salt?: string;
}

export interface IList {
    _id?: string;
    theHuxleyId: string;
    name: string;
    problems: { name: string, theHuxleyId: string } [];
}

export interface ISubmission { // Submissão da Lista toda (não de código especifico)
    _id?: string;
    list: IList;
    report: IReport;
    answers: {theHuxleyId: string, score: string, code: string} [];
}

export interface IReport {
    correction: {theHuxleyId: string, comment: string } [];
    finalComment: string;
}

export interface IStudent {
    _id?: string;
    theHuxleyName: string;
    login: string;
    submissions: Array<ISubmission>
}