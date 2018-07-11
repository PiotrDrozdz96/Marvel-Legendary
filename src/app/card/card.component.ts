import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  src: string;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
  }

  mouseEnter() {
    this.boardService.setKOimage(this.src);
  }

  mouseLeave() {
    this.boardService.setKOimage('');
  }

}
