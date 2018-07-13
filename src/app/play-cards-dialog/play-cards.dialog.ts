import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BoardService } from '../board.service';

@Component({
    selector: 'app-play-cards',
    templateUrl: './play-cards.dialog.html',
    styleUrls: ['./play-cards.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class PlayCardsDialog {

    preview = '';

    constructor(public dialogRef: MatDialogRef<PlayCardsDialog>, public board: BoardService) { }

    mouseEnter(src) { this.preview = src; }
    mouseLeave() { this.preview = ''; }
}
