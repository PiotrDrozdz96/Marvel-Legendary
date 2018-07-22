import { Hero } from '../../models/card';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_rare.png';
    team = 'x-men';
    color = 'yellow';
    attack = 0;
    recrutingPoints = 0;
    cost = 8;
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 5;
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_common_1.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_common_2.png';
    team = 'x-men';
    color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 2;
}
