import { Hero, Team } from '../../models/card';

// tslint:disable:class-name

export class hero_shield_officer implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/shield/shield_officer.png';
    team: Team = 'shield';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
}

export class hero_shield_agent implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/shield/shield_agent.png';
    team: Team = 'shield';
    attack = 0;
    recrutingPoints = 1;
    cost = 0;
}

export class hero_shield_trooper implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/shield/shield_trooper.png';
    team: Team = 'shield';
    attack = 1;
    recrutingPoints = 0;
    cost = 0;
}
