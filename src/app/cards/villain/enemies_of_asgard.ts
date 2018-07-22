import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class destroyer implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/enemies_of_asgard/villain_asgard_destroyer.png';
    team = 'enemiesOfAsgard';
    attack = 7;
    points = 5;
    fight(board: BoardService, dialog: MatDialog) {
        const shieldCards = board.playerCards.filter(card => card.team === 'shield');
        const restCards = board.playerCards.filter(card => card.team !== 'shield');
        board.KO.put(shieldCards);
        board.playerCards = restCards;
    }
    escape(board: BoardService, dialog: MatDialog) {
        let KOCounter = 0;
        open();
        function open() {
            const DiscardDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.filter(card => card.type === 'hero'),
                    preview: '',
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    KOCounter++;
                    const index = board.playerHand.findIndex(card => card === hero);
                    board.KO.put(board.playerHand.pick(index));
                    DiscardDialog.unsubscribe();
                    if (KOCounter < 2) {
                        open();
                    }
                }
            });
        }
    }
}

export class enchantress implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/enemies_of_asgard/villain_asgard_enchantress.png';
    team = 'enemiesOfAsgard';
    attack = 6;
    points = 4;
    fight(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw().concat(board.playerDeck.draw(), board.playerDeck.draw()));
    }
}

export class frost_giant implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/enemies_of_asgard/villain_asgard_frost_giant.png';
    team = 'enemiesOfAsgard';
    attack = 4;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.playerCards.concat(board.playerHand).find(card => card.color === 'white')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}

export class ymir implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/enemies_of_asgard/villain_asgard_ymir.png';
    team = 'enemiesOfAsgard';
    attack = 6;
    points = 4;
    ambush(board: BoardService, dialog: MatDialog) {
        if (!board.playerHand.find(card => card.color === 'white')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
    fight(board: BoardService, dialog: MatDialog) {
        const playerHand = board.playerHand.filter( card => card.type !== 'wound');
        const playerCards = board.playerCards.filter( card => card.type !== 'wound');
        const discardPile = board.discardPile.filter( card => card.type !== 'wound');
        board.playerHand = playerHand;
        board.playerCards = playerCards;
        board.discardPile = discardPile;
    }
}
