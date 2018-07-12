import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_rogue_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_rare.png';
    team = 'x-men';
    color = 'green';
    attack = 4;
    recrutingPoints = 0;
    cost = 8;
}

export class hero_rogue_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_uncommon.png';
    team = 'x-men';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 5;
}

export class hero_rogue_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_common_1.png';
    team = 'x-men';
    color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 4;
}

export class hero_rogue_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}
