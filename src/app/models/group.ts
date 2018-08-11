export interface SimpleGroup<T> {
    cards: Array<T>;
    name: string;
    image: string;
}


export class Group<T> extends Array<T> {

    name: string;
    image: string;

    constructor(simpleGroup: SimpleGroup<T>) {
        super(...simpleGroup.cards);
        this.name = simpleGroup.name;
        this.image = simpleGroup.image;
        Object.setPrototypeOf(this, Object.create(Group.prototype));
    }

    /* Array methods chenged to Group methods */
    concat(...items: Group<T>[]): Array<T> {
        return [].concat((this as Array<T>), items);
    }

    filter(callbackfn: (value: T, index: number, array: Group<T>) => any, thisArg?: any): Array<T> {
        return [].concat(this as Array<T>).filter(callbackfn, thisArg);
    }

    map<U>(callbackfn: (value: T, index: number, array: Group<T>) => any, thisArg?: any): U[] {
        return [].concat(this as Array<T>).map(callbackfn, thisArg);
    }

}
