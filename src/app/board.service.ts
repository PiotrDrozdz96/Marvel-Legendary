import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deck } from './models/deck';
import { Hero, Scheme, Mastermind, Bystander } from './models/card';
import { hero_shield_agent, hero_shield_trooper, hero_shield_officer } from './cards/hero/shield';
import { scheme_legacy_virus } from './cards/scheme';
import { mastermind_magneto } from './cards/mastermind';
import { wound } from './cards/wounds';
import { bystander } from './cards/bystanders';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private koImage = new BehaviorSubject<string>('');
  private playerDeck = new Deck<Hero>();
  scheme: Scheme = new scheme_legacy_virus;
  mastermind: Mastermind = new mastermind_magneto;
  shieldDeck = new Deck<hero_shield_officer>();
  woundsDeck = new Deck<Hero>();
  bystandersDeck = new Deck<Bystander>();

  constructor() {
    this.shieldDeck.create(30, new hero_shield_officer);
    this.woundsDeck.create(30, new wound);
    this.bystandersDeck.create(30, new bystander);
    this.playerDeck.create(8, new hero_shield_agent);
    this.playerDeck.create(4, new hero_shield_trooper);
    this.playerDeck.shuffle();
  }

  getKOimage(): Observable<string> { return this.koImage.asObservable(); }
  setKOimage(image: string): void { this.koImage.next(image); }
}
