import { Villain, Hero } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class power_skrull implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/skrulls/villain_skrull_power_skrull.png';
    team = 'skrulls';
    attack = 8;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        dialog.open(SelectDialog, {
            data: {
                array: board.hq,
                header: 'Recruit one Hero for free'
            }
        }).afterClosed().subscribe(choosen => {
            if (choosen === undefined) {
                this.fight(board, dialog);
            } else {
                board.discardPile.put(board.hq.pick(choosen.index));
                const newCard = board.heroDeck.draw();
                board.hq.push(...board.heroDeck.draw());
            }
        });
    }
}

export class queen_veranke implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/skrulls/villain_skrull_queen_veranke.png';
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
        this.team = 'hero';
        this.copiedHero = hero;
        if (board.leaderBoards.scheme = 'secret_invasion_shapeshifters') {
            this.attack += 2;
        }
    }
    escape(board: BoardService, dialog: MatDialog) {
        this.image = (new queen_veranke).image;
    }
    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.push(this.copiedHero);
        this.escape(board, dialog);
    }
}

export class shapeshifters implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/skrulls/villain_skrull_shapeshifters.png';
    team = 'skrulls';
    attack = 0;
    points = 2;
    copiedHero = undefined;
    ambush(board: BoardService, dialog: MatDialog) {
        const hero = board.hq.splice(4, 1)[0];
        board.hq.push(...board.heroDeck.draw());
        this.attack = hero.cost;
        this.image = hero.image;
        this.team = 'hero';
        this.copiedHero = hero;
        if (board.leaderBoards.scheme = 'secret_invasion_shapeshifters') {
            this.attack += 2;
        }
    }
    escape(board: BoardService, dialog: MatDialog) {
        this.image = (new shapeshifters).image;
    }
    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.push(this.copiedHero);
        this.escape(board, dialog);
    }
}

export class super_skrull implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/skrulls/villain_skrull_super_skrull.png';
    team = 'skrulls';
    attack = 4;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.some(card => card.type === 'hero')) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerCards.filter(card => card.type === 'hero'),
                    header: 'KO one Hero'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    this.fight(board, dialog);
                } else {
                    const index = board.playerCards.findIndex(card => card === choosen.card);
                    board.KO.put(board.playerCards.pick(index));
                }
            });
        }
    }
}
