import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { BoardService } from '../board.service';
import { Hero } from '../models/card';

@Component({
    selector: 'app-play-cards',
    templateUrl: './play-cards.dialog.html',
    styleUrls: ['./play-cards.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class PlayCardsDialog {

    preview = '';

    constructor(public dialogRef: MatDialogRef<PlayCardsDialog>, public board: BoardService, public dialog: MatDialog) { }

    mouseEnter(src) { this.preview = src; }
    mouseLeave() { this.preview = ''; }
    pick(card: Hero, index: number) {
        this.board.playerCards.push(this.board.playerHand.pick(index));
        this.preview = '';
        this.board.playerAttack += card.attack;
        this.board.playerRecrutingPoints += card.recrutingPoints;
        if (card.func) {
            card.func(this.board, this.dialog);
        }

    }
}
