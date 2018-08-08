import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';
import { skip } from 'rxjs/operators';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/cyclops/cyclops_rare.png';
    team: Team = 'x-men';
    color: Color = 'white';
    attack = 6;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.filter(card => card.team === 'x-men').length * 2;
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/cyclops/cyclops_uncommon.png';
    team: Team = 'x-men';
    color: Color = 'white';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
    discard(board: BoardService, card?) {
        console.log(card);
        board.playerHand.push(card);
        return false;
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/cyclops/cyclops_common_1.png';
    team: Team = 'x-men';
    color: Color = 'green';
    attack = 0;
    recrutingPoints = 3;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerHand.length > 0) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand,
                    preview: this.image,
                    header: 'Discard one card'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    const index = board.playerCards.findIndex(card => card === this);
                    board.playerHand.put(board.playerCards.pick(index));
                    board.playerRecrutingPoints -= this.recrutingPoints;
                } else {
                    board.discardPile.put(board.playerHand.pick(choosen.index));
                }
            });
        } else {
            const index = board.playerCards.findIndex(card => card === this);
            board.playerHand.put(board.playerCards.pick(index));
            board.playerRecrutingPoints -= this.recrutingPoints;
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/cyclops/cyclops_common_2.png';
    team: Team = 'x-men';
    color: Color = 'white';
    attack = 3;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerHand.length > 0) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand,
                    preview: this.image,
                    header: 'Discard one card'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    const index = board.playerCards.findIndex(card => card === this);
                    board.playerHand.put(board.playerCards.pick(index));
                    board.playerAttack -= this.attack;
                } else {
                    board.discardPile.put(board.playerHand.pick(choosen.index));
                }
            });
        } else {
            const index = board.playerCards.findIndex(card => card === this);
            board.playerHand.put(board.playerCards.pick(index));
            board.playerAttack -= this.attack;
        }
    }
}
