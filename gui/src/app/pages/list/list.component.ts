import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  lists: Array<any> = [];

    constructor(
      private auth: LoginService,
      private http: HttpClient,
      private router: Router
    ) { }

  async ngOnInit() {
    await this.getLists();
  }

  getLists(): Promise<any> {
    return this.http.get('/api/lists', {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${this.auth.token}`
        })
    })
    .toPromise()
    .then((body: any) => this.lists = body.success)
}

}
