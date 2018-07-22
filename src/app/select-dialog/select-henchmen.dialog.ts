import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SelectDialog } from './select.dialog';
import { Villain } from '../models/card';
import * as henchman from '../cards/villain/henchmen';

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
    new henchman.sentinel,
    new henchman.doombot_legion,
    new henchman.hand_ninjas,
    new henchman.savage_land_mutants
  ];

  constructor(dialogRef: MatDialogRef<SelectHenchmenDialog>) { super(dialogRef); }

}
