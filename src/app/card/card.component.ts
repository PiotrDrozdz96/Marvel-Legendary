import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  rotate = 0;
  top = 0;
  left = 0;

  @Input() src: string;
  @Input() reveal = true;
  @Input() cursor = 'default';
  @Input() style = {};

  constructor(private boardService: BoardService) { }

  ngOnInit() { }

  mouseEnter() {
    if (this.reveal) {
      this.boardService.setKOimage(this.src);
    }
  }

  mouseLeave() {
    if (this.reveal) {
      this.boardService.setKOimage('');
    }
  }

}
