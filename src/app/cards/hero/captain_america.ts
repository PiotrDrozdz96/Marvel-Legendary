import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/captain_america/captain_america_rare.png';
    team: Team = 'avengers';
    color: Color = 'red';
    attack = 3;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.filter(card => card.team === 'avengers').length * 3;
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/captain_america/captain_america_uncommon.png';
    team: Team = 'avengers';
    color: Color = 'grey';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        const index = () => board.playerHand.findIndex(card => card.type === 'wound');
        while (index() !== -1) {
            board.discardPile.put(board.playerHand.pick(index()));
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/captain_america/captain_america_common_1.png';
    team: Team = 'avengers';
    color: Color = 'yellow';
    attack = 0;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        const temp = {};
        board.playerRecrutingPoints += (board.playerCards.concat(board.playerHand)
            .map(card => card.color) as Array<string>).concat([this.color]).reduce((arr, current) => {
                if (temp[current]) {
                    return arr;
                } else {
                    temp[current] = true;
                    return [...arr, current];
                }
            }, []).length;
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/captain_america/captain_america_common_2.png';
    team: Team = 'avengers';
    color: Color = 'green';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        const temp = {};
        board.playerAttack += (board.playerCards.concat(board.playerHand)
            .map(card => card.color) as Array<string>).concat([this.color]).reduce((arr, current) => {
                if (temp[current]) {
                    return arr;
                } else {
                    temp[current] = true;
                    return [...arr, current];
                }
            }, []).length;
    }
}
