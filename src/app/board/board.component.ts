import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BoardService } from '../board.service';
import { SelectMastermindDialog } from '../select-dialog/select-mastermind.dialog';
import { SelectSchemeDialog } from '../select-dialog/select-scheme.dialog';
import { Mastermind, Scheme } from '../models/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

  constructor(public board: BoardService, private dialog: MatDialog) {
    this.selectMastermind();
  }

  selectMastermind() {
    const dialogRef = this.dialog.open(SelectMastermindDialog);
    dialogRef.afterClosed().subscribe((mastermind: Mastermind) => {
      if (mastermind === undefined) {
        this.selectMastermind();
      } else {
        this.board.mastermind = mastermind;
        this.selectScheme();
      }
    });
  }

  selectScheme() {
    const dialogRef = this.dialog.open(SelectSchemeDialog);
    dialogRef.afterClosed().subscribe((scheme: Scheme) => {
      if (scheme === undefined) {
        this.selectScheme();
      } else {
        this.board.scheme = scheme;
      }
    });
  }

  ngOnInit() {
  }

}
