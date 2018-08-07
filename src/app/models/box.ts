export abstract class Box {
    cards: Object;

    pick(index: number) {
        const key = this.key(index);
        return this.pickByKey(key);
    }

    pickByKey(key: string) {
        const result = this.cards[key];
        delete this.cards[key];
        return result;
    }

    key(index: number) {
        return Object.keys(this.cards)[index];
    }
}
