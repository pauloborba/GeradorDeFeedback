import { Request, Response, Express } from "express";
import AuthService from "../services/auth";
import StudentRepository from "../repositories/studentRepository";

export default function (studentRepository: StudentRepository, app: Express) {
    app.get("/api/getstudents",
    async (req: Request, res: Response) => {
    // (req, res, next) => authService.checkTokenMiddleware(req, res, next),
        console.log('iae');
        try{
            let students = await studentRepository.findAll({});
            console.log(students);
            res.status(200).json({success: students});
        } catch (err) {
            return res.status(500).json({ err: err });
        }
        });

    app.get("/ola", async (req: Request, res: Response) => {
        console.log('ola');
        res.status(200).json({success: 'olal'});
    });
}