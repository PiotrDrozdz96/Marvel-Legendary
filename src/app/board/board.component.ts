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
      onePlayer: [3, 1, 3, 1, 1],
      normal: [5, 2, 10, 2, 5],
      onBoard: [5, 3, 10, 10, 5]
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
        array: this.box.villainsBox.cards,
        header: 'Select Villain Group'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectVillains();
      } else {
        const villains = this.box.villainsBox.pick(data.index)[0];
        villains.forEach(villain => { this.board.villianDeck.create(2, villain); });
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
        array: this.box.henchmenBox.cards,
        header: 'Select Henchman Group'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectHenchman();
      } else {
        // add henchman
        this.board.villianDeck.create(this.henchmanCards, this.box.henchmenBox.pick(data.index)[0]);
        // add bystanders
        for (let i = 0; i < this.bystanders; i++) {
          this.board.villianDeck.put(this.board.bystandersDeck.draw());
        }
        // add masterStrike
        this.board.villianDeck.create(this.masterStrike, new master_strike);
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
                this.board.villianDeck.shuffle();
                this.board.heroDeck.shuffle();
                this.board.startObs.next(true);
                schemeSetupSub.unsubscribe();
              }
            });
          } else {
            this.board.villianDeck.shuffle();
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
    this.board.drawToPlayerHand();
    this.board.drawVillainObs.next(true);
  }

  attackMastermind() {
    if (this.board.playerAttack >= this.board.mastermind.attack + this.board.mastermind.additionalAttack) {
      this.board.playerAttack -= this.board.mastermind.attack + this.board.mastermind.additionalAttack;
      const tactic = this.board.mastermind.tactics.splice(Math.floor(Math.random() * this.board.mastermind.tactics.length), 1);
      const tacticCard = Object.assign({}, this.board.mastermind);
      tacticCard.image = tactic[0].image;
      this.board.victoryPile.push(tacticCard);
      this.board.victoryPile.put(this.board.mastermind.bystanders);
      this.board.mastermind.bystanders = [];
      if (this.board.mastermind.tactics.length === 0) {
        this.dialog.open(EndGameDialog, { data: { header: 'win' } }).afterClosed().subscribe(sub => {
          location.reload();
        });
      } else {
        this.board.setKOimage(tactic[0].image);
        tactic[0].func(this.board, this.dialog, tactic[0]);
      }
    }
  }

  ngOnInit() {
  }

}
