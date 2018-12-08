import { Request, Response, Express } from "express";
import AuthService from "../services/auth";
import StudentRepository from "../repositories/studentRepository";
import TheHuxleyService from "../services/theHuxley";
import { IStudent } from "collections";

export default function (authService: AuthService, studentRepository: StudentRepository, theHuxleyService: TheHuxleyService, app: Express) {
    
    app.get("/api/students", (req, res, next) => authService.checkTokenMiddleware(req, res, next), async (req: Request, res: Response) => {
        try {
            let all = <IStudent[]>await studentRepository.findAll({});

            res.status(200).json({
                status: "ok",
                students: all
            });
            
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message
            })
        }
    });
    
    app.post("/api/students",  (req, res, next) => authService.checkTokenMiddleware(req, res, next), async(req: Request, res: Response) => {
        try {
            console.log(req.body.students);
            await studentRepository.deleteMany({});
            await studentRepository.insertMany(req.body.students);
            res.status(200).json({
                status: "ok",
                message: "Students were registered successfully"
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message
            })
        }
    });
    
    app.get("/api/student", async(req: Request, res: Response) => {
        try {
            const name = req.query.name;
            const info = await theHuxleyService.getUserInfoByName(name);
            res.status(200).json({
                status: "ok",
                student: info
            });
        } catch (err) {
            res.status(404).json({
                status: "error",
                message: err.message
            })
        }
    })
}