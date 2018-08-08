import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/spider_man/spider_man_rare.png';
    team: Team = 'spider';
    color: Color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const cards = board.playerDeck.slice(0, 3);
        const less = cards.filter(card => card.cost <= 2);
        const rest = cards.filter(card => card.cost > 2);
        board.playerDeck.unshift(...less, ...rest);
        for (let i = 0; i < less.length; i++) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/spider_man/spider_man_uncommon.png';
    team: Team = 'spider';
    color: Color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.victoryPile.put(board.bystandersDeck.draw());
        const card = board.playerDeck.reveal();
        if (card && card.cost <= 2) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/spider_man/spider_man_common_1.png';
    team: Team = 'spider';
    color: Color = 'green';
    attack = 0;
    recrutingPoints = 1;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.reveal();
        if (card && card.cost <= 2) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/spider_man/spider_man_common_2.png';
    team: Team = 'spider';
    color: Color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.reveal();
        if (card && card.cost <= 2) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}
