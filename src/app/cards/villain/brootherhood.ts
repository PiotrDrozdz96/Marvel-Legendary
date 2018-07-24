import { Villain } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class blob implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/brotherhood/villain_brotherhood_blob.png';
    team = 'brotherhood';
    attack = 4;
    points = 2;
}

export class juggernaut implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/brotherhood/villain_brotherhood_juggernaut.png';
    team = 'brotherhood';
    attack = 6;
    points = 4;
    ambush(board: BoardService, dialog: MatDialog) {
        let KOCounter = 0;
        if (board.discardPile.some(card => card.type === 'hero')) {
            open();
        }
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.discardPile.filter(card => card.type === 'hero'),
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    KOCounter++;
                    const index = board.discardPile.findIndex(card => card === choosen.card);
                    board.KO.put(board.discardPile.pick(index));
                    if (KOCounter < 2 && board.discardPile.some(card => card.type === 'hero')) {
                        open();
                    }
                }
            });
        }
    }
    escape(board: BoardService, dialog: MatDialog) {
        let KOCounter = 0;
        if (board.playerHand.some(card => card.type === 'hero')) {
            open();
        }

        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand.filter(card => card.type === 'hero'),
                    header: 'KOs Hero'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    KOCounter++;
                    const index = board.playerHand.findIndex(card => card === choosen.card);
                    board.KO.put(board.playerHand.pick(index));
                    if (KOCounter < 2 && board.playerHand.some(card => card.type === 'hero')) {
                        open();
                    }
                }
            });
        }
    }
}

export class mystique implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/brotherhood/villain_brotherhood_mystique.png';
    team = 'brotherhood';
    attack = 5;
    points = 3;
    escape(board: BoardService, dialog: MatDialog) {
        board.scheme.counterTwist++;
        board.scheme.twist(board);
    }
}

export class sabertooth implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/brotherhood/villain_brotherhood_sabertooth.png';
    team = 'brotherhood';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.playerHand.concat(board.playerCards).find(card => card.team === 'x-men')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}
