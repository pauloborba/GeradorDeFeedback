import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(token):  Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get('/api/me', httpOptions).toPromise();
  }

}
