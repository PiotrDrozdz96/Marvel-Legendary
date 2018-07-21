import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';
import { wound } from '../wounds';

// tslint:disable:class-name

export class hero_hulk_rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_rare.png';
    team = 'avengers';
    color = 'green';
    attack = 5;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.find(card => card.color === 'green')) {
            board.playerAttack += 5;
        }
    }
}

export class hero_hulk_uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_uncommon.png';
    team = 'avengers';
    color = 'green';
    attack = 4;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        board.discardPile.put(board.woundsDeck.draw());
    }
}

export class hero_hulk_common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_common_1.png';
    team = 'avengers';
    color = 'green';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.find(card => card.color === 'green')) {
            board.playerAttack++;
        }
    }
}

export class hero_hulk_common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hulk/hulk_common_2.png';
    team = 'avengers';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerHand.concat(board.discardPile).find(card => card.type === 'wound')) {
            const WoundDialog = dialog.open(HQDialog, {
                data: {
                    cards: [new wound],
                    preview: this.image,
                    header: 'KO a Wound or nothing'
                }
            }).afterClosed().subscribe(woundCard => {
                if (woundCard !== undefined) {
                    let index = board.discardPile.findIndex(card => card.type === 'wound');
                    if (index !== -1) {
                        board.KO.put(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.findIndex(card => card.type === 'wound');
                        board.KO.put(board.playerHand.pick(index));
                    }
                    board.playerAttack += 2;
                }
                WoundDialog.unsubscribe();
            });
        }
    }
}
