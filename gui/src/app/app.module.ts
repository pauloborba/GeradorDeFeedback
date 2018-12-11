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
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { StudentComponent } from './pages/student/student.component';
import { ProblemsComponent } from './pages/problems/problems.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListComponent,
    StudentComponent,
    ProblemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: '', component: HomeComponent, canActivate: [AuthGuard] },
      {path: 'lists', component: ListComponent, canActivate: [AuthGuard]},
      {path: 'lists/:id/students', component: StudentComponent, canActivate: [AuthGuard]},
      {path: 'lists/:listId/student/:studentId/problems', component: ProblemsComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [LoginService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
