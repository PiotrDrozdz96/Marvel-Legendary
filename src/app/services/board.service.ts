import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { HttpService } from './http.service';

import { Deck } from '../models/deck';
import { Card, Hero, Scheme, Mastermind, Bystander, Villain } from '../models/card';
import { Field } from '../models/field';
import { LeaderBoards } from '../models/leaderboards';

import { hero_shield_agent, hero_shield_trooper, hero_shield_officer } from '../cards/hero/shield';
import { wound } from '../cards/wounds';
import { bystander } from '../cards/bystanders';
import { EndGameDialog } from '../dialogs/end-game-dialog/end-game.dialog';
import { SelectDialog } from '../dialogs/cards-list-dialog/select.dialog';
import { BoxService } from './box.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private koImage = new BehaviorSubject<string>('');
  public startObs = new BehaviorSubject<boolean>(false);
  public drawVillainObs = new BehaviorSubject<boolean>(false);
  public defeatedVillainObs = new BehaviorSubject<any>(undefined);
  public cardsSubscription: Array<Subscription> = [];

  public leaderboards =  new LeaderBoards();

  playerDeck = new Deck<Hero>();
  playerHand = new Deck<Hero>();
  playerCards = new Deck<Hero>();
  copiedCards = new Deck<Hero>(); // rogue
  discardPile = new Deck<Hero>();
  playerAttack = 0;
  playerRecrutingPoints = 0;
  numberOfDrawing = 6;
  healing = true;

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

  constructor(public http: HttpService) {
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
    this.discardPile.put = (arr: Array<Hero>, notCardEffect?: boolean): void => {
      let discard = true;
      if (!notCardEffect && arr.length === 1 && arr[0].discard) {
        discard = arr[0].discard(this, arr[0]);
      }
      if (discard) {
        this.discardPile.push(...arr);
      }
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

  }

  reload = () => this.http.reload();
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
    return this.playerCards.concat(this.copiedCards).some(card => card[param] === arg);
  }

  moveVillains(card: Villain, dialog: MatDialog) {
    let freePlaceIndex = this.fields.findIndex(field => field.card === null);
    if (freePlaceIndex !== 0) {
      if (freePlaceIndex === -1) {
        if (this.fields[4].card.escape) {
          this.fields[4].card.escape(this, dialog);
        }
        KO(this);
        this.escapedVillain.put([this.fields[4].card]);
        if (this.fields[4].bystanders.length > 0) {
          this.escapedVillain.put(this.fields[4].bystanders);
          discard(this);
        }
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

    function KO(board: BoardService) {
      dialog.open(SelectDialog, {
        data: {
          array: board.hq.filter(hero => hero.cost <= 6),
          header: 'KO hero from HQ'
        }
      }).afterClosed().subscribe(choosen => {
        if (choosen === undefined) {
          KO(board);
        } else {
          const index = board.hq.findIndex(hero => hero === choosen.card);
          board.KO.put(board.hq.pick(index));
          board.hq.put(board.heroDeck.draw());
        }
      });
    }

    function discard(board: BoardService) {
      dialog.open(SelectDialog, {
        data: {
          array: board.playerHand,
          header: 'Put card on discard Pile'
        }
      }).afterClosed().subscribe(choosen => {
        if (choosen === undefined) {
          discard(board);
        } else {
          board.discardPile.put(board.playerHand.pick(choosen.index));
        }
      });
    }
  }

  defeatMastermind(dialog: MatDialog) {
    this.healing = false;
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
    this.healing = false;
    const card = this.fields[index].card;
    this.setKOimage('');
    if (card.fight) {
      card.fight(this, dialog);
    }
    this.victoryPile.push(card);
    if (this.fields[index].card === card) {
      this.victoryPile.put(this.fields[index].bystanders);
      this.fields[index].card = null;
      this.fields[index].bystanders = [];
    }
    this.defeatedVillainObs.next(card);
  }

}
