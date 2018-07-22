import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class sentinel implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_sentinel.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        const CardDialog = dialog.open(HQDialog, {
            data: {
                cards: board.playerCards.filter(card => card.type === 'hero'),
                preview: '',
                header: 'KO one Hero'
            }
        }).afterClosed().subscribe(hero => {
            if (hero === undefined) {
                this.fight(board, dialog);
            } else {
                const index = board.playerCards.findIndex(card => card === hero);
                board.KO.put(board.playerCards.pick(index));
            }
        });
    }
}

export class doombot_legion implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_doombot_legion.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        const cards = board.playerDeck.draw().concat(board.playerDeck.draw());
        open();
        function open() {
            const CardDialog = dialog.open(HQDialog, {
                data: {
                    cards: cards,
                    preview: '',
                    header: 'KO one Card'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    const index = cards.findIndex(card => card === hero);
                    board.KO.push(cards[index]);
                    board.playerDeck.unshift(cards[1 - index]);
                }
            });
        }
    }
}

export class hand_ninjas implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_hand_ninjas.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        board.playerRecrutingPoints++;
    }
}

export class savage_land_mutants implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/henchman/henchman_savage_land_mutants.png';
    team = 'henchman';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        board.numberOfDrawing++;
    }
}
