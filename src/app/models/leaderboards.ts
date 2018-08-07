export interface LeaderBoards {
    name: string;
    position?: number;
    win: boolean;
    score: number;
    mastermind: string;
    scheme: string;
    heroses: Array<string>;
    villains: Array<string>;
    henchmen: Array<string>;
}
