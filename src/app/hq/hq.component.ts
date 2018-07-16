import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Hero } from '../models/card';

@Component({
  selector: 'app-hq',
  templateUrl: './hq.component.html',
  styleUrls: ['./hq.component.css']
})
export class HqComponent implements OnInit {

  constructor(public board: BoardService) {
    const observator = this.board.draw().subscribe((start: boolean) => {
      if (start) {
        for (let i = 0; i < 5; i++) {
          this.board.hq.push(...this.board.heroDeck.draw());
        }
        observator.unsubscribe();
      }
    });
  }

  ngOnInit() {
  }

  recruit(index: number) {
    if (this.board.playerRecrutingPoints >= this.board.hq[index].cost) {
      this.board.playerRecrutingPoints -= this.board.hq[index].cost;
      this.board.discardPile.push(this.board.hq.splice(index, 1));
      this.board.hq.push(...this.board.heroDeck.draw());
    }
  }

}
