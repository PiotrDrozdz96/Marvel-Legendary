import { Mastermind, Card, Tactic } from '../models/card';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material';
import { SelectHeroDialog } from '../select-dialog/select-hero.dialog';
import { HQDialog } from '../cards-dialog/hq-dialog/hq.dialog';

// tslint:disable:class-name

export class master_strike implements Card {
    type = 'masterStrike';
    image = '/assets/cards/mastermind/master_strike.png';
}

export class mastermind_doctor_doom implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/doctor_doom/mastermind_doctor_doom.png';
    attack = 9;
    points = 5;
    alwaysLeads = 'doombotLegion';
    tactics = [
        {
            image: 'assets/cards/mastermind/doctor_doom/doctor_doom_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cardsList = board.hq.filter(card => card.color === 'grey' || card.color === 'white');
                if (cardsList.length !== 0) {
                    const heroDialog = dialog.open(HQDialog, {
                        data: {
                            cards: cardsList,
                            preview: tactic.image,
                            header: 'Recruit one Hero for free'
                        }
                    }).afterClosed().subscribe(hero => {
                        if (hero === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            const index = board.hq.findIndex(card => card === hero);
                            board.discardPile.push(board.hq.splice(index, 1));
                            board.hq.push(...board.heroDeck.draw());
                            heroDialog.unsubscribe();
                        }
                    });
                }
            }
        },
        {
            image: 'assets/cards/mastermind/doctor_doom/doctor_doom_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.playerHand.push(board.playerDeck.draw());
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
            const HandDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.cards,
                    preview: board.mastermind.image,
                    header: 'Put card on top their deck'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    numberOfChoosenCards++;
                    const index = board.playerHand.cards.findIndex(card => card === hero);
                    board.playerDeck.cards.unshift(...board.playerHand.pick(index));
                    HandDialog.unsubscribe();
                    if (numberOfChoosenCards !== 2) { open(); }
                }
            });
        }

        if (board.playerHand.cards.length === 6 && !board.playerHand.cards.some(card => card.color === 'grey')) {
            open();
        }
    }
}

export class mastermind_loki implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/loki/mastermind_loki.png';
    attack = 10;
    points = 5;
    alwaysLeads = 'enemiesOfAsgard';
    tactics = [
        {
            image: 'assets/cards/mastermind/loki/loki_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                if (board.fields.findIndex(field => field.card !== null) !== -1) {
                    const VillainDialog = dialog.open(HQDialog, {
                        data: {
                            cards: board.fields.filter(field => field.card != null).map(field => field.card),
                            preview: tactic.image,
                            header: 'Defeat Villain for free'
                        }
                    }).afterClosed().subscribe(card => {
                        if (card === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            const index = board.fields.findIndex(field => field.card === card);
                            board.victoryPile.push([board.fields[index].card]);
                            board.victoryPile.push(board.fields[index].bystanders);
                            board.fields[index].card = null;
                            board.fields[index].bystanders = [];
                            /* card fight function*/
                            VillainDialog.unsubscribe();
                        }
                    });
                }
            }
        },
        {
            image: 'assets/cards/mastermind/loki/loki_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.discardPile.shuffle();
                const length = 4 < board.discardPile.cards.length ? 4 : board.discardPile.cards.length;
                for (let i = 0; i < length; i++) {
                    board.KO.push(board.discardPile.draw());
                }
            }
        },
        {
            image: 'assets/cards/mastermind/loki/loki_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const villains = board.victoryPile.cards.filter(card => card.type === 'villain');
                const rest = board.victoryPile.cards.filter(card => card.type !== 'villain');
                board.KO.push(villains);
                board.victoryPile.cards = rest;
            }
        },
        {
            image: 'assets/cards/mastermind/loki/loki_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const bystanders = board.victoryPile.cards.filter(card => card.type === 'bystander');
                const length = 2 < bystanders.length ? 2 : bystanders.length;
                for (let i = 0; i < length; i++) {
                    board.KO.push(board.victoryPile.pick(board.victoryPile.cards.findIndex(card => card.type === 'bystander')));
                }
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        if (!board.playerHand.cards.some(card => card.color === 'green')) {
            board.discardPile.push(board.woundsDeck.draw());
        }
    }
}

