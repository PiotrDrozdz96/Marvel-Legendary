export abstract class Box {
    cards: Array<any>;

    pick(index: number) { return this.cards.splice(index, 1); }
}
