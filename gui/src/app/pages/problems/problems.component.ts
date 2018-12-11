import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html'
})
export class ProblemsComponent implements OnInit {
  studentId: string;
  listId: string;
  problems: Array<any> = [];


  constructor(
    private auth: LoginService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.listId = await this.route.snapshot.paramMap.get('listId');
    this.studentId = await this.route.snapshot.paramMap.get('studentId');
    await this.getProblems(this.listId);
  }

  getProblems(listId): Promise<any> {
    return this.http.get(`/api/list/${listId}/problems`, {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.auth.token}`
      })
  })
  .toPromise()
  .then((body: any) => this.problems = body.success)
  }

}
