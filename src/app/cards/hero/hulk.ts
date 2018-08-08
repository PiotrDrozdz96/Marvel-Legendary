import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';
import { wound } from '../wounds';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_rare.png';
    team: Team = 'avengers';
    color: Color = 'green';
    attack = 5;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'green')) {
            board.playerAttack += 5;
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_uncommon.png';
    team: Team = 'avengers';
    color: Color = 'green';
    attack = 4;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        board.discardPile.put(board.woundsDeck.draw());
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_common_1.png';
    team: Team = 'avengers';
    color: Color = 'green';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'green')) {
            board.playerAttack++;
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_common_2.png';
    team: Team = 'avengers';
    color: Color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
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
                    board.playerAttack += 2;
                }
            });
        }
    }
}
