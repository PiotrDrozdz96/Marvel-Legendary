import { OnInit } from '@angular/core';

export class OpenedDeck<T> implements OnInit {

  deck: Array<T>;
  topCard: T;

  ngOnInit() {
    this.topCard = this.deck.pop();
  }

}
