import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BoardService } from '../services/board.service';
import { BoxService } from '../services/box.service';
import { scheme_twist } from '../cards/scheme';

export interface Card {
    type: string;
    image: string;
}

export interface Tactic {
    image: string;
    func(board: BoardService, dialog: MatDialog, tactic: Tactic);
}

export interface AlwaysLeads {
    group: string;
    name: string;
}

export interface Hero extends Card {
    // type: 'hero' || 'wound;
    team?: string;
    color?: string;
    attack: number;
    recrutingPoints: number;
    cost: number;
    func?(board: BoardService, dialog: MatDialog);
    discard?(board: BoardService, card?): boolean;
    sub?(board: BoardService): Subscription;
}

export interface Mastermind extends Card {
    // type: 'mastermind';
    alwaysLeads: AlwaysLeads;
    attack: number;
    additionalAttack: number;
    points: number;
    bystanders?: Array<Bystander>;
    additionalCard?: Array<Card>;
    tactics: Array<Tactic>;
    masterStrike(board: BoardService, dialog: MatDialog);
}

export interface Villain extends Card {
    // type: 'villain';
    team: string;
    attack: number;
    points: number;
    fightCondition?(board: BoardService);
    fight?(board: BoardService, dialog: MatDialog);
    ambush?(board: BoardService, dialog: MatDialog);
    escape?(board: BoardService, dialog: MatDialog);
}

export interface Scheme extends Card {
    // type: 'scheme';
    counterTwist: number;
    alwaysLeads?: AlwaysLeads;
    twist(board: BoardService, card: scheme_twist, dialog?: MatDialog);
    setup(board: BoardService, dialog?: MatDialog, box?: BoxService);
}

export interface Bystander extends Card {
    // type: 'bystander';
    points: number;
}
