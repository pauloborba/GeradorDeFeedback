import { IList } from '../types/collections'
import List from '../models/List' 

export default class listRepository {
    lists: Array<List>;

    constructor (db: any) {
        this.lists = [
            new List(
                { 
                    _id: '1',
                    name: 'Prova 1',
                    theHuxleyId: '123',
                    problems: [
                        {
                            name: 'Questão 1',
                            theHuxleyId: '111'
                        },
                        {
                            name: 'Questão 2',
                            theHuxleyId: '222'
                        },
                        
                    ]
                }
            ),
            new List(
                { 
                    _id: '2',
                    name: 'Prova 2',
                    theHuxleyId: '321',
                    problems: [
                        {
                            name: 'Questão 1',
                            theHuxleyId: '001'
                        },
                        {
                            name: 'Questão 2',
                            theHuxleyId: '002'
                        },
                        
                    ]
                }
            )
        ]
    }

    findByName(name : string): Promise<List> {
        return Promise.resolve(new List(this.lists.find(cur => cur.name === name)));
    }

    getLists(): Promise<Array<List>> {
        return Promise.resolve(this.lists);
    }
}