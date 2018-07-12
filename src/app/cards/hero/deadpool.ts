import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_deadpool_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_rare.png';
    color = 'yellow';
    attack = 6;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_deadpool_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_uncommon.png';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_deadpool_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_common_1.png';
    color = 'grey';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
}

export class hero_deadpool_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_common_2.png';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 5;
}
