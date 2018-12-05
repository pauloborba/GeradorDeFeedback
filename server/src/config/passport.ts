import passport from "passport";
import passportLocal from "passport-local";

import { Request, Response, NextFunction } from "express";
import { Db } from "mongodb";
import { IUser } from "collections";
import AuthService from "../services/auth";
import UserRepository from "../repositories/userRepository";

const LocalStrategy = passportLocal.Strategy;

export function setupPassport(userRepository: UserRepository, authService: AuthService) {
    passport.serializeUser<any, any>((user: any, done: Function) => {
        done(undefined, user.id);
      });

    passport.deserializeUser((id: any , done: Function) => {
        userRepository.findOne({_id: id }, (err: any, user: IUser) => {
          done(err, user);
        });
    });

    /**
     * Sign in using Username and Password.
     */
    passport.use(new LocalStrategy({ usernameField: "username" }, (username: string, password: string, done: Function) => {
        userRepository.findOne({username: username.toLowerCase()} , (err: any, user: IUser) => {
                if (err) { return done(err); }

                if (!user) {
                    return done(undefined, false, { message: `Username not found.` });
                }

                authService.comparePassword(password, user.password, (err: any, isMatch: boolean) => {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(undefined, user);
                    }
                    return done(undefined, false, { message: "Invalid email or password." });
                });
            });
    }));
}

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};