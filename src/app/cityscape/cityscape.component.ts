import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material';
import { Card, Bystander, Villain } from '../models/card';
import { CardsListDialog } from '../dialogs/cards-list-dialog/cards-list.dialog';

@Component({
  selector: 'app-cityscape',
  templateUrl: './cityscape.component.html',
  styleUrls: ['./cityscape.component.css']
})
export class CityscapeComponent implements OnInit {

  constructor(public board: BoardService, public dialog: MatDialog) {
    this.board.drawVillain().subscribe((draw: boolean) => {
      if (draw) {
        this.board.fields.forEach(field => {
          field.attack = 0;
        });
        this.board.mastermind.additionalAttack = 0;
        const new_cards = this.board.villainDeck.draw();
        if (new_cards.length === 1) {
          const new_card = new_cards[0];
          this.board.setKOimage(new_card.image);
          if (new_card.type === 'villain') {
            board.moveVillains(new_card as Villain, this.dialog);
          } else if (new_card.type === 'bystander') {
            const villainFieldIndex = this.board.fields.findIndex(field => field.card != null);
            if (villainFieldIndex !== -1) {
              this.board.fields[villainFieldIndex].bystanders.push(new_card as Bystander);
            } else {
              this.board.mastermind.bystanders.push(new_card as Bystander);
            }
          } else if (new_card.type === 'schemeTwist') {
            board.scheme.counterTwist++;
            board.scheme.twist(this.board, new_card, this.dialog);
          } else if (new_card.type === 'masterStrike') {
            this.board.mastermind.masterStrike(this.board, this.dialog);
            this.board.KO.push(new_card);
          }
        }
        this.board.drawVillainObs.next(false);
      }
    });
  }

  ngOnInit() {
  }

  attack(index: number) {
    if ((this.board.playerAttack >= Math.max(this.board.fields[index].attack + this.board.fields[index].card.attack, 1)) &&
      (!this.board.fields[index].card.fightCondition || this.board.fields[index].card.fightCondition(this.board))) {
      this.board.playerAttack -= Math.max(this.board.fields[index].attack + this.board.fields[index].card.attack, 1);
      this.board.defeatVillain(index, this.dialog);
    }
  }

  viewCards(header: string, fieldName: string, cards: Array<Card>) {
    this.dialog.open(CardsListDialog, { data: { header: header + fieldName, array: cards } });
  }

}
