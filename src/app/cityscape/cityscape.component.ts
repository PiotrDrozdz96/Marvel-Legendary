import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-cityscape',
  templateUrl: './cityscape.component.html',
  styleUrls: ['./cityscape.component.css']
})
export class CityscapeComponent implements OnInit {

  fields = [
    {
      place: 'sewers',
      card: null,
      attack: 0
    },
    {
      place: 'bank',
      card: null,
      attack: 0
    },
    {
      place: 'rooftops',
      card: null,
      attack: 0
    },
    {
      place: 'streets',
      card: null,
      attack: 0
    },
    {
      place: 'bridge',
      card: null,
      attack: 0
    }
  ];

  constructor(public board: BoardService) {
    this.board.draw().subscribe((draw: boolean) => {
      if (draw) {
        const new_card = this.board.villianDeck.draw();
        let freePlaceIndex = this.fields.findIndex(field => field.card === null);
        console.log(freePlaceIndex);
        if (freePlaceIndex !== 0) {
          for (freePlaceIndex; freePlaceIndex > 0; freePlaceIndex--) {
            this.fields[freePlaceIndex].card = this.fields[freePlaceIndex - 1].card;
          }
        }
        this.fields[0].card = new_card;
        this.board.drawObs.next(false);
      }
    });
  }

  ngOnInit() {
  }

}
