import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  students: Array<any> = [];
  listId: string;

  constructor(
    private auth: LoginService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getStudents();
    this.listId = this.route.snapshot.paramMap.get('id');
    console.log(this.listId);
  }

  getStudents(): Promise<any> {
    return this.http.get('/api/getstudents', {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.auth.token}`
      })
  })
  .toPromise()
  .then((body: any) => this.students = body.success)
  }

}
