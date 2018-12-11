import Student from "../models/Student";
import { IStudent } from "collections";
import { Db } from "mongodb";
import TheHuxleyService from "../services/theHuxley";

export default class StudentRepository {

    mongodb: Db;
    theHuxleyService: TheHuxleyService;

    constructor (mongodb: Db, theHuxleyService: TheHuxleyService) {
      this.mongodb = mongodb;
      this.theHuxleyService = theHuxleyService;
    }

    findAll(criteria: any): Promise<Array<Student>> {
        return this.mongodb.collection("students").find({}).toArray();
    }

    insertMany(students: IStudent[]) : Promise<any> {
        return this.mongodb.collection("students").insertMany(students);
    }

    deleteMany(criteria: any) {
        return this.mongodb.collection("students").deleteMany(criteria);
    }

    // findOne(studentId: string): Promise<Student> {
    //     let answers = [
    //         {
    //             theHuxleyId: '1',
    //             score: '10',
    //             code: 'string'
    //         },
    //         {
    //             theHuxleyId: '2',
    //             score: '9',
    //             code: 'string2'
    //         }
    //     ];
    //     let list = {
    //         _id: '3',
    //         theHuxleyId: '1',
    //         name: 'Prova 1',
    //         problems: [
    //             {
    //                 name: 'Questao 3',
    //                 theHuxleyId: '2'
    //             }
    //         ]
    //     };
    //     let listStub = new List(list);
    //     let report = {
    //         correction: [
    //             {
    //                 theHuxleyId: '1',
    //                 comment: 'mt top'
    //             }
    //         ],
    //         finalComment: 'passou!'
    //     };

    //     let reportStub = new Report(report);

    //     let submission = {
    //         _id: '3',
    //         list: listStub,
    //         report: reportStub,
    //         answers: answers
    //     };
    //     let submissionStub = new Submission(submission);
    //     let submissions: Submission[];
    //     submissions.push(submissionStub);
        
    //     return Promise.resolve();
    // }
    
    insertOne(student: IStudent): Promise<any> {
        return Promise.resolve();
    }

    // addSubmission(student: Student, submission: Submission): Promise<any> {
    //     return Promise.resolve();
    // }

    // addReport(stundent: Student, submission: Submission): Promise<any> {
    //     return Promise.resolve();
    // }
}