export class mastermind_magneto implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/magneto/mastermind_magneto.png';
    attack = 8;
    points = 5;
    alwaysLeads = 'brotherhood';
    tactics = [
        {
            image: '/assets/cards/mastermind/magneto/magneto_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cardsList = board.hq.filter(card => card.team === 'x-men');
                if (cardsList.length !== 0) {
                    const heroDialog = dialog.open(HQDialog, {
                        data: {
                            cards: cardsList,
                            preview: tactic.image,
                            header: 'Recruit one Hero for free'
                        }
                    }).afterClosed().subscribe(hero => {
                        if (hero === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            const index = board.hq.findIndex(card => card === hero);
                            board.discardPile.push(board.hq.splice(index, 1));
                            const newCard = board.heroDeck.draw();
                            board.hq.push(...board.heroDeck.draw());
                            heroDialog.unsubscribe();
                        }
                    });
                }
            }
        },
        {
            image: '/assets/cards/mastermind/magneto/magneto_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                if (!board.playerCards.cards.some(card => card.team === 'x-men')) {
                    board.playerDeck.push(board.woundsDeck.draw().concat(board.woundsDeck.draw()));
                }
            }
        },
        {
            image: '/assets/cards/mastermind/magneto/magneto_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const cardsList = board.playerCards.cards.filter(card => card.team === 'x-men');
                if (cardsList.length !== 0) {
                    const heroDialog = dialog.open(HQDialog, {
                        data: {
                            cards: cardsList,
                            preview: tactic.image,
                            header: 'Choose one Hero'
                        }
                    }).afterClosed().subscribe(hero => {
                        if (hero === undefined) {
                            tactic.func(board, dialog, tactic);
                        } else {
                            const index = board.playerCards.cards.findIndex(card => card === hero);
                            board.playerDeck.cards.unshift(...board.playerCards.cards.splice(index, 1));
                            board.numberOfDrawing = 7;
                            heroDialog.unsubscribe();
                        }
                    });
                }
            }
        },
        {
            image: '/assets/cards/mastermind/magneto/magneto_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const length = board.playerCards.cards.filter(card => card.team === 'x-men').length;
                for (let i = 0; i < length; i++) {
                    board.victoryPile.push(board.bystandersDeck.draw());
                }
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        function open() {
            const HandDialog = dialog.open(HQDialog, {
                data: {
                    cards: board.playerHand.cards,
                    preview: board.mastermind.image,
                    header: 'Put card on discard Pile'
                }
            }).afterClosed().subscribe(hero => {
                if (hero === undefined) {
                    open();
                } else {
                    const index = board.playerHand.cards.findIndex(card => card === hero);
                    board.discardPile.cards.unshift(...board.playerHand.pick(index));
                    HandDialog.unsubscribe();
                    if (board.playerHand.cards.length > 4) {
                        open();
                    }
                }
            });
        }

        if (!board.playerHand.cards.some(card => card.team === 'x-men')) {
            open();
        }
    }
}

export class mastermind_red_skull implements Mastermind {
    type = 'mastermind';
    image = '/assets/cards/mastermind/red_skull/mastermind_red_skull.png';
    attack = 7;
    points = 5;
    alwaysLeads = 'hydra';
    tactics = [
        {
            image: '/assets/cards/mastermind/red_skull/red_skull_1.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.playerRecrutingPoints += 4;
            }
        },
        {
            image: '/assets/cards/mastermind/red_skull/red_skull_2.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                const length = board.victoryPile.cards.filter(card => card['team'] === 'hydra').length + 2;
                for (let i = 0; i < length; i++) {
                    board.playerHand.push(board.playerDeck.draw());
                }
            }
        },
        {
            image: '/assets/cards/mastermind/red_skull/red_skull_3.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {
                board.playerAttack += 3;
            }
        },
        {
            image: '/assets/cards/mastermind/red_skull/red_skull_4.png',
            func: (board: BoardService, dialog: MatDialog, tactic: Tactic) => {

                function ko() {
                    const KODialog = dialog.open(HQDialog, {
                        data: {
                            cards: cards,
                            preview: tactic.image,
                            header: 'KOs one card'
                        }
                    }).afterClosed().subscribe(hero => {
                        if (hero === undefined) {
                            ko();
                        } else {
                            const index = cards.findIndex(card => card === hero);
                            board.KO.push(cards.splice(index, 1));
                            KODialog.unsubscribe();
                            if (cards.length > 0) {
                                discard();
                            }
                        }
                    });
                }

                function discard() {
                    const discardDialog = dialog.open(HQDialog, {
                        data: {
                            cards: cards,
                            preview: tactic.image,
                            header: 'Discard one card'
                        }
                    }).afterClosed().subscribe(hero => {
                        if (hero === undefined) {
                            discard();
                        } else {
                            const index = cards.findIndex(card => card === hero);
                            board.discardPile.push(cards.splice(index, 1));
                            discardDialog.unsubscribe();
                            if (cards.length > 0) {
                                board.playerDeck.cards.unshift(cards[0]);
                            }
                        }
                    });
                }

                const cards = [...board.playerDeck.draw(), ...board.playerDeck.draw(), ...board.playerDeck.draw()];
                ko();
            }
        }
    ];
    masterStrike(board: BoardService, dialog: MatDialog) {
        board.KO.push(board.playerHand.cards);
        board.playerHand.cards = [];
    }
}
