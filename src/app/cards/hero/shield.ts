import { Hero } from '../../models/card';

// tslint:disable-next-line:class-name
export class hero_shield_officer implements Hero {
    type = 'hero';
    image = '../../../assets/cards/hero/shield/shield_officer_maria_hill_30_md.png';
    team = 'shield';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
}
