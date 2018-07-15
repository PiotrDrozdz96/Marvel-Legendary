import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Card } from '../models/card';

interface Data {
    cards: Array<Card>;
    header: string;
}


@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.dialog.html',
    styleUrls: ['./cards-list.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class CardsListDialog {

    preview = '';

    constructor(
        public dialogRef: MatDialogRef<CardsListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Data
    ) { }

    mouseEnter(src) { this.preview = src; }
    mouseLeave() { this.preview = ''; }

}
