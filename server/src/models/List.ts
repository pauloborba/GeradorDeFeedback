import { IList } from '../types/collections'

export default class List {
    _id: string;
    theHuxleyId: string;
    name: string;
    problems: {name:string, theHuxleyId:string} [];
    
    constructor({_id, theHuxleyId, name, problems} : IList) {
        this._id = _id;
        this.theHuxleyId = theHuxleyId;
        this.name = name;
        this.problems = problems;
    }

    getProblemByName = (problemName : string): any => {
        let problem = this.problems.find(cur => cur.name == problemName);
        return problem;
    }

    getProblemByID = (theHuxleyId : string) : any => {
        let problem = this.problems.find(cur => cur.theHuxleyId === theHuxleyId);
        return problem;
    }   
}