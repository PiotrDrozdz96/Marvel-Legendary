import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_thor_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_rare.png';
    team = 'avengers';
    color = 'white';
    attack = 0;
    recrutingPoints = 5;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        const ChooseDialog = dialog.open(HQDialog, {
            data: {
                cards: [this],
                preview: this.image,
                header: 'Replace recruiting points on attack or no'
            }
        }).afterClosed().subscribe(hero => {
            if (!hero === undefined) {
                board.playerRecrutingPoints -= 5;
                board.playerAttack += 5;
            }
            ChooseDialog.unsubscribe();
        });
    }
}

export class hero_thor_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_uncommon.png';
    team = 'avengers';
    color = 'white';
    attack = 3;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'white')) {
            board.playerAttack += 3;
        }
    }
}

export class hero_thor_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_common_1.png';
    team = 'avengers';
    color = 'white';
    attack = 0;
    recrutingPoints = 2;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerRecrutingPoints >= 8) {
            board.playerAttack += 3;
        }
    }
}

export class hero_thor_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/thor/thor_common_2.png';
    team = 'avengers';
    color = 'green';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'green')) {
            board.playerRecrutingPoints += 2;
        }
    }
}
