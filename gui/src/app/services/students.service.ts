import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class StudentsService {

  constructor(private http: HttpClient, private auth: LoginService) { }

  getAllStudents(token): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get('/api/students', httpOptions).toPromise();
  }

  registerStudents(token: string, students: any[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post('/api/students', {
      students
    }, httpOptions).toPromise();
  }
}
