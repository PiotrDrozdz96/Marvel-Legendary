import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { BasicDialog } from '../basic-dialog';
import { BoardService } from '../../services/board.service';
import { Hero } from '../../models/card';


@Component({
    selector: 'app-play-cards',
    templateUrl: './play-cards.dialog.html',
    styleUrls: ['./play-cards.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class PlayCardsDialog extends BasicDialog {

    constructor(
        public dialogRef: MatDialogRef<PlayCardsDialog>,
        public board: BoardService, public dialog: MatDialog) {
        super();
     }

    pick( index: number) {
        const card = this.board.playerHand.pick(index)[0];
        if (card.func) {
            card.func(this.board, this.dialog);
        }
        this.board.playerCards.push(card);
        this.preview = '';
        this.board.playerAttack += card.attack;
        this.board.playerRecrutingPoints += card.recrutingPoints;
    }
}
