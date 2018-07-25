import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';
import { EndGameDialog } from '../../dialogs/end-game-dialog/end-game.dialog';
import { Deck } from '../../models/deck';
import { Hero } from '../../models/card';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/nick_fury/nick_fury_rare.png';
    team = 'shield';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        const strength = (board.KO as Deck<Hero>).filter(card => card.team === 'shield').length;
        const indexes = [0, 1, 2, 3, 4].filter(index => board.fields[index].card && board.fields[index].card.attack < strength);
        if (board.mastermind.attack < strength) {
            if (board.defeatMastermind(dialog)) {
                dialog.open(EndGameDialog, { data: { header: 'win' } }).afterClosed().subscribe(sub => {
                    location.reload();
                });
            }
        }
        for (let i = 0; i < indexes.length; i++) {
            board.defeatVillain(indexes[i], dialog);
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/nick_fury/nick_fury_uncommon.png';
    team = 'shield';
    color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.filter(card => card.team === 'shield').length;
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/nick_fury/nick_fury_common_1.png';
    team = 'shield';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        dialog.open(SelectDialog, {
            data: {
                array: board.playerHand.concat(board.discardPile).filter(card => card.team === 'shield'),
                preview: '',
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
                board.playerHand.put(board.shieldDeck.draw());
            }
        });
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/nick_fury/nick_fury_common_2.png';
    team = 'shield';
    color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'grey')) {
            board.playerAttack++;
        }
    }
}
