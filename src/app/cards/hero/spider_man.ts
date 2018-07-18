import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class hero_spider_man_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_rare.png';
    team = 'spider';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const cards = [...board.playerDeck.draw(), ...board.playerDeck.draw(), ...board.playerDeck.draw()];
        const less = cards.filter(card => card.cost <= 2);
        const rest = cards.filter(card => card.cost > 2);
        board.playerHand.push(less);
        for (let i = 0; i < rest.length; i++) {
            board.playerDeck.cards.unshift(rest[i]);
        }
    }
}

export class hero_spider_man_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_uncommon.png';
    team = 'spider';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.victoryPile.push(board.bystandersDeck.draw());
        const card = board.playerDeck.draw()[0];
        if (card.cost <= 2) {
            board.playerHand.push([card]);
        } else {
            board.playerDeck.cards.unshift(card);
        }
    }
}

export class hero_spider_man_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_common_1.png';
    team = 'spider';
    color = 'green';
    attack = 0;
    recrutingPoints = 1;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.draw()[0];
        if (card.cost <= 2) {
            board.playerHand.push([card]);
        } else {
            board.playerDeck.cards.unshift(card);
        }
    }
}

export class hero_spider_man_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/spider_man/spider_man_common_2.png';
    team = 'spider';
    color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.draw()[0];
        if (card.cost <= 2) {
            board.playerHand.push([card]);
        } else {
            board.playerDeck.cards.unshift(card);
        }
    }
}
