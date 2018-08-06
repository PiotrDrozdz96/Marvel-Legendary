import { Injectable } from '@angular/core';
import { AlwaysLeads } from '../models/card';
import { Box } from './box';
import { HeroBox } from './hero.box';
import { MastermindBox } from './mastermind.box';
import { SchemeBox } from './scheme.box';
import { VillainsBox } from './villains.box';
import { HenchmenBox } from './henchmen.box';

import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  mastermindBox: Box;
  schemeBox: Box;
  villainsBox: Box;
  henchmenBox: Box;
  heroBox: Box;

  heroGroup: number;
  villainGroup: number;
  henchmanGroup: number;
  bystanders: number;
  masterStrike: number;

  constructor(private board: BoardService) {
    this.mastermindBox = new MastermindBox;
    this.schemeBox = new SchemeBox;
    this.villainsBox = new VillainsBox;
    this.henchmenBox = new HenchmenBox;
    this.heroBox = new HeroBox;
  }

  numberPlayers(mode: number) {
    const modes = [
      [3, 2, 1, 1],
      [5, 2, 1, 2],
      [5, 3, 1, 8],
      [5, 3, 2, 8],
      [6, 4, 2, 12]
    ];
    [
      this.heroGroup,
      this.villainGroup,
      this.henchmanGroup,
      this.bystanders,
      this.masterStrike
    ] = [...modes[mode - 1], 5];

  }

  alwaysLeads(alwaysLeads: AlwaysLeads) {
    if (alwaysLeads) {
      if (alwaysLeads.group === 'villain') {
        this.villainGroup--;
        const villains = this.villainsBox.pickByKey(alwaysLeads.name);
        villains.forEach(villain => { this.board.villainDeck.create(2, villain); });
      } else if (alwaysLeads.group === 'henchmen') {
        const villain = this.henchmenBox.pickByKey(alwaysLeads.name);
        this.henchmanGroup--;
        this.board.villainDeck.create(10, villain);
      }
    }
  }
}
