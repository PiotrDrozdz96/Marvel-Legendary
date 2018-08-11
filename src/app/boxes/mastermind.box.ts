import { Box } from '../models/box';
import * as mastermind from '../cards/mastermind';

export class MastermindBox extends Box {
    cards = {
        doctor_doom: new mastermind.doctor_doom,
        loki: new mastermind.loki,
        magneto: new mastermind.magneto,
        red_skull: new mastermind.red_skull
    };
}
