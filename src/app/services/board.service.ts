import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { Deck } from '../models/deck';
import { Card, Hero, Scheme, Mastermind, Bystander, Villain } from '../models/card';
import { Field } from '../models/field';

import { hero_shield_agent, hero_shield_trooper, hero_shield_officer } from '../cards/hero/shield';
import { wound } from '../cards/wounds';
import { bystander } from '../cards/bystanders';
import { EndGameDialog } from '../dialogs/end-game-dialog/end-game.dialog';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private koImage = new BehaviorSubject<string>('');
  public startObs = new BehaviorSubject<boolean>(false);
  public drawVillainObs = new BehaviorSubject<boolean>(false);
  public defeatedVillainObs = new BehaviorSubject<any>(undefined);
  public cardsSubscription: Array<Subscription> = [];

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
  scheme: Scheme;
  villainDeck = new Deck<Card | Villain | Bystander>();
  heroDeck = new Deck<Hero>();

  escapedVillain = new Deck<Villain | Bystander>();

  fields = [
    new Field('serwers'),
    new Field('bank'),
    new Field('rooftops'),
    new Field('streets'),
    new Field('bridge')
  ];

  constructor() {
    /* change method draw in playerDeck*/
    this.playerDeck.draw = (): Array<Hero> => {
      if (this.playerDeck.length === 0) {
        this.discardPile.shuffle();
        this.playerDeck.put(this.discardPile.take());
      }
      const newCard = this.playerDeck.shift();
        this.playerDeck.numberOfDrawing++;
        return newCard === undefined ? [] : [newCard];
    };
    this.playerDeck.reveal = (): Hero => {
      if (this.playerDeck.length === 0) {
        this.discardPile.shuffle();
        this.playerDeck.put(this.discardPile.take());
      }
      return this.playerDeck[0];
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
  start(): Observable<boolean> { return this.startObs.asObservable(); }
  drawVillain(): Observable<boolean> { return this.drawVillainObs.asObservable(); }
  defeatedVillain(): Observable<any> { return this.defeatedVillainObs.asObservable(); }
  drawToPlayerHand() {
    for (let i = 0; i < this.numberOfDrawing; i++) {
      this.playerHand.put(this.playerDeck.draw());
    }
    this.numberOfDrawing = 6;
  }

  checkPlayedCards(param: string, arg: string): boolean {
    return this.playerCards.some(card => card[param] === arg);
  }

  moveVillains(card: Villain, dialog: MatDialog) {
    let freePlaceIndex = this.fields.findIndex(field => field.card === null);
    if (freePlaceIndex !== 0) {
      if (freePlaceIndex === -1) {
        if (this.fields[4].card.escape) {
          this.fields[4].card.escape(this, dialog);
        }
        this.escapedVillain.put([this.fields[4].card]);
        this.escapedVillain.put(this.fields[4].bystanders);
        freePlaceIndex = 4;
      }
      for (freePlaceIndex; freePlaceIndex > 0; freePlaceIndex--) {
        this.fields[freePlaceIndex].card = this.fields[freePlaceIndex - 1].card;
        this.fields[freePlaceIndex].bystanders = this.fields[freePlaceIndex - 1].bystanders;
        this.fields[freePlaceIndex - 1].bystanders = [];
      }
    }
    this.fields[0].card = card;
    if (this.fields[0].card.ambush) {
      this.fields[0].card.ambush(this, dialog);
    }
  }

  defeatMastermind(dialog: MatDialog) {
    const tactic = this.mastermind.tactics.splice(Math.floor(Math.random() * this.mastermind.tactics.length), 1);
    const tacticCard = Object.assign({}, this.mastermind);
    tacticCard.image = tactic[0].image;
    this.victoryPile.push(tacticCard);
    this.victoryPile.put(this.mastermind.bystanders);
    this.mastermind.bystanders = [];
    if (this.mastermind.tactics.length === 0) {
      return true;
    } else {
      this.setKOimage(tactic[0].image);
      tactic[0].func(this, dialog, tactic[0]);
    }
    this.defeatedVillainObs.next(tactic[0]);
  }

  defeatVillain(index: number, dialog: MatDialog) {
    const card = this.fields[index].card;
    this.setKOimage('');
    this.victoryPile.push(card);
    this.victoryPile.put(this.fields[index].bystanders);
    this.fields[index].card = null;
    this.fields[index].bystanders = [];
    if (card.fight) {
      card.fight(this, dialog);
    }
    this.defeatedVillainObs.next(card);
  }

}
