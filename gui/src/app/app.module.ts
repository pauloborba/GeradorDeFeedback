import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component'
import { RegisterComponent } from './pages/registro/registro.component'
import { ReportComponent } from './pages/reports/reports.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: '', component: HomeComponent, canActivate:[AuthGuard]},
      {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
      {path: 'report', component: ReportComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [LoginService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
