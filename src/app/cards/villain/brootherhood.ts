import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class villain_brotherhood_blob implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/brotherhood/villain_brotherhood_blob.png';
    team = 'brotherhood';
    attack = 4;
    points = 2;
}

export class villain_brotherhood_juggernaut implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/brotherhood/villain_brotherhood_juggernaut.png';
    team = 'brotherhood';
    attack = 6;
    points = 4;
    ambush(board: BoardService, dialog: MatDialog) {
        let KOCounter = 0;
        function open() {
            const DiscardDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.discardPile.cards.filter(card => card.type === 'hero'),
                    preview: '',
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    KOCounter++;
                    const index = board.discardPile.cards.findIndex(card => card === hero);
                    board.KO.push(board.discardPile.pick(index));
                    DiscardDialog.unsubscribe();
                    if (KOCounter < 2 && board.discardPile.cards.length > 0) {
                        open();
                    }
                }
            });
        }
        if (board.discardPile.cards.length > 0) {
            open();
        }
    }
    escape(board: BoardService, dialog: MatDialog) {
        let KOCounter = 0;
        open();
        function open() {
            const DiscardDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.cards.filter(card => card.type === 'hero'),
                    preview: '',
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    KOCounter++;
                    const index = board.playerHand.cards.findIndex(card => card === hero);
                    board.KO.push(board.playerHand.pick(index));
                    DiscardDialog.unsubscribe();
                    if (KOCounter < 2) {
                        open();
                    }
                }
            });
        }
    }
}

export class villain_brotherhood_mystique implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/brotherhood/villain_brotherhood_mystique.png';
    team = 'brotherhood';
    attack = 5;
    points = 3;
    escape(board: BoardService, dialog: MatDialog) {
        board.scheme.counterTwist++;
        board.scheme.twist(board);
    }
}

export class villain_brotherhood_sabertooth implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/brotherhood/villain_brotherhood_sabertooth.png';
    team = 'brotherhood';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.playerHand.cards.concat(board.playerCards.cards).find(card => card.team === 'x-men')) {
            board.discardPile.push(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}
