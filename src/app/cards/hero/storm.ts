import { Hero } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';
import { HQDialog } from '../../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class hero_storm_rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_rare.png';
    team = 'x-men';
    color = 'white';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        board.fields[4].attack -= 2;
        if (board.playerCards.find(card => card.color === 'white')) {
            board.mastermind.additionalAttack -= 2;
        }
    }
}

export class hero_storm_uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_uncommon.png';
    team = 'x-men';
    color = 'red';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        if (board.fields.find(field => field.card)) {
            const VillainDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.fields.filter(field => field.card).map(field => field.card),
                    preview: this.image,
                    header: 'Move Villain or nothing'
                }
            }).afterClosed().subscribe(villain => {
                if (villain !== undefined) {
                    const index = board.fields.findIndex(field => field.card === villain);
                    board.victoryPile.put(board.fields[index].bystanders);
                    board.fields[index].bystanders = [];
                    if (index === 4) {
                        board.escapedVillain.push(villain);
                        board.fields[4].card = null;
                        if (villain.escape) {
                            villain.escape(board, dialog);
                        }
                    } else if (board.fields[index + 1].card) {
                        const nextVillain = board.fields[index + 1].card;
                        board.fields[index].card = nextVillain;
                        board.fields[index + 1].card = villain;
                        board.fields[index].bystanders = board.fields[index + 1].bystanders;
                        board.fields[index + 1].bystanders = [];
                    } else {
                        board.fields[index + 1].card = villain;
                        board.fields[index].card = null;
                    }
                }
                VillainDialog.unsubscribe();
            });
        }
    }
}

export class hero_storm_common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_common_1.png';
    team = 'x-men';
    color = 'white';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.playerCards.find(card => card.color === 'white')) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class hero_storm_common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_common_2.png';
    team = 'x-men';
    color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        board.fields[2].attack -= 2;
    }
}
