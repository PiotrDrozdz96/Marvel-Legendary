export interface Card {
    type: string;
    image: string;
}

export interface Hero extends Card {
    type: 'hero';
    team: string;
    color: string;
    attack: number;
    recrutingPoints: number;
    func?();
}

export interface MasterMind extends Card {
    type: 'masterMind';
    attack: number;
    points: number;
    alwaysLeads: string;
    masterStrike();
}

export interface Villan extends Card {
    type: 'villan';
    team: string;
    attack: number;
    points: number;
    fight?();
    ambush?();
    escape?();
}

export interface Scheme extends Card {
    type: 'scheme';
    counterTwist: number;
    twists: Array<() => void>;
}

export interface Bystanders extends Card {
    type: 'bystanders';
    points: number;
}

export interface CardInVillanDeck extends Card {
    type: 'villan' | 'bystanders' | 'masterStrike' | 'schemeTwist';
    /* villan type extends Villan interface */
    /* bystanders type extends Bystranders interface */
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

export interface Wounds extends Card {
    type: 'wounds';
}
