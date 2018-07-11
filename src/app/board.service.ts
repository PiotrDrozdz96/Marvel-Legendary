import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deck } from './models/deck';
import { Hero } from './models/card';
import { hero_shield_agent, hero_shield_trooper } from './cards/hero/shield';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private koImage = new BehaviorSubject<string>('');
  private playerDeck = new Deck<Hero>();

  constructor() {
    this.playerDeck.create(8, new hero_shield_agent);
    this.playerDeck.create(4, new hero_shield_trooper);
    this.playerDeck.shuffle();
  }

  getKOimage(): Observable<string> { return this.koImage.asObservable(); }
  setKOimage(image: string): void { this.koImage.next(image); }
}
