import Student from "../models/Student";
import { IStudent } from "collections";
import Submission from "../models/Submission";
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

    findOne(studentId: string): Promise<Student> {
        return Promise.resolve(new Student({ theHuxleyName: "", login: "", submissions: []}));
    }
    
    insertOne(student: IStudent): Promise<any> {
        return Promise.resolve();
    }

    insertMany(students: IStudent[]) : Promise<any> {
        return this.mongodb.collection("students").insertMany(students);
    }
    addSubmission(student: Student, submission: Submission): Promise<any> {
        return Promise.resolve();
    }

    addReport(stundent: Student, submission: Submission): Promise<any> {
        return Promise.resolve();
    }
    deleteMany(criteria: any) {
        return this.mongodb.collection("students").deleteMany(criteria);
    }
}