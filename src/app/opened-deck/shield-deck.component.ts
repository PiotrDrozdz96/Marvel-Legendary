import { Component } from '@angular/core';
import { OpenedDeck } from '../opened-deck/opened-deck';
import { hero_shield_officer } from '../cards/hero/shield';

@Component({
  selector: 'app-shield-deck',
  templateUrl: './opened-deck.html',
  styles: ['.deck { top: 23.5vh; }']
})
export class ShieldDeckComponent extends OpenedDeck<hero_shield_officer> {

  constructor() {
    super();
    this.deck = new Array(30);
    for (let i = 0; i < this.deck.length; i++) {
      this.deck[i] = new hero_shield_officer;
    }
  }

}
