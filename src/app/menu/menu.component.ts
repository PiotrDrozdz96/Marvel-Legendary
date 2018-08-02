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
    setTimeout(() => {
      (document.getElementsByClassName('container disable')[0] as HTMLElement).className = 'container';
      (document.getElementsByClassName('menu disable')[0] as HTMLElement).className = 'menu';
    }, 2000);
  }

  disable() {
    (document.getElementById('start') as HTMLElement).style.display = 'none';
    (document.getElementById('guide') as HTMLElement).style.display = 'none';
    (document.getElementById('name') as HTMLElement).style.display = 'none';
    (document.getElementById('leaderboards') as HTMLElement).style.display = 'none';
  }

  start() {
    this.disable();
    (document.getElementsByClassName('container')[0] as HTMLElement).style.animation = 'game 2s';
    setTimeout(() => {
      this.router.navigate(['/game']);
    }, 2000);
  }

  leaderboards() {
    this.disable();
    (document.getElementsByClassName('container')[0] as HTMLElement).className = 'container disable';
    (document.getElementsByClassName('menu')[0] as HTMLElement).className = 'menu disable';
    (document.getElementsByClassName('cover')[0] as HTMLElement).className = 'cover exit';
    setTimeout(() => {
      this.router.navigate(['/leaderboards']);
    }, 2000);
  }

}
