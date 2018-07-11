import { Card } from './card';

export class Deck<T> {

    deck: Array<T> = [];

    create(number: number, card: T) {
        const array = new Array(number);
        for (let i = 0; i < array.length; i++) {
            array[i] = Object.assign({}, card);
        }
        this.deck = this.deck.concat(array);
    }
    push(cards: Array<T>) { this.deck = this.deck.concat(cards); }
    draw(): T { return this.deck.shift(); }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}
