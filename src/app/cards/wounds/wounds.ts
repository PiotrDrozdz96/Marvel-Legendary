import { Hero } from '../../models/card';

// tslint:disable-next-line:class-name
export class wound implements Hero {
    type = 'wound';
    team = 'wound';
    image = '/assets/cards/wounds/wound.png';
    attack = 0;
    recrutingPoints = 0;
    cost = 0;
}
