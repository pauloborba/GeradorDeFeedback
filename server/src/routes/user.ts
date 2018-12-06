import { Request, Response, Express } from "express";
import AuthService from "../services/auth";
import UserRepository from "../repositories/userRepository";

export default function (authService: AuthService, userRepository: UserRepository, app: Express) {
    
    app.get("/", function(req: Request, res: Response) {
        res.json({ status: 'ok'});
    });

    app.post("/api/login",  (req, res, next) => authService.postLogin(req, res, next));
    app.post("/register", (req, res, next) => authService.postSignUp(req, res, next));
    app.get("/api/me", 
        (req, res, next) => authService.checkTokenMiddleware(req, res, next), 
        async (req: Request, res: Response) => {
            const findData = {
                _id: req.authInfo._id
            }
            
            let foundUser = null;
            try {
                foundUser = await userRepository.findOne(findData)
            } catch (err) {
                return res.status(500).json({ err: 'server_error'})
            }

            
            if (foundUser) {
                return res.status(200).json(foundUser)
            } else {
                return res.status(404).json({ err: "user_not_found"})
            }

        });
}