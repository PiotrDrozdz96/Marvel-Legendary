import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_rare.png';
    team: Team = 'x-men';
    color: Color = 'white';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    func(board: BoardService, dialog: MatDialog) {
        board.fields[4].attack -= 2;
        if (board.checkPlayedCards('color', 'white')) {
            board.mastermind.additionalAttack -= 2;
        }
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_uncommon.png';
    team: Team = 'x-men';
    color: Color = 'red';
    attack = 4;
    recrutingPoints = 0;
    cost = 6;
    func(board: BoardService, dialog: MatDialog) {
        if (board.fields.find(field => field.card)) {
            dialog.open(SelectDialog, {
                data: {
                    array: board.fields.filter(field => field.card).map(field => field.card),
                    preview: this.image,
                    header: 'Move Villain or nothing'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen !== undefined) {
                    const index = board.fields.findIndex(field => field.card === choosen.card);
                    board.victoryPile.put(board.fields[index].bystanders);
                    board.fields[index].bystanders = [];
                    if (index === 4) {
                        board.escapedVillain.push(choosen.card);
                        board.fields[4].card = null;
                        if (choosen.card.escape) {
                            choosen.card.escape(board, dialog);
                        }
                    } else if (board.fields[index + 1].card) {
                        const nextVillain = board.fields[index + 1].card;
                        board.fields[index].card = nextVillain;
                        board.fields[index + 1].card = choosen.card;
                        board.fields[index].bystanders = board.fields[index + 1].bystanders;
                        board.fields[index + 1].bystanders = [];
                    } else {
                        board.fields[index + 1].card = choosen.card;
                        board.fields[index].card = null;
                    }
                }
            });
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_common_1.png';
    team: Team = 'x-men';
    color: Color = 'white';
    attack = 0;
    recrutingPoints = 2;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'white')) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/storm/storm_common_2.png';
    team: Team = 'x-men';
    color: Color = 'white';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        board.fields[2].attack -= 2;
    }
}
