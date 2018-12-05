import { IUser } from "collections";

export default class User {
    _id: string;
    username: string;
    password: string;
    salt: string;

    constructor({ _id , username , password, salt}: IUser) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.salt = salt;
    }
    
}