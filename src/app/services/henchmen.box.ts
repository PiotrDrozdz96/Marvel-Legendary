import { Box } from './box';
import * as henchmen from '../cards/villain/henchmen';

export class HenchmenBox extends Box {
    cards = [
        new henchmen.doombot_legion,
        new henchmen.hand_ninjas,
        new henchmen.savage_land_mutants,
        new henchmen.sentinel
    ];
}
