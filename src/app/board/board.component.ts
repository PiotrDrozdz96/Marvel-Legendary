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
import { EndGameDialog } from '../dialogs/end-game-dialog/end-game.dialog';
import { PlayerNameDialog } from '../dialogs/player-name-dialog/player-name.dialog';
import { TextDialog } from '../dialogs/text.dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

  public run: boolean;

  constructor(
    private dialog: MatDialog,
    public board: BoardService,
    public box: BoxService
  ) {
    this.box.numberPlayers(1);
    setTimeout(() => {
      this.createPlayer();
    }, 2000);
    const Sub = board.start().subscribe(sub => {
      this.run = sub;
      if (sub) {
        Sub.unsubscribe();
      }
    });
    board.villainsRunsOut().subscribe(runsOut => {
      if (runsOut === 1) {
        this.board.escapedVillain.put(this.board.mastermind.bystanders);
        this.board.mastermind.bystanders = [];
        this.dialog.open(TextDialog, {data: {
          h1: 'HARRY UP!',
          h2: 'Mastermind try escape'
        }}).afterClosed().subscribe(sub => {
          this.board.mastermind.masterStrike(this.board, this.dialog);
        });
      } else if (runsOut === 2) {
        this.board.leaderboards.win = true;
        this.dialog.open(EndGameDialog, { data: { header: 'mastermindEscaped' } }).afterClosed().subscribe(sub => {
          this.board.reload();
        });
      }
    });
  }

  ngForArray(number: number): Array<any> { return new Array(number); }

  createPlayer() {
    const dialogRef = this.dialog.open(PlayerNameDialog);
    dialogRef.afterClosed().subscribe(sub => {
      if (this.board.leaderboards.name === '') {
        this.board.leaderboards.name = 'Anonim';
      }
      this.selectMastermind();
    });
  }

  selectMastermind() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: Object.values(this.box.mastermindBox.cards),
        header: 'Select Mastermind'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectMastermind();
      } else {
        this.board.leaderboards.mastermind = this.box.mastermindBox.key(data.index);
        this.board.mastermind = this.box.mastermindBox.pick(data.index);
        this.board.mastermind.bystanders = [];
        this.board.mastermind.additionalCard = [];
        this.box.alwaysLeads(this.board.mastermind.alwaysLeads);
        this.selectScheme();
      }
    });
  }

  selectScheme() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: Object.values(this.box.schemeBox.cards),
        header: 'Select Scheme'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectScheme();
      } else {
        this.board.leaderboards.scheme = this.box.schemeBox.key(data.index);
        this.board.scheme = this.box.schemeBox.pick(data.index);
        this.box.alwaysLeads(this.board.scheme.alwaysLeads);
        this.selectVillains();
      }
    });
  }

  selectVillains() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: Object.values(this.box.villainsBox.cards),
        header: 'Select Villain Group'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectVillains();
      } else {
        const villains = this.box.pick('villains', data.index);
        villains.forEach(villain => { this.board.villainDeck.create(2, villain); });
        if (this.box.villainsGroup > 0) {
          this.selectVillains();
        } else {
          this.selectHenchman();
        }
      }
    });
  }

  selectHenchman() {
    if (this.box.henchmenGroup > 0) {
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
          this.board.villainDeck.create(10, this.box.pick('henchmen', data.index)[0]);
          this.selectHenchman();
        }
      });
    } else {
      // add bystanders
      for (let i = 0; i < this.box.bystanders; i++) {
        this.board.villainDeck.put(this.board.bystandersDeck.draw());
      }
      // add masterStrike
      this.board.villainDeck.create(this.box.masterStrike, new master_strike);
      // scheme setup
      this.selectHero();
    }
  }

  selectHero() {
    const dialogRef = this.dialog.open(SelectWithRandomDialog, {
      data: {
        array: Object.values(this.box.herosesBox.cards),
        header: 'Select Heroses'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.selectHero();
      } else {
        const choosenGroup = this.box.pick('heroses', data.index);
        this.board.heroDeck.create(1, choosenGroup[0]);
        this.board.heroDeck.create(3, choosenGroup[1]);
        this.board.heroDeck.create(5, choosenGroup[2]);
        this.board.heroDeck.create(5, choosenGroup[3]);
        if (this.box.herosesGroup > 0) {
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

  playerHand() {
    this.dialog.open(PlayCardsDialog);
  }
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
    if (this.board.healing) {
      this.board.KO.put(this.board.playerCards.concat(this.board.playerHand).filter(card => card.type === 'wound'));
      this.board.playerCards.sift(card => card.type !== 'wound');
      this.board.playerHand.sift(card => card.type !== 'wound');
    }
    this.board.healing = true;
    this.board.playerAttack = 0;
    this.board.playerRecrutingPoints = 0;
    this.board.copiedCards.take();
    this.board.discardPile.put(this.board.playerHand.take().concat(this.board.playerCards.take()));
    this.board.playerDeck.numberOfDrawing = 0;
    this.board.drawToPlayerHand();
    this.board.drawVillainObs.next(true);
    this.board.cardsSubscription.forEach(sub => sub.unsubscribe());
    this.board.cardsSubscription = [];
  }

  attackMastermind() {
    if (this.board.playerAttack >= Math.max(this.board.mastermind.attack + this.board.mastermind.additionalAttack, 1)) {
      this.board.playerAttack -= Math.max(this.board.mastermind.attack + this.board.mastermind.additionalAttack, 1);
      if (this.board.defeatMastermind(this.dialog)) {
        this.dialog.open(EndGameDialog, { data: { header: 'win' } }).afterClosed().subscribe(sub => {
          this.board.reload();
        });
      }
    }
  }

  ngOnInit() {
  }

}
