import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SelectDialog } from './select.dialog';
import { Mastermind } from '../models/card';
import { mastermind_doctor_doom, mastermind_loki, mastermind_magneto, mastermind_red_skull } from '../cards/mastermind';

@Component({
  selector: 'app-select-mastermind',
  templateUrl: './select.dialog.html',
  styleUrls: ['./select.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class SelectMastermindDialog extends SelectDialog<Mastermind, SelectMastermindDialog> {

  header = 'Select one Mastermind';
  randomImage = '/assets/cards/mastermind/master_strike.png';
  cards = [
    new mastermind_doctor_doom,
    new mastermind_loki,
    new mastermind_magneto,
    new mastermind_red_skull
  ];

  constructor(dialogRef: MatDialogRef<SelectMastermindDialog>) { super(dialogRef); }

}
