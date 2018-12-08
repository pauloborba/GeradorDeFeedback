import Student from "../models/Student";
import User from "../models/User";

export default class MailService {

    sendReport(to: Student, content: any): Promise<any> {
        return Promise.resolve();
    }

    sendInvite(data: any): Promise<any> {
        return Promise.resolve(
            data
        );
    }
}