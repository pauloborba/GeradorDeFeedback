import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  // styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {
  
    login = '';
    name = '';
    message: string = null;
    users: Array<any> = [];
  constructor(
    private auth: LoginService,
    private router: Router,
    private http: HttpClient
    ) { 

  }

  async ngOnInit() {
    await this.getAll()
  }

  async getAll() {
    return this.http.get('/api/users', {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${this.auth.token}`
        })
    })
        .toPromise()
        .then((body: Array<any>) => this.users = body);
  }

  async sendRegisterUser() {
    try {
        const res: any = await this.registerUser();
        this.message = res.message;
        await this.getAll()
    } catch (err) {
        console.log(err)
    }
  }

  registerUser() {
    return this.http.post('/api/users/invite', JSON.stringify( {
        username: this.login,
        name: this.name
        }), {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${this.auth.token}`
        }),
    })
    .toPromise()
  }



}
