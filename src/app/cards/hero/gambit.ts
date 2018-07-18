import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_gambit_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_rare.png';
    team = 'x-men';
    color = 'yellow';
    attack = 4;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.draw()[0];
        board.setKOimage(card.image);
        board.playerAttack += card.cost;
        board.playerDeck.cards.unshift(card);
    }
}

export class hero_gambit_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        const cards = board.playerDeck.draw();
        const DiscardDialog = dialog.open(HQDialog, {
            data: {
                cards: cards,
                preview: this.image,
                header: 'Discard card or nothing'
            }
        }).afterClosed().subscribe(card => {
            if (card === undefined) {
                board.playerDeck.cards.unshift(card);
            } else {
                board.discardPile.push([card]);
            }
            DiscardDialog.unsubscribe();
        });
    }
}

export class hero_gambit_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.draw()[0];
        if (card.team === 'x-men') {
            board.playerHand.push([card]);
        } else {
            board.playerDeck.cards.unshift(card);
        }
    }
}

export class hero_gambit_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/gambit/gambit_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.push(board.playerDeck.draw().concat(board.playerDeck.draw()));
        open();
        function open() {
            const GetBackDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.cards,
                    preview: (new hero_gambit_common_2).image,
                    header: 'Get back one card'
                }
            }).afterClosed().subscribe(card => {
                if (card === undefined) {
                    open();
                } else {
                    const index = board.playerHand.cards.findIndex(hero => hero === card);
                    board.playerDeck.cards.unshift(board.playerHand.pick(index)[0]);
                }
                GetBackDialog.unsubscribe();
            });
        }
    }
}
