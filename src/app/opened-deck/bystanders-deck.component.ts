import { Component } from '@angular/core';
import { OpenedDeck } from '../opened-deck/opened-deck';
import { bystander } from '../cards/bystanders/bystanders';

@Component({
  selector: 'app-bystanders-deck',
  templateUrl: './opened-deck.html',
  styles: ['.deck { top: 8vh; left: 8vh; }']
})
export class BystandersDeckComponent extends OpenedDeck<bystander> {

  constructor() {
    super();
    this.deck = new Array(30);
    for (let i = 0; i < this.deck.length; i++) {
      this.deck[i] = new bystander;
    }
  }

}
