import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

  constructor(public board: BoardService) { }

  ngOnInit() {
  }

}
