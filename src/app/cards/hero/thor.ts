import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_thor_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_rare.png';
    team = 'avengers';
    color = 'white';
    attack = 0;
    recrutingPoints = 5;
    cost = 8;
}

export class hero_thor_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_uncommon.png';
    team = 'avengers';
    color = 'white';
    attack = 3;
    recrutingPoints = 0;
    cost = 6;
}

export class hero_thor_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_common_1.png';
    team = 'avengers';
    color = 'white';
    attack = 0;
    recrutingPoints = 2;
    cost = 4;
}

export class hero_thor_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_common_2.png';
    team = 'avengers';
    color = 'green';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
}
