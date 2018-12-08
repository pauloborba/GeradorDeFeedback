import Student from "../models/Student";
import { IStudent } from "collections";
import Submission from "../models/Submission";
import { Db } from "mongodb";

export default class StudentRepository {
    mongodb: Db;

    constructor (mongodb: Db) {
      this.mongodb = mongodb;
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
}