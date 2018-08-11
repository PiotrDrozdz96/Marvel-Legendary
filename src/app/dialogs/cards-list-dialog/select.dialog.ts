import { Component } from '@angular/core';
import { CardsListDialog} from './cards-list.dialog';
import { Card } from '../../models/card';

@Component({
    selector: 'app-select',
    templateUrl: './cards-list.dialog.html',
    styles: ['img { cursor: pointer; }']
})
// tslint:disable-next-line:component-class-suffix
export class SelectDialog extends CardsListDialog {

    click(card: Card, index: number) { this.dialogRef.close({ card: card, index: index}); }

}
