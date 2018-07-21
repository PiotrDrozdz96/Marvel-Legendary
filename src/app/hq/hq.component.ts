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
    const observator = this.board.start().subscribe((start: boolean) => {
      if (start) {
        for (let i = 0; i < 5; i++) {
          this.board.hq.push(...this.board.heroDeck.draw());
        }
        observator.unsubscribe();
        this.board.nextTurnObs.next(true);
      }
    });
  }

  ngOnInit() {
  }

  recruit(index: number) {
    if (this.board.playerRecrutingPoints >= this.board.hq[index].cost) {
      this.board.playerRecrutingPoints -= this.board.hq[index].cost;
      this.board.discardPile.put(this.board.hq.pick(index));
      this.board.hq.put(this.board.heroDeck.draw());
    }
  }

}
