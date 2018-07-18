import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_cyclops_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_rare.png';
    team = 'x-men';
    color = 'white';
    attack = 6;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.cards.filter(card => card.team === 'x-men').length * 2;
    }
}

export class hero_cyclops_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_uncommon.png';
    team = 'x-men';
    color = 'white';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
}

export class hero_cyclops_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_common_1.png';
    team = 'x-men';
    color = 'green';
    attack = 0;
    recrutingPoints = 3;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        const DiscardDialog = dialog.open(HQDialog, {
            data: {
                cards: board.playerHand.cards,
                preview: this.image,
                header: 'Discard one card'
            }
        }).afterClosed().subscribe(card => {
            if (card === undefined) {
                const index = board.playerCards.cards.findIndex(hero => hero === this);
                board.playerHand.push(board.playerCards.pick(index));
                board.playerAttack -= this.attack;
            } else {
                if (card.image !== (new hero_cyclops_uncommon).image) {
                    const index = board.playerHand.cards.findIndex( hero => hero === card );
                    board.discardPile.push(board.playerHand.pick(index));
                }
            }
            DiscardDialog.unsubscribe();
        });
    }
}

export class hero_cyclops_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/cyclops/cyclops_common_2.png';
    team = 'x-men';
    color = 'white';
    attack = 3;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        const DiscardDialog = dialog.open(HQDialog, {
            data: {
                cards: board.playerHand.cards,
                preview: this.image,
                header: 'Discard one card'
            }
        }).afterClosed().subscribe(card => {
            if (card === undefined) {
                const index = board.playerCards.cards.findIndex(hero => hero === this);
                board.playerHand.push(board.playerCards.pick(index));
                board.playerAttack -= this.attack;
            } else {
                if (card.image !== (new hero_cyclops_uncommon).image) {
                    const index = board.playerHand.cards.findIndex( hero => hero === card );
                    board.discardPile.push(board.playerHand.pick(index));
                }
            }
            DiscardDialog.unsubscribe();
        });
    }
}
