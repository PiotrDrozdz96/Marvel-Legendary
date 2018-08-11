export type GroupName = 'heroses' | 'villains' | 'henchmen';

export class LeaderBoards {
    name: string;
    position?: number;
    win: boolean;
    score: number;
    mastermind: string;
    scheme: string;
    heroses: Array<string>;
    villains: Array<string>;
    henchmen: Array<string>;

    constructor() {
        this.name = 'Anonim';
        this.win = false;
        this.score = 0;
        this.mastermind = '';
        this.scheme = '';
        this.heroses = [];
        this.villains = [];
        this.henchmen = [];
    }

    push(group: GroupName, name: string) {
        this[group].push(name);
        this[group].sort();
    }
}
