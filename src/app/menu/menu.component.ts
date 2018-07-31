import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, public board: BoardService) { }

  ngOnInit() {
  }

  start() {
    (document.getElementsByClassName('start')[0] as HTMLElement).style.display = 'none';
    (document.getElementsByClassName('guide')[0] as HTMLElement).style.display = 'none';
    (document.getElementsByClassName('name')[0] as HTMLElement).style.display = 'none';
    (document.getElementsByClassName('container')[0] as HTMLElement).className = 'container open';
    setTimeout(() => {
      this.router.navigate(['/game']);
    }, 4000);
  }

}
