import { Hero } from '../../models/card';

// tslint:disable:class-name

export class hero_nick_fury_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_rare.png';
    team = 'shield';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 8;
}

export class hero_nick_fury_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_uncommon.png';
    team = 'shield';
    color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 6;
}

export class hero_nick_fury_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_common_1.png';
    team = 'shield';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
}

export class hero_nick_fury_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_common_2.png';
    team = 'shield';
    color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}
