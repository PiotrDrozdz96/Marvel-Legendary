import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_spider_man_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_rare.png';
    team = 'spider';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
}

export class hero_spider_man_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_uncommon.png';
    team = 'spider';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
}

export class hero_spider_man_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_common_1.png';
    team = 'spider';
    color = 'green';
    attack = 0;
    recrutingPoints = 1;
    cost = 2;
}

export class hero_spider_man_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_common_2.png';
    team = 'spider';
    color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 2;
}
