import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  err = '';
  constructor(private auth: LoginService,
    private router: Router) { 

  }

  ngOnInit() {
    if (this.auth.token) {
      this.router.navigate([''])
    }
  }

  async login() {
    try {
      await this.auth.login({username: this.username, password: this.password});
      this.router.navigateByUrl('');
    } catch (err) {
      console.log(err);
      // this.err = err.error.err[0];
    }
  }

}
