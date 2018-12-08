import Student from "../models/Student";
import { IStudent } from "collections";
import Submission from "../models/Submission";
import { Db } from "mongodb";
import TheHuxleyService from "../services/theHuxley";
import StudentWithEmptyLoginException from "../exceptions/StudentWithEmptyLogin";
import StudentWithEmptyNameException from "../exceptions/StudentWithEmptyName";

export default class StudentRepository {
    mongodb: Db;
    theHuxleyService: TheHuxleyService;

    constructor (mongodb: Db, theHuxleyService: TheHuxleyService) {
      this.mongodb = mongodb;
      this.theHuxleyService = theHuxleyService;
    }

    async findAll(criteria: any): Promise<Array<Student>> {
        try {
            const students = await this.mongodb.collection("students").find({}).toArray();
            return Promise.resolve(students.map((student) => new Student(student)));
        } catch (err) {
            throw err;
        }
    }

    findOne(studentId: string): Promise<Student> {
        return Promise.resolve(new Student({ theHuxleyName: "", login: "", submissions: []}));
    }
    
    insertOne(student: IStudent): Promise<any> {
        return Promise.resolve();
    }

    async insertMany(students: IStudent[]) : Promise<any> {
        try {

            students.forEach(student => {
                if(!student.theHuxleyName){
                    throw new StudentWithEmptyNameException();
                }
                if(!student.login) {
                    throw new StudentWithEmptyLoginException(student.theHuxleyName);
                } 
            });

            await Promise.all(students.map(async (student) => {
                await this.theHuxleyService.getUserInfoByName(student.theHuxleyName);
            }))
            return this.mongodb.collection("students").insertMany(students);
        } catch (err) {
            throw err;
        }
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