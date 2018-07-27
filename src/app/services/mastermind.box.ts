import { BoxArray } from './box';
import * as mastermind from '../cards/mastermind';

export class MastermindBox extends BoxArray {
    cards = [
        new mastermind.doctor_doom,
        new mastermind.loki,
        new mastermind.magneto,
        new mastermind.red_skull
    ];
}
