import { OnInit } from '@angular/core';
import { Deck } from '../models/deck';

export class OpenedDeck<T> extends Deck<T> implements OnInit {

  topCard: T;

  ngOnInit() {
    this.topCard = this.deck.pop();
  }

  draw(): T {
    const temp = this.topCard;
    this.topCard = this.deck.pop();
    return temp;
  }

}
