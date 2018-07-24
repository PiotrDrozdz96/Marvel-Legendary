import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BasicDialog } from '../basic-dialog';
import { Card } from '../../models/card';

export interface Data {
    array: Array<any>;
    header: string;
    preview: string;
}

@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class CardsListDialog extends BasicDialog {

    array: Array<any>;
    header: string;

    constructor(
        public dialogRef: MatDialogRef<CardsListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Data
    ) {
        super();
        this.array = data.array;
        this.header = data.header;
        this.preview = data.preview || '';
    }

    click(card: Card, index: number) { }

}
