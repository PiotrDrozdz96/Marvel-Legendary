import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_ironman_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/ironman/ironman_rare.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_ironman_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/ironman/ironman_uncommon.png';
    team = 'avengers';
    color = 'grey';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
}

export class hero_ironman_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/ironman/ironman_common_1.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_ironman_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/ironman/ironman_common_2.png';
    team = 'avengers';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}
