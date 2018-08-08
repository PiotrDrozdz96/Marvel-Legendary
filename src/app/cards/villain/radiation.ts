import { Villain } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class abomination implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_abomination.png';
    team = 'radiation';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if ((board.fields[3].card && board.fields[3].card === this) ||
            (board.fields[4].card && board.fields[4].card === this)) {
            board.victoryPile.put(board.bystandersDeck.draw().concat(board.bystandersDeck.draw().concat(board.bystandersDeck.draw())));
        }
    }
}

export class maestro implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_maestro.png';
    team = 'radiation';
    attack = 6;
    points = 4;
    fight(board: BoardService, dialog: MatDialog) {
        let length = board.playerCards.filter(card => card.color === 'green').length;
        if (length > 0 && board.playerCards.some(card => card.type === 'hero')) {
            open();
        }
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerCards.filter(card => card.type === 'hero'),
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    length--;
                    const index = board.playerCards.findIndex(card => card === choosen.card);
                    board.KO.put(board.playerCards.pick(index));
                    if (length > 0 && board.playerCards.some(card => card.type === 'hero')) {
                        open();
                    }
                }
            });
        }
    }
}

export class theleader implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_theleader.png';
    team = 'radiation';
    attack = 4;
    points = 2;
    ambush(board: BoardService, dialog: MatDialog) {
        board.drawVillainObs.next(true);
    }
}

export class zzzax implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/radiation/villain_radiation_zzzax.png';
    team = 'radiation';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.playerReveal('color', 'green')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}
