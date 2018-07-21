import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BoardService } from '../board.service';
import { Card, Villain, Bystander, Mastermind } from '../models/card';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-end-game',
    templateUrl: './end-game.dialog.html',
    styleUrls: ['./end-game.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class EndGameDialog {

    victoryPile: Array<Villain | Bystander | Mastermind>;
    escapedVillains: Array<Villain | Bystander | Mastermind>;
    preview = '';
    yourScore: number;
    h1: string;
    h2: string;


    constructor(
        public dialogRef: MatDialogRef<EndGameDialog>,
        public board: BoardService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        const headers = {
            win: {
                h1: 'You win Commander',
                h2: 'You defeated'
            },
            lose: {
                h1: 'Evils Win',
                h2: 'You lose by'
            }
        };
        this.h1 = headers[data.header].h1;
        this.h2 = headers[data.header].h2;
        this.victoryPile = board.victoryPile;
        this.escapedVillains = board.escapedVillain;
        this.yourScore = this.victoryPile.reduce((sum, card) => sum + card.points, 0)
            - 4 * this.escapedVillains.filter(card => card.type === 'bystander').length
            - 3 * this.board.scheme.counterTwist
            - this.escapedVillains.filter(card => card.type === 'villain').length;
    }

    mouseEnter(src) { this.preview = src; }
    mouseLeave() { this.preview = ''; }

}
