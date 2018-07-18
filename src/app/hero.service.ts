import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Hero } from './models/card';
import {
  hero_black_widow_common_1,
  hero_black_widow_common_2,
  hero_black_widow_rare,
  hero_black_widow_uncommon
} from './cards/hero/black_widow';
import {
  hero_captain_america_rare,
  hero_captain_america_uncommon,
  hero_captain_america_common_1,
  hero_captain_america_common_2
} from './cards/hero/captain_america';
import { hero_cyclops_rare, hero_cyclops_uncommon, hero_cyclops_common_1, hero_cyclops_common_2 } from './cards/hero/cyclops';
import { hero_deadpool_rare, hero_deadpool_uncommon, hero_deadpool_common_1, hero_deadpool_common_2 } from './cards/hero/deadpool';
import {
  hero_emma_frost_rare,
  hero_emma_frost_uncommon,
  hero_emma_frost_common_1,
  hero_emma_frost_common_2
} from './cards/hero/emma_frost';
import { hero_gambit_rare, hero_gambit_uncommon, hero_gambit_common_1, hero_gambit_common_2 } from './cards/hero/gambit';
import { hero_hawkeye_rare, hero_hawkeye_uncommon, hero_hawkeye_common_1, hero_hawkeye_common_2 } from './cards/hero/hawkeye';
import { hero_hulk_rare, hero_hulk_uncommon, hero_hulk_common_1, hero_hulk_common_2 } from './cards/hero/hulk';
import { hero_ironman_rare, hero_ironman_uncommon, hero_ironman_common_1, hero_ironman_common_2 } from './cards/hero/ironman';
import { hero_nick_fury_rare, hero_nick_fury_uncommon, hero_nick_fury_common_1, hero_nick_fury_common_2 } from './cards/hero/nick_fury';
import { hero_rogue_rare, hero_rogue_uncommon, hero_rogue_common_1, hero_rogue_common_2 } from './cards/hero/rogue';
import {
  hero_spider_man_rare,
  hero_spider_man_uncommon,
  hero_spider_man_common_1,
  hero_spider_man_common_2
} from './cards/hero/spider_man';
import { hero_storm_rare, hero_storm_uncommon, hero_storm_common_1, hero_storm_common_2 } from './cards/hero/storm';
import { hero_thor_rare, hero_thor_uncommon, hero_thor_common_1, hero_thor_common_2 } from './cards/hero/thor';
import { hero_wolverine_rare, hero_wolverine_uncommon, hero_wolverine_common_1, hero_wolverine_common_2 } from './cards/hero/wolverine';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private cards = [
    [
      new hero_black_widow_rare,
      new hero_black_widow_uncommon,
      new hero_black_widow_common_1,
      new hero_black_widow_common_2
    ],
    [
      new hero_captain_america_rare,
      new hero_captain_america_uncommon,
      new hero_captain_america_common_1,
      new hero_captain_america_common_2
    ],
    [
      new hero_cyclops_rare,
      new hero_cyclops_uncommon,
      new hero_cyclops_common_1,
      new hero_cyclops_common_2
    ],
    [
      new hero_deadpool_rare,
      new hero_deadpool_uncommon,
      new hero_deadpool_common_1,
      new hero_deadpool_common_2
    ],
    [
      new hero_emma_frost_rare,
      new hero_emma_frost_uncommon,
      new hero_emma_frost_common_1,
      new hero_emma_frost_common_2
    ],
    [
      new hero_gambit_rare,
      new hero_gambit_uncommon,
      new hero_gambit_common_1,
      new hero_gambit_common_2
    ],
    [
      new hero_hawkeye_rare,
      new hero_hawkeye_uncommon,
      new hero_hawkeye_common_1,
      new hero_hawkeye_common_2
    ],
    [
      new hero_hulk_rare,
      new hero_hulk_uncommon,
      new hero_hulk_common_1,
      new hero_hulk_common_2
    ],
    [
      new hero_ironman_rare,
      new hero_ironman_uncommon,
      new hero_ironman_common_1,
      new hero_ironman_common_2
    ],
    [
      new hero_nick_fury_rare,
      new hero_nick_fury_uncommon,
      new hero_nick_fury_common_1,
      new hero_nick_fury_common_2
    ],
    [
      new hero_rogue_rare,
      new hero_rogue_uncommon,
      new hero_rogue_common_1,
      new hero_rogue_common_2
    ],
    [
      new hero_spider_man_rare,
      new hero_spider_man_uncommon,
      new hero_spider_man_common_1,
      new hero_spider_man_common_2
    ],
    [
      new hero_storm_rare,
      new hero_storm_uncommon,
      new hero_storm_common_1,
      new hero_storm_common_2
    ],
    [
      new hero_thor_rare,
      new hero_thor_uncommon,
      new hero_thor_common_1,
      new hero_thor_common_2
    ]// ,
    // [
    //   new hero_wolverine_rare,
    //   new hero_wolverine_uncommon,
    //   new hero_wolverine_common_1,
    //   new hero_wolverine_common_2
    // ]
  ];

  public cardsObs = new BehaviorSubject<Array<Array<Hero>>>(this.cards);

  constructor() { }

  getCards(): Observable<Array<Array<Hero>>> { return this.cardsObs.asObservable(); }
  splice(index: number): Array<Hero> {
    const result = this.cards[index];
    this.cards.splice(index, 1);
    return result;
  }
}
