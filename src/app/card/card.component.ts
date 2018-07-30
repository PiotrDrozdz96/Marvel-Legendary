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
  @Input() transform: boolean;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    if (this.transform) {
      this.rotate = Math.floor((Math.random() * 28) - 14);
      this.top = (Math.random() * 1.2) - 0.60;
      this.left = (Math.random() * 2) - 1;
    }
  }

  mouseEnter() {
    this.boardService.setKOimage(this.src);
  }

  mouseLeave() {
    this.boardService.setKOimage('');
  }

}
