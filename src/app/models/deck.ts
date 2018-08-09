import { BehaviorSubject } from 'rxjs';

export class Deck<T extends Object> extends Array<T> {

    public numberOfDrawing = 0;

    constructor(...items: Array<T>) {
        super(...items);
        Object.setPrototypeOf(this, Object.create(Deck.prototype));
    }

    /* Array methods chenged to Deck methods */
    concat(...items: Deck<T>[]): Deck<T> {
        return new Deck<T>(...[].concat((this as Array<T>), ...items));
    }

    filter(callbackfn: (value: T, index: number, array: Deck<T>) => any, thisArg?: any): Deck<T> {
        return new Deck<T>(...[].concat(this as Array<T>).filter(callbackfn, thisArg));
    }

    map<U>(callbackfn: (value: T, index: number, array: Deck<T>) => any, thisArg?: any, isDeck?: boolean): Deck<U> | U[] {
        return isDeck ? new Deck<T>(...[].concat(this as Array<T>).map(callbackfn, thisArg)) :
            [].concat(this as Array<T>).map(callbackfn, thisArg);
    }

    /* Array methods changing original Deck */
    /* filter */
    sift(callbackfn: (value: T, index: number, array: Deck<T>) => any, thisArg?: any): void {
        const siftArr = (this as Array<T>).filter(callbackfn, thisArg);
        this.take();
        this.put(siftArr);
    }
    /* map */
    replace(callbackfn: (value: T, index: number, array: Deck<T>) => any, thisArg?: any): void {
        const replacedArr = (this as Array<T>).map(callbackfn, thisArg);
        this.take();
        this.put(replacedArr);
    }

    /* new methods */
    create(number: number, card: T): void {
        const arr = new Array(number);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Object.create(card);
        }
        this.put(arr);
    }
    take(): Array<T> { return this.splice(0, this.length); }
    draw(): Array<T> {
        if (this.length === 0) { this.runsOut(); }
        const newCard = this.shift();
        this.numberOfDrawing++;
        return newCard === undefined ? [] : [newCard];
    }
    runsOut(): void { }
    reveal(): T {
        if (this.length === 0) { this.runsOut(); }
        return this[0];
    }
    pick(index: number): Array<T> {
        return this.splice(index, 1);
    }
    put(arr: Array<T>, condition?: boolean): void {
        this.push(...arr);
    }
    shuffle(): void {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }

}
