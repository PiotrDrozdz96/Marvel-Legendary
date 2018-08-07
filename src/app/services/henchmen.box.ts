import { Box } from './box';
import { Group } from '../models/group';
import { Villain } from '../models/card';
import * as henchmen from '../cards/villain/henchmen';

export class HenchmenBox extends Box {

    cards = {
        doombot_legion: new Group<Villain>({
            name: 'Doombot Legion',
            image: 'assets/cards/villain/henchman/doombot_legion.png',
            cards: [ new henchmen.doombot_legion]
        }),
        hand_ninjas: new Group<Villain>({
            name: 'Hand Ninjas',
            image: 'assets/cards/villain/henchman/hand_ninjas.png',
            cards: [new henchmen.hand_ninjas]
        }),
        savage_land_mutants: new Group<Villain>({
            name: 'Savage Land Mutants',
            image: 'assets/cards/villain/henchman/savage_land_mutants.png',
            cards: [new henchmen.savage_land_mutants]
        }),
        sentinel: new Group<Villain>({
            name: 'Sentinel',
            image: 'assets/cards/villain/henchman/sentinel.png',
            cards: [new henchmen.sentinel]
        })
    };
}
