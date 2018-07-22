import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Card, Mastermind, Scheme, Villain, Hero } from '../models/card';
import { bystander } from '../cards/bystanders';
import { master_strike } from '../cards/mastermind';

import { BoardService } from '../board.service';
import { VillainsService } from '../villains.service';
import { HeroService } from '../hero.service';

import { SelectMastermindDialog } from '../select-dialog/select-mastermind.dialog';
import { SelectSchemeDialog } from '../select-dialog/select-scheme.dialog';
import { SelectVillainsDialog } from '../select-dialog/select-villains.dialog';
import { SelectHenchmenDialog } from '../select-dialog/select-henchmen.dialog';
import { SelectHeroDialog } from '../select-dialog/select-hero.dialog';
import { PlayCardsDialog } from '../play-cards-dialog/play-cards.dialog';
import { CardsListDialog } from '../cards-list-dialog/cards-list.dialog';
import { EndGameDialog } from '../end-game-dialog/end-game.dialog';
import { Deck } from '../models/deck';

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


  constructor(public board: BoardService, private dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(SelectMastermindDialog);
    dialogRef.afterClosed().subscribe((mastermind: Mastermind) => {
      if (mastermind === undefined) {
        this.selectMastermind();
      } else {
        this.board.mastermind = mastermind;
        this.selectScheme();
      }
    });
  }

  selectScheme() {
    const dialogRef = this.dialog.open(SelectSchemeDialog);
    dialogRef.afterClosed().subscribe((scheme: Scheme) => {
      if (scheme === undefined) {
        this.selectScheme();
      } else {
        this.board.scheme = scheme;
        this.selectVillains();
      }
    });
  }

  selectVillains() {
    const dialogRef = this.dialog.open(SelectVillainsDialog);
    dialogRef.afterClosed().subscribe((villains: Array<Villain>) => {
      if (villains === undefined) {
        this.selectVillains();
      } else {
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
    const dialogRef = this.dialog.open(SelectHenchmenDialog);
    dialogRef.afterClosed().subscribe((villain: Villain) => {
      if (villain === undefined) {
        this.selectHenchman();
      } else {
        // add henchman
        this.board.villianDeck.create(this.henchmanCards, villain);
        // add bystanders
        for (let i = 0; i < this.bystanders; i++) {
          this.board.villianDeck.put(this.board.bystandersDeck.draw());
        }
        // add masterStrike
        this.board.villianDeck.create(this.masterStrike, new master_strike);
        // scheme setup
        this.board.scheme.setup(this.board, this.dialog);

        this.board.villianDeck.shuffle();
        this.selectHero();
      }
    });
  }

  selectHero() {
    const dialogRef = this.dialog.open(SelectHeroDialog);
    dialogRef.afterClosed().subscribe((heroes: Array<Hero>) => {
      if (heroes === undefined) {
        this.selectHero();
      } else {
        this.board.heroDeck.create(1, heroes[0]);
        this.board.heroDeck.create(3, heroes[1]);
        this.board.heroDeck.create(5, heroes[2]);
        this.board.heroDeck.create(5, heroes[3]);
        this.heroGroup--;
        if (this.heroGroup > 0) {
          this.selectHero();
        } else {
          this.board.heroDeck.shuffle();
          this.board.startObs.next(true);
        }
      }
    });
  }

  playerHand() { this.dialog.open(PlayCardsDialog); }
  viewCards(header: string, cards: Array<Card>) {
    this.dialog.open(CardsListDialog, { data: { header: header, cards: cards } });
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
    this.board.nextTurnObs.next(true);
  }

  attackMastermind() {
    if (this.board.playerAttack >= this.board.mastermind.attack + this.board.mastermind.additionalAttack) {
      this.board.playerAttack -= this.board.mastermind.attack + this.board.mastermind.additionalAttack;
      const tactic = this.board.mastermind.tactics.splice(Math.floor(Math.random() * this.board.mastermind.tactics.length), 1);
      const tacticCard = Object.assign({}, this.board.mastermind);
      tacticCard.image = tactic[0].image;
      this.board.victoryPile.push(tacticCard);
      this.board.victoryPile.put(this.board.mastermindBystanders);
      this.board.mastermindBystanders = [];
      if (this.board.mastermind.tactics.length === 0) {
        this.dialog.open(EndGameDialog, {data: { header: 'win' }}).afterClosed().subscribe(sub => {
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
