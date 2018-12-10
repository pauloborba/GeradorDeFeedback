import Student from "../models/Student";
import User from "../models/User";

export default class MailService {

    sendReport(content: any): Promise<any> {
        console.log('send', content);
        return Promise.resolve();
    }

    sendInvite(data: any): Promise<any> {
        return Promise.resolve(
            data
        );
    }
}