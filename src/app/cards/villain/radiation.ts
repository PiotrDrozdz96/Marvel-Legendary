import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class villain_radiation_abomination implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_abomination.png';
    team = 'radiation';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if ((board.fields[3].card && board.fields[3].card === this) ||
            (board.fields[4].card && board.fields[4].card === this)) {
            board.victoryPile.push(board.bystandersDeck.draw().concat(board.bystandersDeck.draw().concat(board.bystandersDeck.draw())));
        }
    }
}

export class villain_radiation_maestro implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_maestro.png';
    team = 'radiation';
    attack = 6;
    points = 4;
    fight(board: BoardService, dialog: MatDialog) {
        let length = board.playerCards.cards.filter(card => card.color === 'green').length;
        if (length > 0) {
            open();
        }
        function open() {
            const KODialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerCards.cards.filter(card => card.type === 'hero'),
                    preview: '',
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    length--;
                    const index = board.playerCards.cards.findIndex(card => card === hero);
                    board.KO.push(board.playerCards.pick(index));
                    KODialog.unsubscribe();
                    if (length > 0) {
                        open();
                    }
                }
            });
        }
    }
}

export class villain_radiation_theleader implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_theleader.png';
    team = 'radiation';
    attack = 4;
    points = 2;
    ambush(board: BoardService, dialog: MatDialog) {
        board.nextTurnObs.next(true);
    }
}

export class villain_radiation_zzzax implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_zzzax.png';
    team = 'radiation';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.playerCards.cards.find(card => card.color === 'green')) {
            board.discardPile.push(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}
