import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SelectDialog } from './select.dialog';
import { Villain } from '../models/card';
import { VillainsService } from '../villains.service';


@Component({
    selector: 'app-select-villain',
    templateUrl: './select-group.dialog.html',
    styleUrls: ['./select.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class SelectVillainsDialog {

    header = 'Select Villains Group';
    randomImage = '/assets/back_of_card.png';
    cards: Array<Array<Villain>>;

    constructor(public dialogRef: MatDialogRef<SelectVillainsDialog>, public villainsService: VillainsService) {
        villainsService.getCards().subscribe(cards => {
            this.cards = cards;
        });
    }

    select(index: number) { this.dialogRef.close(this.villainsService.splice(index)); }
    random() {this.dialogRef.close(this.villainsService.splice(Math.floor(Math.random() * this.cards.length))); }

}
