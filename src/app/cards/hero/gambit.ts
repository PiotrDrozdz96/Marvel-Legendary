import { Hero } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/gambit/gambit_rare.png';
    team = 'x-men';
    color = 'yellow';
    attack = 4;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.reveal();
        board.setKOimage(card.image);
        board.playerAttack += card.cost;
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/gambit/gambit_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        const cards = [board.playerDeck.reveal()];
        dialog.open(SelectDialog, {
            data: {
                array: cards,
                preview: this.image,
                header: 'Discard card or nothing'
            }
        }).afterClosed().subscribe(choosen => {
            if (choosen !== undefined) {
                board.discardPile.put(board.playerDeck.draw());
            }
        });
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/gambit/gambit_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.reveal();
        if (card.team === 'x-men') {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/gambit/gambit_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw().concat(board.playerDeck.draw()));
        open();
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand,
                    preview: (new common_2).image,
                    header: 'Get back one card'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    board.playerDeck.unshift(board.playerHand.pick(choosen.index)[0]);
                }
            });
        }
    }
}
