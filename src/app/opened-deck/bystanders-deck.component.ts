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
    this.create(30, new bystander);
  }

}
