import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class hero_ironman_rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_rare.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        const length = board.playerCards.cards.find(card => card.color === 'grey') ? 4 : 2;
        for (let i = 0; i < length; i++) {
            board.playerHand.push(board.playerDeck.draw());
        }
    }
}

export class hero_ironman_uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_uncommon.png';
    team = 'avengers';
    color = 'grey';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.cards.filter(card => card.color === 'grey').length;
    }
}

export class hero_ironman_common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_common_1.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        const length = board.playerCards.cards.find(card => card.color === 'grey') ? 2 : 1;
        for (let i = 0; i < length; i++) {
            board.playerHand.push(board.playerDeck.draw());
        }
    }
}

export class hero_ironman_common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/ironman/ironman_common_2.png';
    team = 'avengers';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'white')) {
            board.playerAttack++;
        }
    }
}
