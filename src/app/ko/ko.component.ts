import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-ko',
  templateUrl: './ko.component.html',
  styleUrls: ['./ko.component.css']
})
export class KOComponent implements OnInit {

  src: string;

  constructor(private boardService: BoardService) {
    this.boardService.getKOimage().subscribe((image: string) => {
      this.src = image;
    });
   }

  ngOnInit() {
  }

}
