import { BoxObject } from './box';
import * as henchmen from '../cards/villain/henchmen';

export class HenchmenBox extends BoxObject {
    cards = {
        doombot_legion: new henchmen.doombot_legion,
        hand_ninjas: new henchmen.hand_ninjas,
        savage_land_mutants: new henchmen.savage_land_mutants,
        sentinel: new henchmen.sentinel
    };
}
