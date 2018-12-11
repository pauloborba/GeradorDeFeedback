
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { JWT_LOGIN_SECRET } from "../util/secrets";
import bcrypt from "bcrypt";
import crypto from "crypto";
import passport from 'passport';
import { IUser } from '../types/collections'
import { IVerifyOptions } from "passport-local";

import UserRepository from "../repositories/userRepository";
import User from "../models/User";

export default class AuthService {

    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    comparePassword(candidatePassword: string, userPassword: any, cb: (err: any, isMatch: any) => void): void {
        bcrypt.compare(candidatePassword, userPassword, (err: any, isMatch: boolean) => {
            cb(err, isMatch);
        });
    };

    async checkTokenMiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            const bearerHeader = req.headers.authorization;

            if (bearerHeader) {
                const bearer = bearerHeader.split(" ");
                const bearerToken = bearer[1];

                const authData: any = jwt.verify(bearerToken, JWT_LOGIN_SECRET);
                const foundUser = await this.userRepository.findOne({ _id: authData._id });
                req.authInfo = authData;
                if (foundUser) {
                    return next();
                }
                return res.status(500).send("User not found");
            }
            return res.status(401).send("You need to be logged in to that");
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    postLogin(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local", (err: Error, user: IUser, info: IVerifyOptions) => {
            if (err) { return next(err); }

            if (!user) {
                return res.status(401).json({ err: ["Invalid username or password"] });
            }

            const { _id, username } = user;
            const token = jwt.sign({ _id, username }, JWT_LOGIN_SECRET);
            res.status(200).json({ res: "You are logged in!", token });
        })(req, res, next);
    };

    async postSignUp(req: Request, res: Response, next: NextFunction) {
        // req.assert("email", "Email is not valid").isEmail();
        req.assert("username", "Username must be at least 4 characters long").len({ min: 4 });
        req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
        // req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
        // req.sanitize("email").normalizeEmail({ gmail_remove_dots: fnpalse });

        const errors = await req.getValidationResult();
        const errorsArray = errors.array().map((e) => e.msg);

        if (!errors.isEmpty()) {
            return res.status(422).json({ err: errorsArray });
        }

        const user: IUser = {
            username: req.body.username,
            password: req.body.password,
        };

        try {
            const existingUser = await this.userRepository.findOne({ username: req.body.username });

            if (existingUser) {
                return res.status(422).json({ err: ["Bot username already exists"] });
            }
            await this.userRepository.insertOne(user, true);
            res.status(200).json({ res: "User successfully registered" });
        } catch (err) {
            res.status(422).json({ err: ["Error saving/finding user"] });
        }
    }


}

