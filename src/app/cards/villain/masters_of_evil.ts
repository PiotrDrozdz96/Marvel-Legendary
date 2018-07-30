import { Villain } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class baron_zemo implements Villain {
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

export class melter implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/masters_of_evil/villain_masters_melter.png';
    team = 'mastersOfEvil';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        const cards = board.playerDeck.draw();
        dialog.open(SelectDialog, {
            data: {
                array: cards,
                preview: this.image,
                header: 'KO card or nothing'
            }
        }).afterClosed().subscribe(choosen => {
            if (choosen === undefined) {
                board.playerDeck.unshift(cards[0]);
            } else {
                board.KO.put(cards);
            }
        });
    }
}

export class ultron implements Villain {
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

export class whirlwind implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/masters_of_evil/villain_masters_whirlwind.png';
    team = 'mastersOfEvil';
    attack = 4;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        if ((board.playerCards.some(card => card.type === 'hero')) &&
            (board.fields[2].card === this ||
             board.fields[4].card === this)) {
                open();
        }
        let KOCounter = 0;
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
                    KOCounter++;
                    const index = board.playerCards.findIndex(card => card === choosen.card);
                    board.KO.put(board.playerCards.pick(index));
                    if (KOCounter < 2 && board.playerCards.some(card => card.type === 'hero')) {
                        open();
                    }
                }
            });
        }

    }
}
