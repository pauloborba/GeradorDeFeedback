import Student from "../models/Student";
import { IStudent } from "collections";
import Submission from "../models/Submission";
import Report from "../models/Report";
import List from "../models/List";

export default class StudentRepository {

    // findAll(): Promise<Array<Student>> {
    //     return Promise.resolve([new Student()]);
    // }

    findOne(studentId: string): Promise<Student> {
        let answers = [
            {
                theHuxleyId: '1',
                score: '10',
                code: 'string'
            },
            {
                theHuxleyId: '2',
                score: '9',
                code: 'string2'
            }
        ];
        let list = {
            _id: '3',
            theHuxleyId: '1',
            name: 'Prova 1',
            problems: [
                {
                    name: 'Questao 3',
                    theHuxleyId: '2'
                }
            ]
        };
        let listStub = new List(list);
        let report = {
            correction: [
                {
                    theHuxleyId: '1',
                    comment: 'mt top'
                }
            ],
            finalComment: 'passou!'
        };

        let reportStub = new Report(report);

        let submission = {
            _id: '3',
            list: listStub,
            report: reportStub,
            answers: answers
        };
        let submissionStub = new Submission(submission);
        let submissions: Submission[];
        submissions.push(submissionStub);
        
        return Promise.resolve(new Student({_id: '3', theHuxleyName: 'valdemar', login: 'valdema', submissions}));
    }
    
    insertOne(student: IStudent): Promise<any> {
        return Promise.resolve();
    }

    addSubmission(student: Student, submission: Submission): Promise<any> {
        return Promise.resolve();
    }

    addReport(stundent: Student, submission: Submission): Promise<any> {
        return Promise.resolve();
    }
}