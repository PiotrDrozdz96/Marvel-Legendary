import { Component, OnInit } from '@angular/core';
import { OpenedDeck } from './opened-deck';
import { Mastermind } from '../models/card';
import {
  mastermind_magneto,
  magneto_tactic_1,
  magneto_tactic_2,
  magneto_tactic_3,
  magneto_tactic_4
} from '../cards/mastermind/magneto/magneto';

@Component({
  selector: 'app-mastermind-deck',
  templateUrl: './opened-deck.html',
  styles: ['.deck { top: 17.75vh; }']
})
export class MastermindDeckComponent extends OpenedDeck<Mastermind> implements OnInit {

  constructor() {
    super();
    this.pushDeck([
      new mastermind_magneto,
      new magneto_tactic_1,
      new magneto_tactic_2,
      new magneto_tactic_3,
      new magneto_tactic_4
    ]);
    this.shuffle();
  }

  ngOnInit() { }


}
