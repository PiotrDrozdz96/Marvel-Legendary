import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_captain_america_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/captain_america/captain_america_rare.png';
    team = 'avengers';
    color = 'red';
    attack = 3;
    recrutingPoints = 0;
    cost = 7;
}

export class hero_captain_america_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/captain_america/captain_america_uncommon.png';
    team = 'avengers';
    color = 'grey';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
}

export class hero_captain_america_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/captain_america/captain_america_common_1.png';
    team = 'avengers';
    color = 'yellow';
    attack = 0;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_captain_america_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/captain_america/captain_america_common_2.png';
    team = 'avengers';
    color = 'green';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
}
