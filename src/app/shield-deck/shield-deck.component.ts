import { Component, OnInit } from '@angular/core';
import { hero_shield_officer } from '../cards/hero/shield';
import { Hero } from '../models/card';

@Component({
  selector: 'app-shield-deck',
  templateUrl: './shield-deck.component.html',
  styleUrls: ['../board/board.component.css']
})
export class ShieldDeckComponent implements OnInit {

  deck: Array<hero_shield_officer> = new Array(30);
  topCard: hero_shield_officer;

  constructor() {
    for (let i = 0; i < this.deck.length; i++) {
      this.deck[i] = new hero_shield_officer;
    }
  }

  ngOnInit() {
    this.topCard = this.deck.pop();
  }

}
