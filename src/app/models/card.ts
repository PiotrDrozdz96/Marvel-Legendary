import { BoardService } from '../board.service';

export interface Card {
    type: string;
    image: string;
}

export interface Tactic {
    image: string;
    func();
}

export interface Hero extends Card {
    // type: 'hero' || 'wound;
    team?: string;
    color?: string;
    attack: number;
    recrutingPoints: number;
    cost: number;
    func?();
}

export interface Mastermind extends Card {
    // type: 'mastermind';
    attack: number;
    points: number;
    alwaysLeads: string;
    tactics: Array<Tactic>;
    masterStrike();
}

export interface Villain extends Card {
    // type: 'villain';
    team: string;
    attack: number;
    points: number;
    fight?();
    ambush?();
    escape?();
}

export interface Scheme extends Card {
    // type: 'scheme';
    counterTwist: number;
    twists: Array<() => void>;
    setup(board: BoardService);
}

export interface Bystander extends Card {
    // type: 'bystander';
    points: number;
}
