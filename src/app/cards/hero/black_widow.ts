import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_black_widow_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_rare.png';
    team = 'avengers';
    color = 'red';
    attack = 4;
    recrutingPoints = 0;
    cost = 7;
    defeatedVillain = 0;
    func(board: BoardService, dialog: MatDialog) {
        this.defeatedVillain = board.victoryPile.cards.filter(card => card.type === 'mastermind' || card.type === 'villain').length;
        const Obs = board.nextTurn().subscribe(sub => {
            if (board.victoryPile.cards.filter(card =>
                card.type === 'mastermind' || card.type === 'villain').length > this.defeatedVillain
            ) {
                board.victoryPile.push(board.bystandersDeck.draw());
            }
            this.defeatedVillain = 0;
            Obs.unsubscribe();
        });
    }
}

export class hero_black_widow_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_uncommon.png';
    team = 'avengers';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.victoryPile.cards.filter(card => card.type === 'bystander').length;
    }
}

export class hero_black_widow_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_common_1.png';
    team = 'avengers';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'red')) {
            const KODialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.cards.concat(board.discardPile.cards),
                    preview: '',
                    header: 'KOs Card or nothing'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                } else {
                    let index = board.discardPile.cards.findIndex(card => card.image === hero.image);
                    if (index !== -1) {
                        board.KO.push(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.cards.findIndex(card => card.image === hero.image);
                        board.KO.push(board.playerHand.pick(index));
                    }
                    board.victoryPile.push(board.bystandersDeck.draw());
                }
                KODialog.unsubscribe();
            });
        }
    }
}

export class hero_black_widow_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/black_widow/black_widow_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.push(board.playerDeck.draw());
        if (board.playerCards.cards.find(card => card.color === 'grey')) {
            board.victoryPile.push(board.bystandersDeck.draw());
        }
    }
}
