import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class StudentsService {

  constructor(private http: HttpClient, private auth: LoginService) { }

  getAllStudents(token): Promise<any> {
    return this.http.get('/api/students', this.getHeaderOptions(token)).toPromise();
  }

  registerStudents(token: string, students: any[]) {
    return this.http.post('/api/students', {
      students
    }, this.getHeaderOptions(token)).toPromise();
  }

  getHeaderOptions(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return httpOptions;
  }
}
