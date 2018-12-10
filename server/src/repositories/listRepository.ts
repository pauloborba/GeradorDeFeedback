import List from "../models/List";
import { IList } from "collections";
import { Db } from "mongodb";
import TheHuxleyService from "../services/theHuxley";

export default class listRepository {

    mongodb: Db;
    theHuxleyService: TheHuxleyService;

    constructor (mongodb: Db, theHuxleyService: TheHuxleyService) {
      this.mongodb = mongodb;
      this.theHuxleyService = theHuxleyService;
    }

    findAll(criteria: any): Promise<Array<List>> {
        return this.mongodb.collection("lists").find({}).toArray();
    }

    insertMany(lists: IList[]) : Promise<any> {
        return this.mongodb.collection("lists").insertMany(lists);
    }

    deleteMany(criteria: any) {
        return this.mongodb.collection("students").deleteMany(criteria);
    }


}