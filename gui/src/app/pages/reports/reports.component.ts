import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportComponent implements OnInit {
  
    lists: Array<any> = [];
    message: Map<string, string> = new Map<string, string>();

  constructor(
    private auth: LoginService,
    private http: HttpClient
    ) { }

    async ngOnInit() {
        await this.getSubmissions();
    }

    getSubmissions(): Promise<any> {
        return this.http.get('/api/lists/relatorio', {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.auth.token}`
            })
        })
        .toPromise()
        .then((lists: Array<any>) => this.lists = lists)
    }

    sendList(list: any): Promise<any> {
        return this.http
            .post('/api/lists/send', { id: list.listId }, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.auth.token}`
                })
            })
            .toPromise()
            .then((body: any) => this.message[list.listId] = body.message)
            .catch(err => {
                if(err.status == 400) {
                    this.message[list.listId] = err.error.message
                }
            })
    }


}
