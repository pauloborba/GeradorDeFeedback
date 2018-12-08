import { IUser } from "collections";

export default class User {
    _id: string;
    username: string;
    password: string;
    salt: string;
    isAdmin: boolean;
    name: string;
    status: string;

    constructor({ _id , username , password, salt, isAdmin, status, name}: IUser) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.isAdmin = isAdmin;
        this.status = status;
        this.name = name;
    }

    generateRandomPassword(passwordSize: number): string {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        if (passwordSize <= 0) return '';

        this.password = Array(passwordSize).fill(0).reduce(
            (acc, i) => acc + charset[Math.floor(Math.random() * charset.length)]
        , '');
        return this.password
    }
    
}