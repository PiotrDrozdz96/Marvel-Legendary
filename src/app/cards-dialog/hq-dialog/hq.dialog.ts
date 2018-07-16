import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Card } from '../../models/card';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-hq-dialog',
  templateUrl: './hq.dialog.html',
  styleUrls: ['./hq.dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class HQDialog {

  preview = '';

  constructor(
    public dialogRef: MatDialogRef<HQDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  select(card: Card) { this.dialogRef.close(card); }
  mouseEnter(src) { this.data.preview = src; }
  mouseLeave() { this.data.preview = ''; }
}

interface Data {
  cards: Array<Card>;
  preview: string;
  header: string;
}
