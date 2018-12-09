export default class StudentWithEmptyLoginException extends Error {
    constructor(name: string) {
        super(`Student ${name} is missing login`);
    }

}