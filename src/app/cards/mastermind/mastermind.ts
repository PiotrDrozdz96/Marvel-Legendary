import { Mastermind } from '../../models/card';

// tslint:disable-next-line:class-name
export class mastermind_magneto implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/magneto_mastermind.png';
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
