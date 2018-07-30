import { Hero } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';
import { EndGameDialog } from '../../dialogs/end-game-dialog/end-game.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/black_widow/black_widow_rare.png';
    team = 'avengers';
    color = 'red';
    attack = 4;
    recrutingPoints = 0;
    cost = 7;
    defeatedVillain = 0;
    func(board: BoardService, dialog: MatDialog) {
        const cards = board.fields.filter(field => field.bystanders.length > 0).map(field => field.card);
        if (board.mastermind.bystanders.length > 0) {
            cards.push(board.mastermind);
        }
        if (cards.length > 0) {
            open();
        }
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: cards,
                    header: 'Defeat Villain'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else if (choosen.card.type === 'mastermind') {
                    if (board.defeatMastermind(dialog)) {
                        dialog.open(EndGameDialog, { data: { header: 'win' } }).afterClosed().subscribe(sub => {
                            location.pathname = '/';
                        });
                    }
                } else {
                    const index = board.fields.findIndex(field => field.card === choosen.card);
                    board.defeatVillain(index, dialog);
                }
            });
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/black_widow/black_widow_uncommon.png';
    team = 'avengers';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.victoryPile.filter(card => card.type === 'bystander').length;
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/black_widow/black_widow_common_1.png';
    team = 'avengers';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'red')) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand.concat(board.discardPile),
                    header: 'KOs Card or nothing'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen !== undefined) {
                    let index = board.discardPile.findIndex(card => card.image === choosen.card.image);
                    if (index !== -1) {
                        board.KO.put(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.findIndex(card => card.image === choosen.card.image);
                        board.KO.put(board.playerHand.pick(index));
                    }
                    board.victoryPile.put(board.bystandersDeck.draw());
                }
            });
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/black_widow/black_widow_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw());
        if (board.checkPlayedCards('color', 'grey')) {
            board.victoryPile.put(board.bystandersDeck.draw());
        }
    }
}
