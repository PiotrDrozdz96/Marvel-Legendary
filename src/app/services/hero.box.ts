import { Box } from './box';
import * as hero_black_widow from '../cards/hero/black_widow';
import * as hero_captain_america from '../cards/hero/captain_america';
import * as hero_cyclops from '../cards/hero/cyclops';
import * as hero_deadpool from '../cards/hero/deadpool';
import * as hero_emma_frost from '../cards/hero/emma_frost';
import * as hero_gambit from '../cards/hero/gambit';
import * as hero_hawkeye from '../cards/hero/hawkeye';
import * as hero_hulk from '../cards/hero/hulk';
import * as hero_ironman from '../cards/hero/ironman';
import * as hero_nick_fury from '../cards/hero/nick_fury';
import * as hero_rogue from '../cards/hero/rogue';
import * as hero_spider_man from '../cards/hero/spider_man';
import * as hero_storm from '../cards/hero/storm';
import * as hero_thor from '../cards/hero/thor';
import * as hero_wolverine from '../cards/hero/wolverine';

export class HeroBox extends Box {

  cards = {
    black_widow: [
      new hero_black_widow.rare,
      new hero_black_widow.uncommon,
      new hero_black_widow.common_1,
      new hero_black_widow.common_2
    ],
    captain_america: [
      new hero_captain_america.rare,
      new hero_captain_america.uncommon,
      new hero_captain_america.common_1,
      new hero_captain_america.common_2
    ],
    cyclops: [
      new hero_cyclops.rare,
      new hero_cyclops.uncommon,
      new hero_cyclops.common_1,
      new hero_cyclops.common_2
    ],
    deadpool: [
      new hero_deadpool.rare,
      new hero_deadpool.uncommon,
      new hero_deadpool.common_1,
      new hero_deadpool.common_2
    ],
    emma_frost: [
      new hero_emma_frost.rare,
      new hero_emma_frost.uncommon,
      new hero_emma_frost.common_1,
      new hero_emma_frost.common_2
    ],
    gambit: [
      new hero_gambit.rare,
      new hero_gambit.uncommon,
      new hero_gambit.common_1,
      new hero_gambit.common_2
    ],
    hawkeye: [
      new hero_hawkeye.rare,
      new hero_hawkeye.uncommon,
      new hero_hawkeye.common_1,
      new hero_hawkeye.common_2
    ],
    hulk: [
      new hero_hulk.rare,
      new hero_hulk.uncommon,
      new hero_hulk.common_1,
      new hero_hulk.common_2
    ],
    ironman: [
      new hero_ironman.rare,
      new hero_ironman.uncommon,
      new hero_ironman.common_1,
      new hero_ironman.common_2
    ],
    nick_fury: [
      new hero_nick_fury.rare,
      new hero_nick_fury.uncommon,
      new hero_nick_fury.common_1,
      new hero_nick_fury.common_2
    ],
    rogue: [
      new hero_rogue.rare,
      new hero_rogue.uncommon,
      new hero_rogue.common_1,
      new hero_rogue.common_2
    ],
    spider_man: [
      new hero_spider_man.rare,
      new hero_spider_man.uncommon,
      new hero_spider_man.common_1,
      new hero_spider_man.common_2
    ],
    storm: [
      new hero_storm.rare,
      new hero_storm.uncommon,
      new hero_storm.common_1,
      new hero_storm.common_2
    ],
    thor: [
      new hero_thor.rare,
      new hero_thor.uncommon,
      new hero_thor.common_1,
      new hero_thor.common_2
    ],
    wolverine: [
      new hero_wolverine.rare,
      new hero_wolverine.uncommon,
      new hero_wolverine.common_1,
      new hero_wolverine.common_2
    ]
  };

}
