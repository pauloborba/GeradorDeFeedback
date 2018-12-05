import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private userService: UserService) { }

  async login({username, password}) {
    const loginInfo: any = await this.http.post('/api/login', { username, password }).toPromise();
    this.token = loginInfo.token;
    const userInfo: any = await this.userService.getUserInfo(this.token);
    this.user = userInfo;
  }

  async isLoggedIn() {
    if (this.token) {
      try {
        await this.userService.getUserInfo(this.token);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  }

  set token(token){
    localStorage.setItem('gn_token', token);
  }

  get token(){
    return localStorage.getItem('gn_token');
  }

  set user(user){
    localStorage.setItem('gn_user', JSON.stringify(user));
  }

  get user(){
    return JSON.parse(localStorage.getItem('gn_user'));
  }

  logout() {
    localStorage.removeItem('gn_token');
    localStorage.removeItem('gn_user');
  }
}
