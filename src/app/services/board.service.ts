import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Deck } from '../models/deck';
import { Card, Hero, Scheme, Mastermind, Bystander, Villain } from '../models/card';

import { hero_shield_agent, hero_shield_trooper, hero_shield_officer } from '../cards/hero/shield';
import { wound } from '../cards/wounds';
import { bystander } from '../cards/bystanders';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private koImage = new BehaviorSubject<string>('');
  public drawVillainObs = new BehaviorSubject<boolean>(false);
  public startObs = new BehaviorSubject<boolean>(false);

  playerDeck = new Deck<Hero>();
  playerHand = new Deck<Hero>();
  playerCards = new Deck<Hero>();
  discardPile = new Deck<Hero>();
  playerAttack = 0;
  playerRecrutingPoints = 0;
  numberOfDrawing = 6;

  victoryPile = new Deck<Villain | Bystander | Mastermind>();
  KO = new Deck<Card>();
  hq = new Deck<Hero>();
  shieldDeck = new Deck<hero_shield_officer>();
  woundsDeck = new Deck<Hero>();
  bystandersDeck = new Deck<Bystander>();
  mastermind: Mastermind;
  mastermindBystanders: Array<Bystander> = [];
  scheme: Scheme;
  villianDeck = new Deck<Card | Villain | Bystander>();
  heroDeck = new Deck<Hero>();

  escapedVillain = new Deck<Villain>();

  fields = [
    {
      place: 'sewers',
      card: null,
      bystanders: [],
      attack: 0
    },
    {
      place: 'bank',
      card: null,
      bystanders: [],
      attack: 0
    },
    {
      place: 'rooftops',
      card: null,
      bystanders: [],
      attack: 0
    },
    {
      place: 'streets',
      card: null,
      bystanders: [],
      attack: 0
    },
    {
      place: 'bridge',
      card: null,
      bystanders: [],
      attack: 0
    }
  ];

  constructor() {
    /* change method draw in playerDeck*/
    this.playerDeck.draw = (): Array<Hero> => {
      if (this.playerDeck.length === 0) {
        this.discardPile.shuffle();
        this.playerDeck.put(this.discardPile.take());
      }
      const newCard = this.playerDeck.shift();
      return newCard === undefined ? [] : [newCard];
    };
    /* SET UP */
    /*********/
    /* 1. player deck*/
    this.playerDeck.create(8, new hero_shield_agent);
    this.playerDeck.create(4, new hero_shield_trooper);
    this.playerDeck.shuffle();
    this.drawToPlayerHand();
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
  drawVillain(): Observable<boolean> { return this.drawVillainObs.asObservable(); }
  start(): Observable<boolean> { return this.startObs.asObservable(); }
  drawToPlayerHand() {
    for (let i = 0; i < this.numberOfDrawing; i++) {
      this.playerHand.put(this.playerDeck.draw());
    }
    this.numberOfDrawing = 6;
  }

  checkPlayedCards(param: string, arg: string): boolean {
    return this.playerCards.some(card => card[param] === arg);
  }

}
