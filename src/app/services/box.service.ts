import { Injectable } from '@angular/core';
import { AlwaysLeads } from '../models/card';
import { Box } from '../models/box';
import { HeroBox } from '../boxes/hero.box';
import { MastermindBox } from '../boxes/mastermind.box';
import { SchemeBox } from '../boxes/scheme.box';
import { VillainsBox } from '../boxes/villains.box';
import { HenchmenBox } from '../boxes/henchmen.box';

import { BoardService } from './board.service';
import { GroupName, LeaderBoards } from '../models/leaderboards';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  mastermindBox: Box;
  schemeBox: Box;
  villainsBox: Box;
  henchmenBox: Box;
  herosesBox: Box;

  herosesGroup: number;
  villainsGroup: number;
  henchmenGroup: number;
  bystanders: number;
  masterStrike: number;

  leaderboards: LeaderBoards;

  constructor(private board: BoardService) {
    this.mastermindBox = new MastermindBox;
    this.schemeBox = new SchemeBox;
    this.villainsBox = new VillainsBox;
    this.henchmenBox = new HenchmenBox;
    this.herosesBox = new HeroBox;
    this.leaderboards = this.board.leaderboards;
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
      this.herosesGroup,
      this.villainsGroup,
      this.henchmenGroup,
      this.bystanders,
      this.masterStrike
    ] = [...modes[mode - 1], 5];

  }

  alwaysLeads(alwaysLeads: AlwaysLeads) {
    if (alwaysLeads) {
      if (alwaysLeads.group === 'villain') {
        const villains = this.pickByKey('villains', alwaysLeads.name);
        villains.forEach(villain => { this.board.villainDeck.create(2, villain); });
      } else if (alwaysLeads.group === 'henchmen') {
        const villain = this.pickByKey('henchmen', alwaysLeads.name)[0];
        this.board.villainDeck.create(10, villain);
      }
    }
  }

  pick(group: GroupName, index: number, decrement = true) {
    return this.pickByKey(group, this[group + 'Box'].key(index), decrement);
  }

  pickByKey(group: GroupName, key: string, decrement = true) {
    this.leaderboards.push(group, key);
    if (decrement) { (this[group + 'Group'] as number)--; }
    return (this[group + 'Box'] as Box).pickByKey(key);
  }

}
