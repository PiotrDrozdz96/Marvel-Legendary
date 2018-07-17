import { Card } from './card';

export class Deck<T extends Object> {

    cards: Array<T> = [];

    create(number: number, card: T) {
        const array = new Array(number);
        for (let i = 0; i < array.length; i++) {
            array[i] = Object.create(card);
        }
        this.cards = this.cards.concat(array);
    }
    push(cards: Array<T>) { this.cards = this.cards.concat(cards); }
    draw(): Array<T> {
        const newCard = this.cards.shift();
        return newCard === undefined ? [] : [newCard];
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    pick(index: number) {
        return this.cards.splice(index, 1);
    }
}
