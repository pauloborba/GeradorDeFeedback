import List from "../models/List";
import { IList } from "collections";

export default class listRepository {
    findOne(): Promise<List> {
        let list = {
            _id: '3',
            theHuxleyId: '1',
            name: 'Prova 1',
            problems: [
                {
                    name: 'Questao 3',
                    theHuxleyId: '2'
                }
            ]
        };
        let listStub = new List(list);
        return Promise.resolve(listStub);
    }

}