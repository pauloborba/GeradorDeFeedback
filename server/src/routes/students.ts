import { Request, Response, Express } from "express";
import AuthService from "../services/auth";
import StudentRepository from "../repositories/studentRepository";
import TheHuxleyService from "../services/theHuxley";
import { IStudent } from "collections";
import StudentNotInTheHuxleyException from "../exceptions/StudentNotInTheHuxley";
import StudentWithEmptyLoginException from "../exceptions/StudentWithEmptyLogin";
import StudentWithEmptyNameException from "../exceptions/StudentWithEmptyName";

export default function (authService: AuthService, studentRepository: StudentRepository, theHuxleyService: TheHuxleyService, app: Express) {
    
    app.get("/api/students", (req, res, next) => authService.checkTokenMiddleware(req, res, next), async (req: Request, res: Response) => {
        try {
            let all = await studentRepository.findAll({});

            res.status(200).json({
                status: "ok",
                students: all
            });

        } catch (err) {
            handleError(res, err);
        }
    });
    
    app.post("/api/students",  (req, res, next) => authService.checkTokenMiddleware(req, res, next), async(req: Request, res: Response) => {
        try {
            // console.log(req.body.students);
            await studentRepository.deleteMany({});
            await studentRepository.insertMany(req.body.students);
            res.status(200).json({
                status: "ok",
                message: "Students were registered successfully"
            });
        } catch (err) {
            handleError(res, err);
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
            handleError(res, err);
        }
    })

}

function getStatus(err: Error): number{
    const statuses: any = {
        "422": [StudentWithEmptyLoginException, StudentWithEmptyNameException],
        "404": [StudentNotInTheHuxleyException]
    }

    for(let key in statuses) {
        if(statuses[key].find((exc: any) => err instanceof exc)) {
            return parseInt(key);
        }
    }

    return 500;
}

function handleError(res: Response, err: Error) {
    let statusCode = getStatus(err);
    return res.status(statusCode).json({
        status: "error",
        message: err.message
    });
}