import { Request, Response, Express } from "express";
import AuthService from "../services/auth";
import listRepository from "../repositories/listRepository";
import TheHuxleyService from "../services/theHuxley";
import List from "../models/List"


export default function (authService: AuthService, theHuxleyService: TheHuxleyService, listRepository: listRepository, app: Express) {
    app.get("/api/list",
    // (req, res, next) => authService.checkTokenMiddleware(req, res, next),
    async (req: Request, res: Response) => {
        await theHuxleyService.getLists()
            .then((data: any) => {
                let foundList = data.data.filter((list: any) => {
                    return (list.title == req.query.list);
                });
                if (req.query.student || req.query.question) {
                theHuxleyService.getListProblems(foundList[0].id)
                    .then((data: any) => {
                        let foundProblem = data.data.filter((problem: any) => {

                            return (problem.name == req.query.question);
                        });
                        if (foundProblem.length == 1) {
                            theHuxleyService.getUserInfoByName(req.query.student)
                                .then((data: any) => {
                                    theHuxleyService.getListProblems(foundList[0].id)
                                        .then((data: any) => {
                                            console.log(data);
                                            return res.status(200).json({ 'success': data });
                                        }).catch((err: any) => {
                                            return res.status(500).json({ err: err });
                                        })
                                }).catch((err: any) => {
                                    return res.status(500).json({ err: err });
                                })
                        }
                    }).catch((err:any) => {
                        return res.status(500).json({ err: err });
                    })
                } else {
                    return res.status(200).json({ 'success': foundList });
                }
            }).catch((err: any) => {
                console.log(err);
                return res.status(500).json({ err: err });
            });
    })
}