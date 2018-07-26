import { Hero } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/deadpool/deadpool_rare.png';
    color = 'yellow';
    attack = 6;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        dialog.open(SelectDialog, {
            data: {
                array: board.playerHand,
                preview: this.image,
                header: 'Replace hero or nothing'
            }
        }).afterClosed().subscribe(choosen => {
            if (choosen !== undefined) {
                board.playerHand.put(board.woundsDeck.draw());
                board.playerHand.pick(choosen.index);
                board.playerHand.put(board.heroDeck.draw());
            }
        });
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/deadpool/deadpool_uncommon.png';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.length === 0) {
            dialog.open(SelectDialog, {
                data: {
                    array: [this],
                    preview: this.image,
                    header: 'discard or nothing'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen !== undefined) {
                    board.discardPile.put(board.playerHand.take());
                    for (let i = 0; i < 4; i++) {
                        board.playerHand.put(board.playerDeck.draw());
                    }
                }
            });
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/deadpool/deadpool_common_1.png';
    color = 'grey';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.fields.find(field => field.card)) {
            open();
        }
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.fields.filter(field => field.card).map(field => field.card),
                    preview: (new common_1).image,
                    header: 'Choose Villain which capture bystanders'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    const index = board.fields.findIndex(field => field.card === choosen.card);
                    board.fields[index].bystanders.push(...board.bystandersDeck.draw());
                }
            });
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/deadpool/deadpool_common_2.png';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.filter(card => card.cost % 2 !== 0).length;
    }
}
