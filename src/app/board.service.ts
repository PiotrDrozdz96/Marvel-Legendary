import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private koImage = new BehaviorSubject<string>('');

  constructor() { }

  getKOimage(): Observable<string> { return this.koImage.asObservable(); }
  setKOimage(image: string): void {this.koImage.next(image); }
}
