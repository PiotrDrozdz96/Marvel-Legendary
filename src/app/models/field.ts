import { Card, Bystander } from './card';

export class Field {
    card = null;
    bystanders: Array<Bystander> = [];
    additionalCard: Array<Card> = [];
    attack = 0;

    constructor(public place: string) {}
}
