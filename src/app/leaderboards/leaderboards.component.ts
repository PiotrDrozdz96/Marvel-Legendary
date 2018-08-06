import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { LeaderBoards } from '../models/leaderboards';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'win', 'score', 'mastermind', 'scheme', 'heroses'];
  window = window;
  leaderboards: Array<LeaderBoards>;
  dataSource: Array<LeaderBoards>;
  mastermindsList: Array<string> = [];
  schemeList: Array<string> = [];
  filter = {
    name: 'Name',
    win: null,
    mastermind: null,
    scheme: null
  };

  constructor(private http: HttpService, public box: BoxService, public router: Router) {
    http.get().subscribe(leaderboards => {
      const tempObject = {};
      this.leaderboards = (leaderboards as Array<LeaderBoards>).sort(
        (a, b) => b.win > a.win ? 1 : b.win < a.win ? -1 :
          b.score - a.score
      );
      this.leaderboards.forEach((value, index) => {
        value.position = index + 1;
        if (!tempObject[value.mastermind]) {
          tempObject[value.mastermind] = true;
          this.mastermindsList.push(value.mastermind);
        }
        if (!tempObject[value.scheme]) {
          tempObject[value.scheme] = true;
          this.schemeList.push(value.scheme);
        }
      });
      this.dataSource = this.leaderboards;
      this.mastermindsList.sort();
      this.schemeList.sort();
    });
  }

  ngOnInit() {
  }

  name(key: string): string {
    return key.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  }

  onScroll() {
    if (document.getElementById('leaderboards').scrollTop > 20) {
      document.getElementById('top').style.display = 'block';
    } else {
      document.getElementById('top').style.display = 'none';
    }
  }

  top() { this.scrollTo(document.getElementById('leaderboards'), 0, 1000); }

  scrollTo(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    function animateScroll() {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    animateScroll();
  }

  change() {
    this.dataSource = this.leaderboards.filter(
      element => (this.filter.name === 'Name' || this.filter.name === ''
        || element.name.toLowerCase().includes(this.filter.name.toLowerCase())) &&
        (this.filter.win === null ? true : this.filter.win === element.win) &&
        (this.filter.mastermind === null ? true : this.filter.mastermind === element.mastermind) &&
        (this.filter.scheme === null ? true : this.filter.scheme === element.scheme)
    );
  }

  exit() {
    document.getElementById('slider').style.animation = 'none-to-full-to-half 4s';
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2680);
  }

}
