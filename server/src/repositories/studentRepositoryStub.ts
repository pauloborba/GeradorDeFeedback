import { IStudent } from '../types/collections'
import Student from '../models/Student';
import Submission from '../models/Submission'
import List from '../models/List';

export default class studentepository {
    students: Array<Student>;

    constructor() {
        this.students = [
            new Student({
                _id: '1',
                theHuxleyName: 'Arthur Barros Cardoso',
                login: 'abc',
                submissions: [
                    new Submission({
                        _id: '1',
                        list: {
                            _id: '1',
                            name: 'Prova 1',
                            theHuxleyId: '123',
                            problems: [
                                {
                                    name: 'Questão 1',
                                    theHuxleyId: '111'
                                },
                                {
                                    name: 'Questão 2',
                                    theHuxleyId: '222'
                                },       
                            ]
                        },
                        report: null,
                        answers: [
                            { 
                                theHuxleyId: '1',
                                score: '2',
                                code: ''
                            }
                        ]
                    })
                ]
            })
        ]
    }

    findByName(name: string): Promise<Student> {
        return Promise.resolve(this.students.find(student => student.theHuxleyName == name));
    }

    getLists(): Promise<Array<Student>> {
        return Promise.resolve(this.students);
    }
}