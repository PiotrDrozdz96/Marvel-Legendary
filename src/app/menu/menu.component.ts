import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public message = {
    title: 'No Topic',
    from: 'Anonim',
    text: ''
  };

  constructor(private router: Router, private http: HttpService) { }

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

  openMessage() {
    const messageElement = document.getElementById('message');
    if (messageElement.style.display === 'block') {
      messageElement.style.display = 'none';
    } else {
      messageElement.style.display = 'block';
    }
  }

  sendMessage() {
    const messageElement = document.getElementById('message');
    this.http.sendMessage(this.message).subscribe(sub => {
      messageElement.style.border = '2px solid green';
      this.message = {
        title: 'No Topic',
        from: 'Anonim',
        text: ''
      };
    });
  }

  defaultBorder() {
    document.getElementById('message').style.border = '2px solid black';
  }

}
