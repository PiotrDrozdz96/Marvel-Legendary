import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_hulk_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hulk/hulk_rare.png';
    team = 'avengers';
    color = 'green';
    attack = 5;
    recrutingPoints = 0;
    cost = 8;
}

export class hero_hulk_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hulk/hulk_uncommon.png';
    team = 'avengers';
    color = 'green';
    attack = 4;
    recrutingPoints = 0;
    cost = 5;
}

export class hero_hulk_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hulk/hulk_common_1.png';
    team = 'avengers';
    color = 'green';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_hulk_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hulk/hulk_common_2.png';
    team = 'avengers';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
}
