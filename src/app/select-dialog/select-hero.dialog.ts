import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SelectDialog } from './select.dialog';
import { Hero } from '../models/card';
import { HeroService } from '../hero.service';


@Component({
    selector: 'app-select-hero',
    templateUrl: './select-group.dialog.html',
    styleUrls: ['./select.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class SelectHeroDialog {

    header = 'Select Hero Group';
    randomImage = '/assets/back_of_card.png';
    cards: Array<Array<Hero>>;

    constructor(public dialogRef: MatDialogRef<SelectHeroDialog>, public heroService: HeroService) {
        heroService.getCards().subscribe(cards => {
            this.cards = cards;
        });
    }

    select(index: number) { this.dialogRef.close(this.heroService.splice(index)); }
    random() {this.dialogRef.close(this.heroService.splice(Math.floor(Math.random() * this.cards.length))); }

}
