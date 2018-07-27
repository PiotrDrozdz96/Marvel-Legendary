import { Mastermind, Card, Tactic } from '../models/card';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material';
import { SelectDialog } from '../dialogs/cards-list-dialog/select.dialog';

// tslint:disable:class-name

export class master_strike implements Card {
    type = 'masterStrike';
    image = 'assets/cards/mastermind/master_strike.png';
}

export class doctor_doom implements Mastermind {
    type = 'mastermind';
    image = 'assets/cards/mastermind/doctor_doom/mastermind_doctor_doom.png';
    alwaysLeads = {group: 'henchmen', name: 'doombot_legion'};
    attack = 9;
    additionalAttack = 0;
    points = 5;
    tactics = [
        {
            image: 'assets/cards/mastermind/doctor_doom/doctor_doom_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cardsList = board.hq.filter(card => card.color === 'grey' || card.color === 'white');
                if (cardsList.length !== 0) {
                    dialog.open(SelectDialog, {
                        data: {
                            array: cardsList,
                            preview: tactic.image,
                            header: 'Recruit one Hero for free'
                        }
                    }).afterClosed().subscribe(choosen => {
                        if (choosen === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            const index = board.hq.findIndex(card => card === choosen.card);
                            board.discardPile.put(board.hq.pick(index));
                            board.hq.put(board.heroDeck.draw());
                        }
                    });
                }
            }
        },
        {
            image: 'assets/cards/mastermind/doctor_doom/doctor_doom_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.playerHand.put(board.playerDeck.draw());
            }
        },
        {
            image: 'assets/cards/mastermind/doctor_doom/doctor_doom_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => { }
        },
        {
            image: 'assets/cards/mastermind/doctor_doom/doctor_doom_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.numberOfDrawing = board.numberOfDrawing + 3;
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        let numberOfChoosenCards = 0;
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand,
                    preview: board.mastermind.image,
                    header: 'Put card on top their deck'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    numberOfChoosenCards++;
                    board.playerDeck.unshift(...board.playerHand.pick(choosen.index));
                    if (numberOfChoosenCards !== 2) { open(); }
                }
            });
        }

        if (board.playerHand.length === 6 && !board.playerHand.some(card => card.color === 'grey')) {
            open();
        }
    }
}

