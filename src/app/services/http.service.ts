import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { LeaderBoards } from '../models/leaderboards';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB = 'https://api.mlab.com/api/1/databases/marvel-legendary/collections/leaderboards';
  readonly param = new HttpParams().set('apiKey', 'aWB04CMreTxIgNrhXTjunUFKThYS4LgK');
  private postComplete = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  post(data: LeaderBoards) {
    this.http.post(this.URL_DB, data, { params: this.param }).subscribe(sub => {
      this.postComplete.next(true);
    });
  }

  get() { return this.http.get(this.URL_DB, { params: this.param }); }

  reload() {
    this.postComplete.subscribe(complete => {
      if (complete) {
        location.pathname = '/';
      }
    });
  }

}
