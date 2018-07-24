import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material';
import { Card, Bystander } from '../models/card';
import { CardsListDialog } from '../dialogs/cards-list-dialog/cards-list.dialog';

@Component({
  selector: 'app-cityscape',
  templateUrl: './cityscape.component.html',
  styleUrls: ['./cityscape.component.css']
})
export class CityscapeComponent implements OnInit {

  constructor(public board: BoardService, public dialog: MatDialog) {
    this.board.nextTurn().subscribe((draw: boolean) => {
      if (draw) {
        this.board.fields.forEach(field => {
          field.attack = 0;
        });
        this.board.mastermind.additionalAttack = 0;
        const new_cards = this.board.villianDeck.draw();
        if (new_cards.length === 1) {
          const new_card = new_cards[0];
          this.board.setKOimage(new_card.image);
          if (new_card.type === 'villain') {
            let freePlaceIndex = this.board.fields.findIndex(field => field.card === null);
            if (freePlaceIndex !== 0) {
              if (freePlaceIndex === -1) {
                if (board.fields[4].card.escape) {
                  board.fields[4].card.escape(this.board, this.dialog);
                }
                board.escapedVillain.put([this.board.fields[4].card]);
                board.escapedVillain.put(this.board.fields[4].bystanders);
                freePlaceIndex = 4;
              }
              for (freePlaceIndex; freePlaceIndex > 0; freePlaceIndex--) {
                this.board.fields[freePlaceIndex].card = this.board.fields[freePlaceIndex - 1].card;
                this.board.fields[freePlaceIndex].bystanders = this.board.fields[freePlaceIndex - 1].bystanders;
                this.board.fields[freePlaceIndex - 1].bystanders = [];
              }
            }
            this.board.fields[0].card = new_card;
            if (board.fields[0].card.ambush) {
              board.fields[0].card.ambush(this.board, this.dialog);
            }
          } else if (new_card.type === 'bystander') {
            const villainFieldIndex = this.board.fields.findIndex(field => field.card != null);
            if (villainFieldIndex !== -1) {
              this.board.fields[villainFieldIndex].bystanders.push(new_card);
            } else {
              this.board.mastermindBystanders.push(new_card as Bystander);
            }
          } else if (new_card.type === 'schemeTwist') {
            board.scheme.counterTwist++;
            board.scheme.twist(this.board, this.dialog);
          } else if (new_card.type === 'masterStrike') {
            this.board.mastermind.masterStrike(this.board, this.dialog);
            this.board.KO.push(new_card);
          }
        }
        this.board.nextTurnObs.next(false);
      }
    });
  }

  ngOnInit() {
  }

  attack(index: number) {
    if (this.board.playerAttack >= this.board.fields[index].attack + this.board.fields[index].card.attack) {
      const card = this.board.fields[index].card;
      this.board.setKOimage('');
      this.board.playerAttack -= this.board.fields[index].attack + this.board.fields[index].card.attack;
      this.board.victoryPile.push(card);
      this.board.victoryPile.put(this.board.fields[index].bystanders);
      this.board.fields[index].card = null;
      this.board.fields[index].bystanders = [];
      if (card.fight) {
        card.fight(this.board, this.dialog);
      }
    }
  }

  viewBystanders(fieldName: string, cards: Array<Card>) {
    this.dialog.open(CardsListDialog, { data: { header: 'Bystanders in ' + fieldName, cards: cards } });
  }

}
