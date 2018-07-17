import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_deadpool_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_rare.png';
    color = 'yellow';
    attack = 6;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        const WoundDialog = dialog.open(HQDialog, {
            data: {
                cards: board.playerHand.cards,
                preview: this.image,
                header: 'Replace hero or nothing'
            }
        }).afterClosed().subscribe(card => {
            if (!card === undefined) {
                board.playerHand.push(board.woundsDeck.draw());
                const index = board.playerHand.cards.findIndex(hero => hero === card);
                board.playerHand.pick(index);
                board.playerHand.push(board.heroDeck.draw());
            }
            WoundDialog.unsubscribe();
        });
    }
}

export class hero_deadpool_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_uncommon.png';
    color = 'yellow';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
}

export class hero_deadpool_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_common_1.png';
    color = 'grey';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
}

export class hero_deadpool_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/deadpool/deadpool_common_2.png';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 5;
}
