import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Hero } from '../models/card';

@Component({
  selector: 'app-hq',
  templateUrl: './hq.component.html',
  styleUrls: ['./hq.component.css']
})
export class HqComponent implements OnInit {

  cards: Array<Hero> = [];

  constructor(public board: BoardService) {
    this.board.start().subscribe((start: boolean) => {
      if (start) {
        for (let i = 0; i < 5; i++) {
          this.cards.push(this.board.heroDeck.draw());
        }
      }
    });
  }

  ngOnInit() {
  }

}
