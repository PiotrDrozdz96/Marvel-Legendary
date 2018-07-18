import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class villain_skrull_power_skrull implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_power_skrull.png';
    team = 'skrulls';
    attack = 8;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        const heroDialog = dialog.open(HQDialog, {
            data: {
                cards: board.hq,
                preview: '',
                header: 'Recruit one Hero for free'
            }
        }).afterClosed().subscribe(hero => {
            if (hero === undefined) {
                this.fight(board, dialog);
            } else {
                const index = board.hq.findIndex(card => card === hero);
                board.discardPile.push(board.hq.splice(index, 1));
                const newCard = board.heroDeck.draw();
                board.hq.push(...board.heroDeck.draw());
                heroDialog.unsubscribe();
            }
        });
    }
}

export class villain_skrull_queen_veranke implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_queen_veranke.png';
    team = 'skrulls';
    attack = 0;
    points = 4;
    copiedHero = undefined;
    ambush(board: BoardService, dialog: MatDialog) {
        const index = board.hq.reduce((maxIndex, card, i, arr) => {
            return arr[maxIndex].cost > card.cost ? maxIndex : i;
        }, 0);
        const hero = board.hq.splice(index, 1)[0];
        board.hq.push(...board.heroDeck.draw());
        this.attack = hero.cost;
        this.image = hero.image;
        this.copiedHero = hero;
    }
    escape(board: BoardService, dialog: MatDialog) {
        this.image = (new villain_skrull_queen_veranke).image;
    }
    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.push(this.copiedHero);
        this.escape(board, dialog);
    }
}

export class villain_skrull_shapeshifters implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_shapeshifters.png';
    team = 'skrulls';
    attack = 0;
    points = 2;
    copiedHero = undefined;
    ambush(board: BoardService, dialog: MatDialog) {
        console.log(board.hq);
        const hero = board.hq.splice(4, 1)[0];
        console.log(hero);
        board.hq.push(...board.heroDeck.draw());
        this.attack = hero.cost;
        this.image = hero.image;
        this.copiedHero = hero;
    }
    escape(board: BoardService, dialog: MatDialog) {
        this.image = (new villain_skrull_shapeshifters).image;
    }
    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.push(this.copiedHero);
        this.escape(board, dialog);
    }
}

export class villain_skrull_super_skrull implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/skrulls/villain_skrull_super_skrull.png';
    team = 'skrulls';
    attack = 4;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        const CardDialog = dialog.open(HQDialog, {
            data: {
                cards: board.playerCards.cards.filter(card => card.type === 'hero'),
                preview: '',
                header: 'KO one Hero'
            }
        }).afterClosed().subscribe(hero => {
            if (hero === undefined) {
                this.fight(board, dialog);
            } else {
                const index = board.playerCards.cards.findIndex(card => card === hero);
                board.KO.push(board.playerCards.pick(index));
            }
        });
    }
}
