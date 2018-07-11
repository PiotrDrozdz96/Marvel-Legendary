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
    this.create(30, new hero_shield_officer);
  }

}
