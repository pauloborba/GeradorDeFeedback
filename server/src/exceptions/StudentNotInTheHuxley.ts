export default class StudentNotInTheHuxleyException extends Error {
    constructor(name: string) {
        super(`No student found with name ${name}`);
    }

}