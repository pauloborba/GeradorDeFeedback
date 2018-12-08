import { Request, Response, Express } from "express";
import User from '../models/User'
import { IUser } from '../types/collections'
import AuthService from "../services/auth";
import UserRepository from "../repositories/userRepository";
import MailService from "../services/mail";
import { body } from "express-validator/check";


export default function (authService: AuthService, userRepository: UserRepository, mailService: MailService, app: Express) {

    app.get("/", function (req: Request, res: Response) {
        res.json({ status: 'ok' });
    });

    app.post("/api/login", (req, res, next) => authService.postLogin(req, res, next));
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
                return res.status(500).json({ err: 'server_error' })
            }


            if (foundUser) {
                return res.status(200).json(foundUser)
            } else {
                return res.status(404).json({ err: "user_not_found" })
            }

        });

    app.get("/api/users",
        (req, res, next) => authService.checkTokenMiddleware(req, res, next),
        (req, res) => userRepository.getAll().then(body => res.status(200).json(body))

    )
    app.post("/api/users/invite",
        (req, res, next) => authService.checkTokenMiddleware(req, res, next),
        async (req: Request, res: Response) => {
            try {
                const currentUser = <User> await userRepository.findOne({ _id: req.authInfo._id })
                const newUser: IUser = {
                    username: req.body.username,
                    password: '',
                    status:'Pendente',
                    name: req.body.name
                }
                const mailData = await userRepository.inviteUser(newUser, currentUser)
                if (mailData.type !== 'unauthorized') {
                    await mailService.sendInvite(mailData)

                    return res.status(200).json({
                        status: 'ok',
                        message: `Invite succesfully sent to email ${newUser.username}@cin.ufpe.br`
                    })

                } else {
                    return res.status(401).json(mailData)
                }
            } catch (err) {
                console.log(err)
                return res.status(500).json({ err: err.message })
            }

        }
    )
}