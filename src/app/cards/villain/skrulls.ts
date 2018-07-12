import { Villain } from '../../models/card';

// tslint:disable:class-name

export class villain_skrull_power_skrull implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_power_skrull.png';
    team = 'skrulls';
    attack = 8;
    points = 3;
}

export class villain_skrull_queen_veranke implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_queen_veranke.png';
    team = 'skrulls';
    attack = 0;
    points = 4;
}

export class villain_skrull_shapeshifters implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_shapeshifters.png';
    team = 'skrulls';
    attack = 0;
    points = 2;
}

export class villain_skrull_super_skrull implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_super_skrull.png';
    team = 'skrulls';
    attack = 4;
    points = 2;
}
