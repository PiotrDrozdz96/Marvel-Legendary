import { Component, OnInit } from '@angular/core';
import { OpenedDeck } from './opened-deck';
import { Mastermind } from '../models/card';
import { mastermind_magneto } from '../cards/mastermind/mastermind';

@Component({
  selector: 'app-mastermind-deck',
  templateUrl: './opened-deck.html',
  styles: ['.deck { top: 17.75vh; }']
})
export class MastermindDeckComponent extends OpenedDeck<Mastermind> implements OnInit {

  constructor() {
    super();
    this.pushDeck([ new mastermind_magneto ]);
  }

  ngOnInit() { }


}
