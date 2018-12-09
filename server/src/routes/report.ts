import { Request, Response, Express } from "express";
import AuthService from "../services/auth";
import listRepository from "../repositories/listRepositoryStub";
import StudentRepository from "../repositories/studentRepositoryStub";
import UserRepository from "../repositories/userRepository";
import User from '../models/User'
import MailService from "../services/mail";

export default function (authService: AuthService, 
    listRepository: listRepository, 
    studentRepository: StudentRepository, 
    userRepository: UserRepository, 
    mailService: MailService,
    app: Express) {
    
    
    app.get('/api/lists/relatorio', 
        (req, res, next) => authService.checkTokenMiddleware(req, res, next),
        async (req, res, next) => {
            const currentUser = <User> await userRepository.findOne({
                _id: req.authInfo._id
            })

            if (currentUser.isAdmin) {
                const lists = await listRepository.getLists();
                const students = await studentRepository.getStudents();

                const returnList = lists.map(
                    list => {
                        const submissions = students
                            .map(
                                student => {
                                    const submission = student.submissions.find(
                                        submission => submission.list.theHuxleyId === list.theHuxleyId 
                                    )
                                    return submission ? { 
                                        studentLogin: student.login,
                                        hasReport: submission.report != null,
                                        submissionId: submission._id
                                    } : null
                                }
                            )
                            .filter(submission => submission)

                        return {
                            listName: list.name,
                            listId: list._id,
                            submissions: [...submissions]
                        }
                    }
                )

                res.json(returnList)
            } else {
                return res.status(401).json({ type: 'unauthorized', message: 'Você não tem permissão para convidar usuários'})
            }
        } 
    )

    app.post("/api/lists/send", 
        (req, res, next) => authService.checkTokenMiddleware(req, res, next),
        async (req, res) => {
            const id = req.body.id;
            if (id) {
                const students = await studentRepository.getStudents();

                const list = await listRepository.getLists()
                    .then(lists => lists.find(list => id == list._id));

                const submissions = students
                    .map(
                        student => {
                            const submission = student.submissions.find(
                                submission => submission.list.theHuxleyId === list.theHuxleyId 
                            )
                            return submission ? { 
                                studentLogin: student.login,
                                report: submission.report,
                                submissionId: submission._id
                            } : null
                        }
                    )
                    .filter(submission => submission)
                
                submissions.forEach(mailService.sendReport)
                
                return res.status(200).json(
                    {
                        status: 'ok',
                        message: "Relatórios enviados com sucesso"
                    }
                )
            } else {
                return res.status(400);
            }
    })
}