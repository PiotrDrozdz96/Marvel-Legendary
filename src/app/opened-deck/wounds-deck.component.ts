import { Component } from '@angular/core';
import { OpenedDeck } from '../opened-deck/opened-deck';
import { wound } from '../cards/wounds/wounds';

@Component({
  selector: 'app-wounds-deck',
  templateUrl: './opened-deck.html',
  styles: ['.deck { float: left; top: 26.6vh; left: 10.3vh;}']
})
export class WoundsDeckComponent extends OpenedDeck<wound> {

  constructor() {
    super();
    this.deck = new Array(30);
    for (let i = 0; i < this.deck.length; i++) {
      this.deck[i] = new wound;
    }

  }

}
