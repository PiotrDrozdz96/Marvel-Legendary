import { MatDialog } from '@angular/material';
import { take, skip } from 'rxjs/operators';
import { BoardService } from '../../services/board.service';
import { Hero } from '../../models/card';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';
import { wound } from '../wounds';


// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_rare.png';
    team = 'x-men';
    color = 'yellow';
    attack = 0;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw().concat(board.playerDeck.draw(), board.playerDeck.draw()));
        if (board.checkPlayedCards('color', 'yellow')) {
            board.playerAttack += board.playerDeck.numberOfDrawing - 6;
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'yellow')) {
            board.playerHand.put(board.playerDeck.draw().concat(board.playerDeck.draw()));
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_common_1.png';
    team = 'x-men';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerHand.concat(board.discardPile).find(card => card.type === 'wound')) {
            dialog.open(SelectDialog, {
                data: {
                    array: [new wound],
                    preview: this.image,
                    header: 'KO a Wound or nothing'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen !== undefined) {
                    let index = board.discardPile.findIndex(card => card.type === 'wound');
                    if (index !== -1) {
                        board.KO.put(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.findIndex(card => card.type === 'wound');
                        board.KO.put(board.playerHand.pick(index));
                    }
                    board.playerHand.put(board.playerDeck.draw());
                }
            });
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/wolverine/wolverine_common_2.png';
    team = 'x-men';
    color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'yellow')) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}
