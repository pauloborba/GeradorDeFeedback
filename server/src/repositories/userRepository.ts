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
      password: user.password,
      status: user.status,
      name: user.name
    } 

    return this.mongodb.collection("users").updateOne({username: updatedUser.username}, { $set: updatedUser });
  }

  async inviteUser(user: IUser, currentUser: User): Promise<any> {
    if (!currentUser.isAdmin) {
      return { type: 'unauthorized', message: 'Você não tem permissão para convidar usuários'}
    }
  
    const createdUser = new User(user)
    const password = createdUser.generateRandomPassword(8)
    
    const emailData = {
      to: `${user.username}@cin.ufpe.br`,
      password,
    }

    const dbUser: IUser = {
      username: createdUser.username,
      password: createdUser.password,
      status: "Pendente",
      name: createdUser.name
    }
    await this.insertOne(dbUser, true)
    return emailData
  }

  async insertOne(user: IUser, hashPassword: true): Promise<any> {
    
    if (hashPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt, undefined);
      user.password = hash;
      user.salt = salt;
    }

    const createdUser: IUser = {
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
      status: user.status,
      name: user.name
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
        .then((user) => user ? new User(<IUser> user) : null);
    }
  }

  isAlreadyRegistered(login: string) {
    return false
  }
  
  async getAll() {
    return this.mongodb.collection("users").find({}).toArray();
  }

  async deleteAccount (userId: string) {
    return this.mongodb.collection("users").deleteOne({_id: new ObjectId(userId) });
  }
}
