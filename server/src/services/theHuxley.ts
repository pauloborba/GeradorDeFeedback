import axios from "axios";
import moment from "moment";
import { thehuxley_username, thehuxley_password} from "../util/secrets";

export default class TheHuxleyService {
    authorization: any;
    
    constructor() {
        this.authorization = null;

    }

    login = async (): Promise<any> => {
        return new Promise((resolve, reject) => {
          if (!this.authorization || this.authorization.created_at + this.authorization.expires_in <= new Date().getTime()) {
            axios.post('https://www.thehuxley.com/api/login', {
              username: thehuxley_username,
              password: thehuxley_password,
            }).then((response: any) => {
              this.authorization = response.data;
              this.authorization.created_at = new Date().getTime();
              axios.defaults.headers.common.authorization = `Bearer ${this.authorization.access_token}`;
              resolve();
            }).catch((err: any) => reject(err));
          } else {
            resolve();
          }
        });
    }

    async getSubmissionCode(submissionID: string): Promise<any> {
      try {
        if (!this.authorization) await this.login();
        return axios.get(`https://www.thehuxley.com/api/v1/submissions/${submissionID}/sourcecode`);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    
    
    async getStudentSubmissions(problemID: string, userID: string): Promise<any> {
      try {
        if (!this.authorization) await this.login();
        return axios.get(`https://www.thehuxley.com/api/v1/submissions?problem=${problemID}&user=${userID}`);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    
    getSemester(date: any): number {
      if (moment(date).month() < 8) {
        return 0;
      }
      return 1;
    }

    hasValidEndDate(obj: any): boolean {
        const sameYear = moment().year() == moment(obj.endDate).year();
        const sameSemester = this.getSemester(Date.now()) == this.getSemester(obj.endDate);
        const hasEnded = moment() >= moment(obj.endDate);
        return sameYear && sameSemester && hasEnded;
    }

    // pega as listas e filtra, deixando apenas as listas do semestre atual e que já fecharam.

    async getFilteredLists(): Promise<any> {
      try {
        let lists = await this.getLists();
        console.log(lists);
        lists = lists.data.filter(this.hasValidEndDate);
        return Promise.resolve(lists);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }

    async getListProblems(listID: string): Promise<any> {
      try {
        if (!this.authorization) await this.login();
        return axios.get(`https://www.thehuxley.com/api/v1/quizzes/${listID}/problems?max=100&offset=0`);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    async getLists(): Promise<any> {
      try {
        if (!this.authorization) await this.login();
        return axios.get('https://www.thehuxley.com/api/v1/groups/194/quizzes?max=30&offset=0&order=desc&sort=startDate');
        } catch (err) {
        return Promise.reject(err);
        }
    }


    // Get user info by name returns:
    // {
    //     "id": 18153,
    //     "name": "Rafael Rodrigues da Silva",
    //     "avatar": "https://www.thehuxley.com/avatar/thumbs/826d8a16b1035c0e906d70cf09deb056cdb0936c.png",
    //     "institution": {
    //       "id": 48,
    //       "name": "Universidade Federal de Pernambuco",
    //       "acronym": "UFPE",
    //       "logo": "https://www.thehuxley.com/api/v1/institutions/logo/default.png",
    //       "status": "APPROVED"
    //     }
    //   }

    async getUserInfoByName(name: string) {
        try {
            if (!this.authorization) await this.login();
            const users = await axios.get('https://www.thehuxley.com/api/v1/groups/194/users?max=150');
            const user = users.data.find((user: any) => user.name === name);
            if (!user) throw new Error('No student found with this name.');
            return Promise.resolve(user);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}