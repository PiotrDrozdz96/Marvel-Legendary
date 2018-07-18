import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class hero_hawkeye_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_rare.png';
    team = 'avengers';
    color = 'grey';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    defeatedVillain = 0;
    func(board: BoardService, dialog: MatDialog) {
        this.defeatedVillain = board.victoryPile.cards.filter(card => card.type === 'mastermind' || card.type === 'villain').length;
        const Obs = board.nextTurn().subscribe(sub => {
            const length = board.victoryPile.cards.filter(card =>
                card.type === 'mastermind' || card.type === 'villain').length - this.defeatedVillain;
            for (let i = 0; i < length; i++) {
                board.victoryPile.push([...board.bystandersDeck.draw(), ...board.bystandersDeck.draw(), ...board.bystandersDeck.draw()]);
            }
            this.defeatedVillain = 0;
            Obs.unsubscribe();
        });
    }
}

export class hero_hawkeye_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_uncommon.png';
    team = 'avengers';
    color = 'grey';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'grey')) {
            board.playerHand.push(board.playerDeck.draw());
        }
    }
}

export class hero_hawkeye_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_common_1.png';
    team = 'avengers';
    color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.push(board.playerDeck.draw());
    }
}

export class hero_hawkeye_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/hawkeye/hawkeye_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.team === 'avengers')) {
            board.playerAttack++;
        }
    }
}
