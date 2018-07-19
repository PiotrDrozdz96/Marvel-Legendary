import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SelectDialog } from './select.dialog';
import { Scheme } from '../models/card';
import {
  scheme_legacy_virus,
  scheme_midtown_bank_robbery,
  scheme_negative_zone_prison_breakout,
  scheme_portals_dark_dimension,
  scheme_replace_leaders_killbots,
  scheme_secret_invasion_shapeshifters,
  scheme_super_hero_civil_war,
  scheme_unleash_cosmic_cube
} from '../cards/scheme';

@Component({
  selector: 'app-select-scheme',
  templateUrl: './select.dialog.html',
  styleUrls: ['./select.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class SelectSchemeDialog extends SelectDialog<Scheme, SelectSchemeDialog> {

  header = 'Select one Scheme';
  randomImage = 'assets/back_of_card.png';
  cards: Array<Scheme> = [
    new scheme_legacy_virus,
    new scheme_midtown_bank_robbery,
    new scheme_negative_zone_prison_breakout,
    // new scheme_portals_dark_dimension,
    new scheme_replace_leaders_killbots,
    // new scheme_secret_invasion_shapeshifters,
    // new scheme_super_hero_civil_war,
    new scheme_unleash_cosmic_cube
  ];

  constructor(dialogRef: MatDialogRef<SelectSchemeDialog>) { super(dialogRef); }

}