export class loki implements Mastermind {
    type = 'mastermind';
    image = 'assets/cards/mastermind/loki/mastermind_loki.png';
    alwaysLeads = {group: 'villain', name: 'enemies_of_asgard'};
    attack = 10;
    additionalAttack = 0;
    points = 5;
    tactics = [
        {
            image: 'assets/cards/mastermind/loki/loki_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                if (board.fields.findIndex(field => field.card !== null) !== -1) {
                    dialog.open(SelectDialog, {
                        data: {
                            array: board.fields.filter(field => field.card != null).map(field => field.card),
                            preview: tactic.image,
                            header: 'Defeat Villain for free'
                        }
                    }).afterClosed().subscribe(choosen => {
                        if (choosen === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            const index = board.fields.findIndex(field => field.card === choosen.card);
                            board.defeatVillain(index, dialog);
                        }
                    });
                }
            }
        },
        {
            image: 'assets/cards/mastermind/loki/loki_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.discardPile.shuffle();
                const length = 4 < board.discardPile.length ? 4 : board.discardPile.length;
                for (let i = 0; i < length; i++) {
                    board.KO.put(board.discardPile.draw());
                }
            }
        },
        {
            image: 'assets/cards/mastermind/loki/loki_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const index = board.victoryPile.findIndex(card => card.type === 'villain');
                if (index !== -1) {
                    board.KO.put(board.victoryPile.pick(index));
                }
            }
        },
        {
            image: 'assets/cards/mastermind/loki/loki_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const bystanders = board.victoryPile.filter(card => card.type === 'bystander');
                const length = 2 < bystanders.length ? 2 : bystanders.length;
                for (let i = 0; i < length; i++) {
                    board.KO.put(board.victoryPile.pick(board.victoryPile.findIndex(card => card.type === 'bystander')));
                }
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        if (!board.playerHand.some(card => card.color === 'green')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
}

export class magneto implements Mastermind {
    type = 'mastermind';
    image = 'assets/cards/mastermind/magneto/mastermind_magneto.png';
    alwaysLeads = {group: 'villain', name: 'brootherhood'};
    attack = 8;
    additionalAttack = 0;
    points = 5;
    tactics = [
        {
            image: 'assets/cards/mastermind/magneto/magneto_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cardsList = board.hq.filter(card => card.team === 'x-men');
                if (cardsList.length !== 0) {
                    dialog.open(SelectDialog, {
                        data: {
                            array: cardsList,
                            preview: tactic.image,
                            header: 'Recruit one Hero for free'
                        }
                    }).afterClosed().subscribe(choosen => {
                        if (choosen === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            board.discardPile.put(board.hq.pick(choosen.index));
                            const newCard = board.heroDeck.draw();
                            board.hq.put(board.heroDeck.draw());
                        }
                    });
                }
            }
        },
        {
            image: 'assets/cards/mastermind/magneto/magneto_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                if (!board.playerCards.some(card => card.team === 'x-men')) {
                    board.playerDeck.put(board.woundsDeck.draw().concat(board.woundsDeck.draw()));
                }
            }
        },
        {
            image: 'assets/cards/mastermind/magneto/magneto_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cardsList = board.playerCards.filter(card => card.team === 'x-men');
                if (cardsList.length !== 0) {
                    dialog.open(SelectDialog, {
                        data: {
                            array: cardsList,
                            preview: tactic.image,
                            header: 'Choose one Hero'
                        }
                    }).afterClosed().subscribe(choosen => {
                        if (choosen === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            board.playerDeck.unshift(...board.playerCards.splice(choosen.index, 1));
                            board.numberOfDrawing = 7;
                        }
                    });
                }
            }
        },
        {
            image: 'assets/cards/mastermind/magneto/magneto_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const length = board.playerCards.filter(card => card.team === 'x-men').length;
                for (let i = 0; i < length; i++) {
                    board.victoryPile.put(board.bystandersDeck.draw());
                }
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        function open() {
            dialog.open(SelectDialog, {
                data: {
                    array: board.playerHand,
                    preview: board.mastermind.image,
                    header: 'Put card on discard Pile'
                }
            }).afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    board.discardPile.unshift(...board.playerHand.pick(choosen.index));
                    if (board.playerHand.length > 4) {
                        open();
                    }
                }
            });
        }

        if (!board.playerHand.some(card => card.team === 'x-men')) {
            open();
        }
    }
}

export class red_skull implements Mastermind {
    type = 'mastermind';
    image = 'assets/cards/mastermind/red_skull/mastermind_red_skull.png';
    alwaysLeads = {group: 'villain', name: 'hydra'};
    attack = 7;
    additionalAttack = 0;
    points = 5;
    tactics = [
        {
            image: 'assets/cards/mastermind/red_skull/red_skull_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.playerRecrutingPoints += 4;
            }
        },
        {
            image: 'assets/cards/mastermind/red_skull/red_skull_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const length = board.victoryPile.filter(card => card['team'] === 'hydra').length + 2;
                for (let i = 0; i < length; i++) {
                    board.playerHand.put(board.playerDeck.draw());
                }
            }
        },
        {
            image: 'assets/cards/mastermind/red_skull/red_skull_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.playerAttack += 3;
            }
        },
        {
            image: 'assets/cards/mastermind/red_skull/red_skull_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cards = [...board.playerDeck.draw(), ...board.playerDeck.draw(), ...board.playerDeck.draw()];
                if (cards.length > 0) {
                    ko();
                }

                function ko() {
                    dialog.open(SelectDialog, {
                        data: {
                            array: cards,
                            preview: tactic.image,
                            header: 'KOs one card'
                        }
                    }).afterClosed().subscribe(choosen => {
                        if (choosen === undefined) {
                            ko();
                        } else {
                            board.KO.put(cards.splice(choosen.index, 1));
                            if (cards.length > 0) {
                                discard();
                            }
                        }
                    });
                }

                function discard() {
                    dialog.open(SelectDialog, {
                        data: {
                            array: cards,
                            preview: tactic.image,
                            header: 'Discard one card'
                        }
                    }).afterClosed().subscribe(choosen => {
                        if (choosen === undefined) {
                            discard();
                        } else {
                            board.discardPile.put(cards.splice(choosen.index, 1));
                            if (cards.length > 0) {
                                board.playerDeck.unshift(cards[0]);
                            }
                        }
                    });
                }
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        board.KO.put(board.playerHand.take());
    }
}
