import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Card, Mastermind, Scheme, Villain, Hero } from '../models/card';
import { Deck } from '../models/deck';
import { bystander } from '../cards/bystanders';
import { master_strike } from '../cards/mastermind';

import { BoardService } from '../services/board.service';
import { BoxService } from '../services/box.service';

import { PlayCardsDialog } from '../dialogs/play-cards-dialog/play-cards.dialog';
import { CardsListDialog } from '../dialogs/cards-list-dialog/cards-list.dialog';
import { SelectWithRandomDialog } from '../dialogs/cards-list-dialog/select-with-random.dialog';
import { SelectGroupWithRandomDialog } from '../dialogs/cards-list-dialog/select-group-with-random.dialog';
import { EndGameDialog } from '../dialogs/end-game-dialog/end-game.dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

  private heroGroup: number;
  private villainGroup: number;
  private henchmanCards: number;
  private bystanders: number;
  private masterStrike: number;


  constructor(
    private dialog: MatDialog,
    public board: BoardService,
    public box: BoxService
  ) {
    this.numberCards('onePlayer');
    this.selectMastermind();
  }

  private numberCards(mode: string) {
    const modes = {
      onePlayer: [3, 1, 3, 1, 5],
      normal: [5, 1, 10, 2, 5],
      onBoard: [5, 2, 10, 10, 5]
    };
    [
      this.heroGroup,
      this.villainGroup,
      this.henchmanCards,
      this.bystanders,
      this.masterStrike
    ] = [...modes[mode]];

  }

  selectMastermind() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: this.box.mastermindBox.cards,
        header: 'Select Mastermind'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectMastermind();
      } else {
        this.board.mastermind = this.box.mastermindBox.pick(data.index)[0];
        this.board.mastermind.bystanders = [];
        this.board.mastermind.additionalCard = [];
        const alwaysLeads = this.board.mastermind.alwaysLeads;
        if ( alwaysLeads.group === 'villain') {
          const villains = this.box.villainsBox.pickByKey(alwaysLeads.name);
          villains.forEach(villain => { this.board.villainDeck.create(2, villain); });
        } else if (alwaysLeads.group === 'henchmen') {
          const villain = this.box.henchmenBox.pickByKey(alwaysLeads.name);
          this.board.villainDeck.create(10, villain);
        }
        this.selectScheme();
      }
    });
  }

  selectScheme() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: this.box.schemeBox.cards,
        header: 'Select Scheme'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectScheme();
      } else {
        this.board.scheme = this.box.schemeBox.pick(data.index)[0];
        this.selectVillains();
      }
    });
  }

  selectVillains() {
    const dialogRef = this.dialog.open(SelectGroupWithRandomDialog, {
      data: {
        array: Object.values(this.box.villainsBox.cards),
        header: 'Select Villain Group'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectVillains();
      } else {
        const villains = this.box.villainsBox.pick(data.index);
        villains.forEach(villain => { this.board.villainDeck.create(2, villain); });
        this.villainGroup--;
        if (this.villainGroup > 0) {
          this.selectVillains();
        } else {
          this.selectHenchman();
        }
      }
    });
  }

  selectHenchman() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: Object.values(this.box.henchmenBox.cards),
        header: 'Select Henchman Group'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectHenchman();
      } else {
        // add henchman
        this.board.villainDeck.create(this.henchmanCards, this.box.henchmenBox.pick(data.index));
        // add bystanders
        for (let i = 0; i < this.bystanders; i++) {
          this.board.villainDeck.put(this.board.bystandersDeck.draw());
        }
        // add masterStrike
        this.board.villainDeck.create(this.masterStrike, new master_strike);
        // scheme setup
        this.selectHero();

      }
    });
  }

  selectHero() {
    const dialogRef = this.dialog.open(SelectGroupWithRandomDialog, {
      data: {
        array: this.box.heroBox.cards,
        header: 'Select Heroses'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectHero();
      } else {
        const choosenGroup = this.box.heroBox.pick(data.index)[0];
        this.board.heroDeck.create(1, choosenGroup[0]);
        this.board.heroDeck.create(3, choosenGroup[1]);
        this.board.heroDeck.create(5, choosenGroup[2]);
        this.board.heroDeck.create(5, choosenGroup[3]);
        this.heroGroup--;
        if (this.heroGroup > 0) {
          this.selectHero();
        } else {
          const schemeSetupObs = this.board.scheme.setup(this.board, this.dialog, this.box);
          if (schemeSetupObs) {
            const schemeSetupSub = schemeSetupObs.subscribe(done => {
              if (done) {
                this.board.villainDeck.shuffle();
                this.board.heroDeck.shuffle();
                this.board.startObs.next(true);
                schemeSetupSub.unsubscribe();
              }
            });
          } else {
            this.board.villainDeck.shuffle();
            this.board.heroDeck.shuffle();
            this.board.startObs.next(true);
          }
        }
      }
    });
  }

  playerHand() { this.dialog.open(PlayCardsDialog); }
  viewCards(header: string, cards: Array<Card>) {
    this.dialog.open(CardsListDialog, { data: { header: header, array: cards } });
  }

  recruitShieldOfficer() {
    if (this.board.playerRecrutingPoints >= this.board.shieldDeck[0].cost) {
      this.board.playerRecrutingPoints -= this.board.shieldDeck[0].cost;
      this.board.discardPile.put(this.board.shieldDeck.draw());
    }
  }

  nextTurn() {
    if (this.board.playerCards.filter(card => card.type === 'wound').length === this.board.playerCards.length) {
      this.board.KO.put(this.board.playerCards.take());
    }
    this.board.playerAttack = 0;
    this.board.playerRecrutingPoints = 0;
    this.board.discardPile.put(this.board.playerHand.take().concat(this.board.playerCards.take()));
    this.board.playerDeck.numberOfDrawing = 0;
    this.board.drawToPlayerHand();
    this.board.drawVillainObs.next(true);
    this.board.cardsSubscription.forEach(sub => sub.unsubscribe());
    this.board.cardsSubscription = [];
  }

  attackMastermind() {
    if (this.board.playerAttack >= this.board.mastermind.attack + this.board.mastermind.additionalAttack) {
      this.board.playerAttack -= this.board.mastermind.attack + this.board.mastermind.additionalAttack;
      if (this.board.defeatMastermind(this.dialog)) {
        this.dialog.open(EndGameDialog, { data: { header: 'win' } }).afterClosed().subscribe(sub => {
          location.reload();
        });
      }
    }
  }

  ngOnInit() {
  }

}
