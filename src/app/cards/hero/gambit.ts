import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_gambit_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_rare.png';
    team = 'x-men';
    color = 'yellow';
    attack = 4;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_gambit_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_gambit_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
}

export class hero_gambit_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
}
