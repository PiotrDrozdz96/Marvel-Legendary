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
    this.create(30, new wound);

  }

}
