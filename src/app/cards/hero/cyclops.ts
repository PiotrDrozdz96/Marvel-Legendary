import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_cyclops_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_rare.png';
    team = 'x-men';
    color = 'white';
    attack = 6;
    recrutingPoints = 0;
    cost = 8;
}

export class hero_cyclops_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_uncommon.png';
    team = 'x-men';
    color = 'white';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
}

export class hero_cyclops_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_common_1.png';
    team = 'x-men';
    color = 'green';
    attack = 0;
    recrutingPoints = 3;
    cost = 2;
}

export class hero_cyclops_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_common_2.png';
    team = 'x-men';
    color = 'white';
    attack = 3;
    recrutingPoints = 0;
    cost = 3;
}
