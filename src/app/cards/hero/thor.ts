import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/thor/thor_rare.png';
    team: Team = 'avengers';
    color: Color = 'white';
    attack = 0;
    recrutingPoints = 5;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        dialog.open(SelectDialog, {
            data: {
                array: [this],
                preview: this.image,
                header: 'Replace recruiting points on attack or no'
            }
        }).afterClosed().subscribe(choosen => {
            if (choosen !== undefined) {
                board.playerRecrutingPoints -= 5;
                board.playerAttack += 5;
            }
        });
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/thor/thor_uncommon.png';
    team: Team = 'avengers';
    color: Color = 'white';
    attack = 3;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'white')) {
            board.playerAttack += 3;
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/thor/thor_common_1.png';
    team: Team = 'avengers';
    color: Color = 'white';
    attack = 0;
    recrutingPoints = 2;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerRecrutingPoints >= 8) {
            board.playerAttack += 3;
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/thor/thor_common_2.png';
    team: Team = 'avengers';
    color: Color = 'green';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'green')) {
            board.playerRecrutingPoints += 2;
        }
    }
}
