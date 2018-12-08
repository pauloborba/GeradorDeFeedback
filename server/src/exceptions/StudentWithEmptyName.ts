export default class StudentWithEmptyNameException extends Error {
    constructor() {
        super("Student missing TheHuxley's name");
    }

}