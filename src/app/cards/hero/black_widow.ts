import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_black_widow_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_rare.png';
    team = 'avengers';
    color = 'red';
    attack = 4;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_black_widow_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_uncommon.png';
    team = 'avengers';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
}

export class hero_black_widow_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_common_1.png';
    team = 'avengers';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_black_widow_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
}
