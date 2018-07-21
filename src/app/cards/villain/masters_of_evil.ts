import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class villain_masters_baron_zemo implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/masters_of_evil/villain_masters_baron_zemo.png';
    team = 'mastersOfEvil';
    attack = 6;
    points = 4;
    fight(board: BoardService, dialog: MatDialog) {
        board.playerCards.filter(card => card.team === 'avengers').forEach(avengers => {
            board.victoryPile.put(board.bystandersDeck.draw());
        });
    }
}

export class villain_masters_melter implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/masters_of_evil/villain_masters_melter.png';
    team = 'mastersOfEvil';
    attack = 5;
    points = 3;
}

export class villain_masters_ultron implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/masters_of_evil/villain_masters_ultron.png';
    team = 'mastersOfEvil';
    attack = 6;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        this.points += board.playerHand.concat(board.playerDeck.concat(board.discardPile))
            .filter(card => card.color === 'grey').length;
    }
    escape(board: BoardService, dialog: MatDialog) {
        this.fight(board, dialog);
        if (!board.playerCards.find(card => card.color === 'grey')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
}

export class villain_masters_whirlwind implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/masters_of_evil/villain_masters_whirlwind.png';
    team = 'mastersOfEvil';
    attack = 4;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        if ((board.fields[2].card && board.fields[2].card === this) ||
            (board.fields[4].card && board.fields[4].card === this)) {
                open();
        }
        let KOCounter = 0;
        function open() {
            const DiscardDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerCards.filter(card => card.type === 'hero'),
                    preview: '',
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    KOCounter++;
                    const index = board.playerCards.findIndex(card => card === hero);
                    board.KO.put(board.playerCards.pick(index));
                    DiscardDialog.unsubscribe();
                    if (KOCounter < 2) {
                        open();
                    }
                }
            });
        }

    }
}
