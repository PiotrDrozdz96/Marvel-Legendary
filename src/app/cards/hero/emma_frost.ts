import { MatDialog } from '@angular/material';
import { skip } from 'rxjs/operators';
import { Hero } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_rare.png';
    team = 'x-men';
    color = 'green';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    defeatedVillain = 0;
    sub(board: BoardService) {
        return board.defeatedVillain().pipe(skip(1)).subscribe(sub => {
            board.playerRecrutingPoints += 3;
        });
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_uncommon.png';
    team = 'x-men';
    color = 'yellow';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerHand.concat(board.playerCards).find(card => card.team === 'x-men')) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 0;
    recrutingPoints = 1;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw());
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/emma_frost/emma_frost_common_2.png';
    team = 'x-men';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'red')) {
            dialog.open(SelectDialog, {
                data: {
                    array: [this],
                    preview: this.image,
                    header: 'Draw Villain and get +2 attack or nothing'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen !== undefined) {
                    board.drawVillainObs.next(true);
                    board.playerAttack += 2;
                }
            });
        }
    }
}
