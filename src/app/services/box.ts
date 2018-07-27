export abstract class BoxArray {
    cards: Array<any>;

    pick(index: number) { return this.cards.splice(index, 1); }
}

export abstract class BoxObject {
    cards: Object;

    pick(index: number) {
        const key = Object.keys(this.cards)[index];
        return this.pickByKey(key);
    }

    pickByKey(key: string) {
        const result = this.cards[key];
        delete this.cards[key];
        return result;
    }
}
