import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_storm_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/storm/storm_rare.png';
    team = 'x-men';
    color = 'white';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_storm_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/storm/storm_uncommon.png';
    team = 'x-men';
    color = 'red';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
}

export class hero_storm_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/storm/storm_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
}

export class hero_storm_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/storm/storm_common_2.png';
    team = 'x-men';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
}
