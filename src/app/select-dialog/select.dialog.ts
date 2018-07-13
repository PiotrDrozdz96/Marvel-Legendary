import { MatDialogRef } from '@angular/material';

export class SelectDialog<T, N> {

  header: string;
  randomImage: string;
  cards: Array<T>;
  preview = '';

  constructor(public dialogRef: MatDialogRef<N>) { }

  select(card: T) { this.dialogRef.close(card); }
  random() { this.dialogRef.close(this.cards[Math.floor(Math.random() * this.cards.length) ]); }
  mouseEnter(src) { this.preview = src; }
  mouseLeave() { this.preview = ''; }
}
