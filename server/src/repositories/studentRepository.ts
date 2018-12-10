import Student from "../models/Student";
import { IStudent } from "collections";
import Submission from "../models/Submission";

export default class StudentRepository {

    // findAll(): Promise<Array<Student>> {
    //     return Promise.resolve([new Student()]);
    // }

    // findOne(studentId: string): Promise<Student> {
    //     return Promise.resolve(new Student());
    // }
    
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