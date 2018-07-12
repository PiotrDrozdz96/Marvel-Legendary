import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_hawkeye_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_rare.png';
    team = 'avengers';
    color = 'grey';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_hawkeye_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_uncommon.png';
    team = 'avengers';
    color = 'grey';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
}

export class hero_hawkeye_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_common_1.png';
    team = 'avengers';
    color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_hawkeye_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
}
