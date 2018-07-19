import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_emma_frost_rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_rare.png';
    team = 'x-men';
    color = 'green';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    defeatedVillain = 0;
    func(board: BoardService, dialog: MatDialog) { }
}

export class hero_emma_frost_uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerHand.cards.concat(board.playerCards.cards).find(card => card.team === 'x-men')) {
            board.playerHand.push(board.playerDeck.draw());
        }
    }
}

export class hero_emma_frost_common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 0;
    recrutingPoints = 1;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.push(board.playerDeck.draw());
    }
}

export class hero_emma_frost_common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'red')) {
            const DrawDialog = dialog.open(HQDialog, {
                data: {
                    cards: [new hero_emma_frost_common_2],
                    preview: this.image,
                    header: 'Draw Villain and get +2 attack or nothing'
                }
            }).afterClosed().subscribe(card => {
                if (!card === undefined) {
                    board.nextTurnObs.next(true);
                    board.playerAttack += 2;
                }
                DrawDialog.unsubscribe();
            });
        }
    }
}
