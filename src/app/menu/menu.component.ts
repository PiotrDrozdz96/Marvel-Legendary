import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  start() {
    this.router.navigate(['/game']);
    document.getElementById('slider').style.animation = 'half-to-none 2s';
  }

  leaderboards() {
    document.getElementById('slider').style.animation = 'half-to-full-to-none 4s';
    setTimeout(() => {
      this.router.navigate(['/leaderboards']);
    }, 1320);

  }

}
