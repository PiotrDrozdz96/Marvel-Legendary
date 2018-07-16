import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material';
import { Card } from '../models/card';
import { CardsListDialog } from '../cards-list-dialog/cards-list.dialog';

@Component({
  selector: 'app-cityscape',
  templateUrl: './cityscape.component.html',
  styleUrls: ['./cityscape.component.css']
})
export class CityscapeComponent implements OnInit {

  constructor(public board: BoardService, public dialog: MatDialog) {
    this.board.draw().subscribe((draw: boolean) => {
      if (draw) {
        const new_card = this.board.villianDeck.draw();
        this.board.setKOimage(new_card.image);
        if (new_card.type === 'villain') {
          let freePlaceIndex = this.board.fields.findIndex(field => field.card === null);
          if (freePlaceIndex !== 0) {
            if (freePlaceIndex === -1) {
              board.escapedVillain.push([this.board.fields[4].card]);
              board.escapedVillain.push(this.board.fields[4].bystanders);
              freePlaceIndex = 4;
            }
            for (freePlaceIndex; freePlaceIndex > 0; freePlaceIndex--) {
              this.board.fields[freePlaceIndex].card = this.board.fields[freePlaceIndex - 1].card;
              this.board.fields[freePlaceIndex].bystanders = this.board.fields[freePlaceIndex - 1].bystanders;
              this.board.fields[freePlaceIndex - 1].bystanders = [];
            }
          }
          this.board.fields[0].card = new_card;
        } else if (new_card.type === 'bystander') {
          const villainFieldIndex = this.board.fields.findIndex(field => field.card != null);
          if (villainFieldIndex !== -1) {
            this.board.fields[villainFieldIndex].bystanders.push(new_card);
          } else {
            this.board.mastermindBystanders.push(new_card);
          }
        } else if (new_card.type === 'schemeTwist') {
          /* function twist() in scheme */
        } else if (new_card.type === 'masterStrike') {
          this.board.mastermind.masterStrike(this.board, this.dialog);
          this.board.KO.push([new_card]);
        }

        this.board.drawObs.next(false);
      }
    });
  }

  ngOnInit() {
  }

  attack(index: number) {
    if (this.board.playerAttack >= this.board.fields[index].attack + this.board.fields[index].card.attack) {
      this.board.setKOimage('');
      this.board.playerAttack -= this.board.fields[index].attack + this.board.fields[index].card.attack;
      this.board.victoryPile.push([this.board.fields[index].card]);
      this.board.victoryPile.push(this.board.fields[index].bystanders);
      this.board.fields[index].card = null;
      this.board.fields[index].bystanders = [];
    }
  }

  viewBystanders(fieldName: string, cards: Array<Card>) {
    this.dialog.open(CardsListDialog, { data: { header: 'Bystanders in ' + fieldName, cards: cards } });
  }

}
