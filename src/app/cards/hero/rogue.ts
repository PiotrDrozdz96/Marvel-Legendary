import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_rogue_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_rare.png';
    team = 'x-men';
    color = 'green';
    attack = 4;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.push(board.playerDeck.draw());
    }
}

export class hero_rogue_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_uncommon.png';
    team = 'x-men';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        open();
        function open() {
            const ChooseDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerCards.cards,
                    preview: '',
                    header: 'Copy Card'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    board.playerAttack += hero.attack;
                    board.playerRecrutingPoints += hero.recrutingPoints;
                    hero.func(board, dialog);
                }
                ChooseDialog.unsubscribe();
            });
        }
    }
}

export class hero_rogue_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_common_1.png';
    team = 'x-men';
    color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'green')) {
            board.playerAttack += 3;
        }
    }
}

export class hero_rogue_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/rogue/rogue_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'red')) {
            const KODialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.cards.concat(board.discardPile.cards),
                    preview: '',
                    header: 'KO one Card or nothing'
                }
            }).afterClosed().subscribe(hero => {
                if (!hero === undefined) {
                    let index = board.discardPile.cards.findIndex(card => card === hero);
                    if (index !== -1) {
                        board.KO.push(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.cards.findIndex(card => card === hero);
                        board.KO.push(board.playerHand.pick(index));
                    }
                    board.playerRecrutingPoints ++;
                }
                KODialog.unsubscribe();
            });
        }
    }
}
