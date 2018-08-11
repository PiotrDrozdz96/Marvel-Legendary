import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { LeaderBoards } from '../models/leaderboards';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB = 'https://api.mlab.com/api/1/databases/marvel-legendary/collections/leaderboards';
  readonly URL_MSG = 'https://api.mlab.com/api/1/databases/marvel-legendary/collections/messeges';
  readonly param = new HttpParams().set('apiKey', 'aWB04CMreTxIgNrhXTjunUFKThYS4LgK');
  private postStart = false;
  private postComplete = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, public router: Router) { }

  post(data: LeaderBoards) {
    if (!this.postStart) {
      this.postStart = true;
      this.http.post(this.URL_DB, data, { params: this.param }).subscribe(sub => {
        this.postComplete.next(true);
      });
    }
  }

  get() { return this.http.get(this.URL_DB, { params: this.param }); }

  reload() {
    this.postComplete.subscribe(complete => {
      if (complete) {
        this.router.navigate(['']);
        location.reload();
      }
    });
  }

  sendMessage(message) {
    return this.http.post(this.URL_MSG, message, { params: this.param });
  }

}
