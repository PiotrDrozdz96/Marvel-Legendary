import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_nick_fury_rare implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_rare.png';
    team = 'shield';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 8;
    func(board: BoardService, dialog: MatDialog) {
        const strength = (board.KO.cards as Hero[]).filter(card => card.team === 'shield').length;
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
            board.victoryPile.push([tacticCard]);
            board.victoryPile.push(board.mastermindBystanders);
            board.mastermindBystanders = [];
            if (board.mastermind.tactics.length === 0) {
                console.log('Win');
            } else {
                board.setKOimage(tactic[0].image);
                tactic[0].func(board, dialog, tactic[0]);
            }
        }

        function attackVillain(index: number) {
            const card = board.fields[index].card;
            board.victoryPile.push([card]);
            board.victoryPile.push(board.fields[index].bystanders);
            board.fields[index].card = null;
            board.fields[index].bystanders = [];
            if (card.fight) {
                card.fight(board, dialog);
            }
        }
    }
}

export class hero_nick_fury_uncommon implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_uncommon.png';
    team = 'shield';
    color = 'green';
    attack = 1;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        board.playerAttack += board.playerCards.cards.filter(card => card.team === 'shield').length;
    }
}

export class hero_nick_fury_common_1 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_common_1.png';
    team = 'shield';
    color = 'red';
    attack = 0;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
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
                board.playerHand.push(board.shieldDeck.draw());
            }
            KODialog.unsubscribe();
        });
    }
}

export class hero_nick_fury_common_2 implements Hero {
    type = 'hero';
    image = '/assets/cards/hero/nick_fury/nick_fury_common_2.png';
    team = 'shield';
    color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.cards.find(card => card.color === 'grey')) {
            board.playerAttack++;
        }
    }
}
