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
            attackMastermind();
        }
        for (let i = 0; i < indexes.length; i++) {
            attackVillain(indexes[i]);
        }

        function attackMastermind() {
            const tactic = board.mastermind.tactics.splice(Math.floor(Math.random() * board.mastermind.tactics.length), 1);
            const tacticCard = Object.assign({}, board.mastermind);
            tacticCard.image = tactic[0].image;
            board.victoryPile.push(tacticCard);
            board.victoryPile.put(board.mastermind.bystanders);
            board.mastermind.bystanders = [];
            if (board.mastermind.tactics.length === 0) {
                this.dialog.open(EndGameDialog, {data: { header: 'win' }}).afterClosed().subscribe(sub => {
                    location.reload();
                  });
            } else {
                board.setKOimage(tactic[0].image);
                tactic[0].func(board, dialog, tactic[0]);
            }
        }

        function attackVillain(index: number) {
            const card = board.fields[index].card;
            board.victoryPile.push(card);
            board.victoryPile.put(board.fields[index].bystanders);
            board.fields[index].card = null;
            board.fields[index].bystanders = [];
            if (card.fight) {
                card.fight(board, dialog);
            }
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
