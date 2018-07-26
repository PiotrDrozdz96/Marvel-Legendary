import { Villain } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class sentinel implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_sentinel.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.some(card => card.type === 'hero')) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerCards.filter(card => card.type === 'hero'),
                    header: 'KO one Hero'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    this.fight(board, dialog);
                } else {
                    const index = board.playerCards.findIndex(card => card === choosen.card);
                    board.KO.put(board.playerCards.pick(index));
                }
            });
        }
    }
}

export class doombot_legion implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_doombot_legion.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        const cards = board.playerDeck.draw().concat(board.playerDeck.draw());
        open();
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: cards,
                    header: 'KO one Card'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    board.KO.push(cards[choosen.index]);
                    board.playerDeck.unshift(cards[1 - choosen.index]);
                }
            });
        }
    }
}

export class hand_ninjas implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_hand_ninjas.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        board.playerRecrutingPoints++;
    }
}

export class savage_land_mutants implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_savage_land_mutants.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        board.numberOfDrawing++;
    }
}
