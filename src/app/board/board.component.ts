import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BoardService } from '../board.service';
import { VillainsService } from '../villains.service';
import { HeroService } from '../hero.service';
import { SelectMastermindDialog } from '../select-dialog/select-mastermind.dialog';
import { SelectSchemeDialog } from '../select-dialog/select-scheme.dialog';
import { SelectVillainsDialog } from '../select-dialog/select-villains.dialog';
import { SelectHenchmenDialog } from '../select-dialog/select-henchmen.dialog';
import { Mastermind, Scheme, Villain, Hero } from '../models/card';
import { bystander } from '../cards/bystanders';
import { master_strike } from '../cards/mastermind';
import { SelectHeroDialog } from '../select-dialog/select-hero.dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService, VillainsService, HeroService],
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
      onBoard: [5, 3, 10, 10, 10]
    };
    this.heroGroup = modes[mode][0];
    this.villainGroup = modes[mode][1];
    this.henchmanCards = modes[mode][2];
    this.bystanders = modes[mode][3];
    this.masterStrike = modes[mode][4];

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
        scheme.setup(this.board); /* after build deck*/
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
        const bystanders: Array<bystander> = [];
        for (let i = 0; i < this.bystanders; i++) {
          bystanders.push(this.board.bystandersDeck.draw());
        }
        this.board.villianDeck.push(bystanders);
        // add masterStrike
        this.board.villianDeck.create(this.masterStrike, new master_strike);

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

  ngOnInit() {
  }

}
