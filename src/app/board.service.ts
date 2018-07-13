import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Deck } from './models/deck';
import { Hero, Scheme, Mastermind, Bystander, CardInVillainDeck, Villain } from './models/card';

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
  public startObs = new BehaviorSubject<boolean>(false);

  private playerDeck = new Deck<Hero>();
  private playerHand = new Deck<Hero>();
  private discardPile = new Deck<Hero>();

  shieldDeck = new Deck<hero_shield_officer>();
  woundsDeck = new Deck<Hero>();
  bystandersDeck = new Deck<Bystander>();
  mastermind: Mastermind;
  scheme: Scheme;
  villianDeck = new Deck<CardInVillainDeck>();
  heroDeck = new Deck<Hero>();

  escapedVillian = new Deck<Villain>();

  constructor() {
    /* SET UP */
    /*********/
    /* 1. player deck*/
    this.playerDeck.create(8, new hero_shield_agent);
    this.playerDeck.create(4, new hero_shield_trooper);
    this.playerDeck.shuffle();
    /* 2. shield, bystanders, wounds deck */
    this.shieldDeck.create(30, new hero_shield_officer);
    this.bystandersDeck.create(30, new bystander);
    this.woundsDeck.create(30, new wound);
    /* 3. select mastermind */
      /* inside board.component, selectMastermind.dialog */
    /* 4. select scheme */
      /* inside board.component, selectScheme.dialog */
    /* 5. villain deck*/
      /*  number of schemeTwist described in scheme */
      /* a. 3 villain group 8*3=24 cards*/
      /* b. 1 henchmen group 10 cards*/
      /* c. 10 bystanders */
      /* d. 5 masterStrike */
      /* shuffle deck */
  }

  getKOimage(): Observable<string> { return this.koImage.asObservable(); }
  setKOimage(image: string): void { this.koImage.next(image); }
  start(): Observable<boolean> {return this.startObs.asObservable(); }
}
