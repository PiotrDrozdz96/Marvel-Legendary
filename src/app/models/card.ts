export interface Card {
    type: string;
    image: string;
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
    tactics: Array<() => any>;
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
}

export interface Bystander extends Card {
    // type: 'bystander';
    points: number;
}

export interface CardInVillainDeck extends Card {
    /* type: 'villain' | 'bystanders' | 'masterStrike' | 'schemeTwist'; */
    /* villain type extends Villain interface */
    /* bystander type extends Bystrander interface */
    team?: string;
    attack?: number;
    points?: number;
    fight?();
    ambush?();
    escape?();
    /* masterStrike type have function masterStrike() */
    masterStrike?();
    /* schemeTwist type have function twist() */
    twist?();
}
