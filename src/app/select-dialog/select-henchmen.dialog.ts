import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SelectDialog } from './select.dialog';
import { Villain } from '../models/card';
import { henchman_sentinel, henchman_doombot_legion, henchman_hand_ninjas, henchman_savage_land_mutants } from '../cards/villain/henchmen';

@Component({
  selector: 'app-select-mastermind',
  templateUrl: './select.dialog.html',
  styleUrls: ['./select.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class SelectHenchmenDialog extends SelectDialog<Villain, SelectHenchmenDialog> {

  header = 'Select one Henchman Group';
  randomImage = 'assets/back_of_card.png';
  cards = [
    new henchman_sentinel,
    new henchman_doombot_legion,
    new henchman_hand_ninjas,
    new henchman_savage_land_mutants
  ];

  constructor(dialogRef: MatDialogRef<SelectHenchmenDialog>) { super(dialogRef); }

}
