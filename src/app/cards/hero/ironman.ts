import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_rare.png';
    team: Team = 'avengers';
    color: Color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        const length = board.checkPlayedCards('color', 'grey') ? 4 : 2;
        for (let i = 0; i < length; i++) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_uncommon.png';
    team: Team = 'avengers';
    color: Color = 'grey';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.filter(card => card.color === 'grey').length;
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_common_1.png';
    team: Team = 'avengers';
    color: Color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        const length = board.checkPlayedCards('color', 'grey') ? 2 : 1;
        for (let i = 0; i < length; i++) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_common_2.png';
    team: Team = 'avengers';
    color: Color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'white')) {
            board.playerAttack++;
        }
    }
}
