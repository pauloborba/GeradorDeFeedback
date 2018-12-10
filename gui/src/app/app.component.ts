import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoginService } from './services/login.service'
import { UserService } from './services/user.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  userName: string = ''; 
  
  constructor(
     private userService: UserService,
     private loginService: LoginService,
     private router: Router
   ) {}

   async ngOnInit() {
     let token = this.loginService.token 
     if (this.loginService.token) {
        this.userName = (await this.userService.getUserInfo(token)).username;
     }
   }

   async logout () {
    await this.loginService.logout();
    this.router.navigate(['login']);
   }

}
