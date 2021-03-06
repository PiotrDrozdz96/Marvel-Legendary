import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/rogue/rogue_rare.png';
    team: Team = 'x-men';
    color: Color = 'green';
    attack = 4;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        const card = board.playerDeck.draw()[0];
        if (card.func) {
            card.func(board, dialog);
        }
        if (card.sub) {
            board.cardsSubscription.push(card.sub(board));
        }
        board.copiedCards.push(card);
        board.playerAttack += card.attack;
        board.playerRecrutingPoints += card.recrutingPoints;

    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/rogue/rogue_uncommon.png';
    team: Team = 'x-men';
    color: Color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        dialog.open(SelectDialog, {
            data: {
                array: board.playerCards.filter(card => card.image !== this.image),
                header: 'Copy Card'
            }
        }).afterClosed().subscribe(choosen => {
            if (choosen !== undefined) {
                if (choosen.card.func) {
                    choosen.card.func(board, dialog);
                }
                if (choosen.card.sub) {
                    board.cardsSubscription.push(choosen.card.sub(board));
                }
                board.copiedCards.push(choosen.card);
                board.playerAttack += choosen.card.attack;
                board.playerRecrutingPoints += choosen.card.recrutingPoints;
            }
        });
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/rogue/rogue_common_1.png';
    team: Team = 'x-men';
    color: Color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'green')) {
            board.playerAttack += 3;
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/rogue/rogue_common_2.png';
    team: Team = 'x-men';
    color: Color = 'red';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'red')) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand.concat(board.discardPile),
                    header: 'KO one Card or nothing'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen !== undefined) {
                    let index = board.discardPile.findIndex(card => card === choosen.card);
                    if (index !== -1) {
                        board.KO.put(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.findIndex(card => card === choosen.card);
                        board.KO.put(board.playerHand.pick(index));
                    }
                    board.playerRecrutingPoints++;
                }
            });
        }
    }
}
