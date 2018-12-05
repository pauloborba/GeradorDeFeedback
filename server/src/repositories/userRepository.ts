import bcrypt from "bcrypt";
import crypto from "crypto";
import { Db, ObjectId } from "mongodb";
import { IUser } from "../types/collections";
import User from "../models/User";

export default class UserRepository {
  
  mongodb: Db;

  constructor (mongodb: Db) {
    this.mongodb = mongodb;
  }

  async updateOne (user: User): Promise<any> {
    
    const updatedUser: IUser = {
      username: user.username,
      password: user.password
    } 

    return this.mongodb.collection("users").updateOne({username: updatedUser.username}, { $set: updatedUser });
  }

  async insertOne (user: IUser, hashPassword: true): Promise<any> {
    
    if (hashPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt, undefined);
      user.password = hash;
      user.salt = salt;
    }

    const createdUser: IUser = {
      username: user.username,
      password: user.password
    }

    return this.mongodb.collection("users").insertOne(createdUser)
  }

  findOne (criteria: any, callback?: any): Promise<User> | void {
    const searchQuery: any = {};
    
    if (criteria._id) {
      searchQuery['_id'] = new ObjectId(criteria._id);
    }

    if (criteria.username) {
      searchQuery['username'] = criteria.username;
    }

    if (callback) {
      return this.mongodb.collection("users").findOne(searchQuery, callback);
    } else {
      return this.mongodb.collection("users").findOne(searchQuery)
        .then((user: IUser) => user ? new User(user) : null);
    }
  }


  async deleteAccount (userId: string) {
    return this.mongodb.collection("users").remove({_id: new ObjectId(userId) });
  }
}
