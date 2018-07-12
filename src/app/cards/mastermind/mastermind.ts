import { Mastermind, Card } from '../../models/card';

// tslint:disable:class-name

export class master_strike implements Card {
    type = 'masterStrike';
    image = '/assets/cards/mastermind/master_strike.png';
}

export class mastermind_doctor_doom implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/doctor_doom/mastermind_doctor_doom.png';
    attack = 9;
    points = 5;
    alwaysLeads = 'doombotLegion';
    tactics = [
        function() {},
        function() {},
        function() {},
        function() {}
    ];
    masterStrike() { }
}

export class mastermind_loki implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/loki/mastermind_loki.png';
    attack = 10;
    points = 5;
    alwaysLeads = 'enemiesOfAsgard';
    tactics = [
        function() {},
        function() {},
        function() {},
        function() {}
    ];
    masterStrike() { }
}

export class mastermind_magneto implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/magneto/mastermind_magneto.png';
    attack = 8;
    points = 5;
    alwaysLeads = 'brotherhood';
    tactics = [
        function() {},
        function() {},
        function() {},
        function() {}
    ];
    masterStrike() { }
}

export class mastermind_red_skull implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/red_skull/mastermind_red_skull.png';
    attack = 7;
    points = 5;
    alwaysLeads = 'hydra';
    tactics = [
        function() {},
        function() {},
        function() {},
        function() {}
    ];
    masterStrike() { }
}
