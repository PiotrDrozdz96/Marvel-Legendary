import { Mastermind, MastermindTactic } from '../../../models/card';

// tslint:disable-next-line:class-name
export class mastermind_magneto implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/magneto/magneto_mastermind.png';
    attack = 8;
    points = 5;
    alwaysLeads = 'brotherhood';
    masterStrike() { }
}

// tslint:disable-next-line:class-name
export class magneto_tactic_1 implements MastermindTactic {
    type = ' mastermindTactic';
    image = '/assets/cards/mastermind/magneto/magneto_tactic_1.png';
    func() { }
}

// tslint:disable-next-line:class-name
export class magneto_tactic_2 implements MastermindTactic {
    type = ' mastermindTactic';
    image = '/assets/cards/mastermind/magneto/magneto_tactic_2.png';
    func() { }
}

// tslint:disable-next-line:class-name
export class magneto_tactic_3 implements MastermindTactic {
    type = ' mastermindTactic';
    image = '/assets/cards/mastermind/magneto/magneto_tactic_3.png';
    func() { }
}

// tslint:disable-next-line:class-name
export class magneto_tactic_4 implements MastermindTactic {
    type = ' mastermindTactic';
    image = '/assets/cards/mastermind/magneto/magneto_tactic_4.png';
    func() { }
}
