import { IList } from "collections";

export default class List {
    _id: string;
    theHuxleyId: string;
    name: string;
    problems: { name: string, theHuxleyId: string } [];

    constructor({ _id, theHuxleyId, name, problems }: IList) {
        this._id = _id;
        this.theHuxleyId = theHuxleyId;
        this.name = name;
        this.problems = problems;

    }
}