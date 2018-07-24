import { Box } from './box';
import * as mastermind from '../cards/mastermind';

export class MastermindBox extends Box {
    cards = [
        new mastermind.doctor_doom,
        new mastermind.loki,
        new mastermind.magneto,
        new mastermind.red_skull
    ];
}
