import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_emma_frost_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/emma_frost/emma_frost_rare.png';
    team = 'x-men';
    color = 'green';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_emma_frost_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/emma_frost/emma_frost_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
}

export class hero_emma_frost_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/emma_frost/emma_frost_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 0;
    recrutingPoints = 1;
    cost = 3;
}

export class hero_emma_frost_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/emma_frost/emma_frost_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
}
