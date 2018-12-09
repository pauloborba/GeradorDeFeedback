import { IStudent } from '../types/collections'
import Student from '../models/Student';
import Submission from '../models/Submission'
import List from '../models/List';
import Report from '../models/Report';

export default class studentepository {
    students: Array<Student>;

    constructor(db: any) {
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
                        report: new Report({
                            correction: [
                                { comment: 'Muito bom', theHuxleyId: '001' },
                                { comment: 'Ta errado', theHuxleyId: '002' }
                            ],
                            finalComment: 'OK'
                        }),
                        answers: [
                            { 
                                theHuxleyId: '111',
                                score: '2',
                                code: ''
                            },
                            {
                                theHuxleyId: '222',
                                score: '1',
                                code: ''
                            }
                        ]
                    })
                ]
            }),
            new Student({
                _id: '1',
                theHuxleyName: 'Daniel Eduardo Fernando',
                login: 'def',
                submissions: [
                    new Submission({
                        _id: '2',
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
                        report: new Report({
                            correction: [
                                { comment: 'Muito bom', theHuxleyId: '111' },
                                { comment: 'Ta errado', theHuxleyId: '222' }
                            ],
                            finalComment: 'OK'
                        }),
                        answers: [
                            { 
                                theHuxleyId: '111',
                                score: '0',
                                code: ''
                            },
                            {
                                theHuxleyId: '222',
                                score: '0',
                                code: ''
                            }
                        ]
                    }),
                    new Submission({
                        _id: '3',
                        list: {
                            _id: '2',
                            name: 'Prova 2',
                            theHuxleyId: '321',
                            problems: [
                                {
                                    name: 'Questão 1',
                                    theHuxleyId: '001'
                                },
                                {
                                    name: 'Questão 2',
                                    theHuxleyId: '002'
                                },       
                            ]
                        },
                        report: null,
                        answers: [
                            { 
                                theHuxleyId: '001',
                                score: '1',
                                code: ''
                            },
                            {
                                theHuxleyId: '002',
                                score: '1',
                                code: ''
                            }
                        ]
                    }),

                ]
            })
        ]
    }

    findByName(name: string): Promise<Student> {
        return Promise.resolve(this.students.find(student => student.theHuxleyName == name));
    }

    getStudents(): Promise<Array<Student>> {
        return Promise.resolve(this.students);
    }
}