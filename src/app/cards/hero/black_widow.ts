import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_black_widow_rare implements Hero {
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
        if (board.mastermindBystanders.length > 0) {
            cards.push(board.mastermind);
        }
        if (cards.length > 0) {
            open();
        }
        function open() {
            const VillainDialog = dialog.open(HQDialog, {
                data: {
                    cards: cards,
                    preview: '',
                    header: 'Defeat Villain'
                }
            }).afterClosed().subscribe(villain => {
                if (villain === undefined) {
                    open();
                } else if (villain.type === 'mastermind') {
                    attackMastermind();
                } else {
                    const index = board.fields.findIndex(field => field.card === villain);
                    attackVillain(index);
                }
                VillainDialog.unsubscribe();
            });
        }
        function attackMastermind() {
            const tactic = board.mastermind.tactics.splice(Math.floor(Math.random() * board.mastermind.tactics.length), 1);
            const tacticCard = Object.assign({}, board.mastermind);
            tacticCard.image = tactic[0].image;
            board.victoryPile.push(tacticCard);
            board.victoryPile.put(board.mastermindBystanders);
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

export class hero_black_widow_uncommon implements Hero {
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

export class hero_black_widow_common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/black_widow/black_widow_common_1.png';
    team = 'avengers';
    color = 'red';
    attack = 2;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.find(card => card.color === 'red')) {
            const KODialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.concat(board.discardPile),
                    preview: '',
                    header: 'KOs Card or nothing'
                }
            }).afterClosed().subscribe(hero => {
                if (hero !== undefined) {
                    let index = board.discardPile.findIndex(card => card.image === hero.image);
                    if (index !== -1) {
                        board.KO.put(board.discardPile.pick(index));
                    } else {
                        index = board.playerHand.findIndex(card => card.image === hero.image);
                        board.KO.put(board.playerHand.pick(index));
                    }
                    board.victoryPile.put(board.bystandersDeck.draw());
                }
                KODialog.unsubscribe();
            });
        }
    }
}

export class hero_black_widow_common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/black_widow/black_widow_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 0;
    recrutingPoints = 0;
    cost = 2;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw());
        if (board.playerCards.find(card => card.color === 'grey')) {
            board.victoryPile.put(board.bystandersDeck.draw());
        }
    }
}