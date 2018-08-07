import { BoardService } from '../services/board.service';
import { BoxService } from '../services/box.service';
import { MatDialog } from '@angular/material';
import { SelectWithRandomDialog } from '../dialogs/cards-list-dialog/select-with-random.dialog';
import { EndGameDialog } from '../dialogs/end-game-dialog/end-game.dialog';
import { Deck } from '../models/deck';
import { Scheme, Card, Villain, Hero } from '../models/card';
import { wound } from './wounds';
import { bystander } from './bystanders';
import * as henchman from './villain/henchmen';
import { BehaviorSubject } from 'rxjs';

import { shapeshifters } from './villain/skrulls';

// tslint:disable:class-name

export class scheme_twist implements Card {
    type = 'schemeTwist';
    image = 'assets/cards/scheme/scheme_twist.png';
}

export class legacy_virus implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_legacy_virus.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist) {
        if (!board.playerHand.some(card => card.color === 'grey')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
        board.KO.push(schemeTwist);
    }
    setup(board: BoardService, dialog: MatDialog) {
        board.villainDeck.create(8, new scheme_twist);
        board.woundsDeck.take();
        board.woundsDeck.create(6, new wound);
        board.drawVillain().subscribe(sub => {
            if (board.woundsDeck.length === 0) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    board.reload();
                });
            }
        });
    }
}

export class midtown_bank_robbery implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_midtown_bank_robbery.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist) {
        if (board.fields[1].card != null) {
            board.fields[1].bystanders.push(...board.bystandersDeck.draw(), ...board.bystandersDeck.draw());
            board.fields[1].attack = board.fields[1].bystanders.length;
        }
        board.KO.push(schemeTwist);
        board.drawVillainObs.next(true);
    }
    setup(board: BoardService, dialog: MatDialog) {
        const length = 12 - board.villainDeck.filter(card => card.type === 'bystander').length;
        board.villainDeck.create(8, new scheme_twist);
        for (let i = 0; i < length; i++) {
            board.villainDeck.put(board.bystandersDeck.draw());
        }
        board.drawVillain().subscribe(sub => {
            if (!sub) {
                board.fields.forEach(field => {
                    field.attack = field.bystanders.length;
                });
                if (board.escapedVillain.filter(card => card.type === 'bystander').length >= 8) {
                    dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                        board.reload();
                    });
                }
            }
        });
    }
}

export class negative_zone_prison_breakout implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_negative_zone_prison_breakout.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist) {
        board.KO.push(schemeTwist);
        board.drawVillainObs.next(true);
        board.drawVillainObs.next(true);
    }
    setup(board: BoardService, dialog: MatDialog, box: BoxService) {
        board.villainDeck.create(8, new scheme_twist);
        const setupObs = new BehaviorSubject<boolean>(false);
        dialog.open(SelectWithRandomDialog, {
            data: {
                array: Object.values(box.henchmenBox.cards),
                header: 'Select additional Henchman group'
            }
        }).afterClosed().subscribe(choosen => {
            board.villainDeck.create(10, box.pick('henchmen', choosen.index, false)[0]);
            setupObs.next(true);
        });
        board.drawVillain().subscribe(sub => {
            if (board.escapedVillain.filter(card => card.type === 'villain').length >= 12) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    board.reload();
                });
            }
        });

        return setupObs.asObservable();
    }
}

export class portals_dark_dimension implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_portals_dark_dimension.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist, dialog: MatDialog) {
        const index = board.fields.slice(0).reverse().findIndex(field =>
            !field.additionalCard.some(card => card.type === 'schemeTwist'));
        if (!board.mastermind.additionalCard.some(card => card.type === 'schemeTwist')) {
            board.mastermind.additionalCard.push(schemeTwist);
        } else if (index !== -1) {
            board.fields[4 - index].additionalCard.push(schemeTwist);
        } else {
            dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(sub => {
                board.reload();
            });
        }
    }
    setup(board: BoardService, dialog: MatDialog) {
        board.villainDeck.create(7, new scheme_twist);
        board.drawVillain().subscribe(sub => {
            if (!sub) {
                if (board.mastermind.additionalCard.some(card => card.type === 'schemeTwist')) {
                    board.mastermind.additionalAttack++;
                }
                board.fields.forEach(field => {
                    if (field.additionalCard.some(card => card.type === 'schemeTwist')) {
                        field.attack++;
                    }
                });
            }
        });
    }
}

export class replace_leaders_killbots implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_replace_leaders_killbots.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist) {
        board.fields.filter(field => field.card && field.card.team === 'killbots').forEach(field => {
            field.card.attack = board.scheme.counterTwist;
        });
        board.KO.push(schemeTwist);
    }
    setup(board: BoardService, dialog: MatDialog) {
        board.villainDeck.create(5, new scheme_twist);
        board.scheme.counterTwist = 3;
        const length = 18 - board.villainDeck.filter(card => card.type === 'bystander').length;
        const killbots = Object.assign(new bystander, {
            image: 'assets/cards/scheme/killbot.png',
            type: 'villain',
            team: 'killbots',
            attack: 3
        });
        board.villainDeck = board.villainDeck.map(card => card.type === 'bystander' ?
            Object.assign({}, killbots) : card, undefined, true) as Deck<Card>;
        board.villainDeck.create(length, killbots);
        board.drawVillain().subscribe(sub => {
            board.fields.filter(field => field.card && field.card.team === 'killbots').forEach(field => {
                field.card.attack = board.scheme.counterTwist;
            });
            if (board.escapedVillain.filter(card => card['team'] === 'killbots').length >= 5) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    board.reload();
                });
            }
        });
    }
}

class Skrull implements Villain {
    type = 'villain';
    image: string;
    team = 'hero';
    attack: number;
    points = 2;
    copiedHero = undefined;

    constructor(hero: Hero) {
        this.image = hero.image;
        this.attack = hero.cost + 2;
        this.copiedHero = hero;
    }

    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.push(this.copiedHero);
        this.image = (new shapeshifters).image;
    }
}

export class secret_invasion_shapeshifters implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_secret_invasion_shapeshifters.png';
    counterTwist = 0;
    alwaysLeads = {group: 'villain', name: 'skrulls'};
    twist(board: BoardService, schemeTwist: scheme_twist, dialog: MatDialog) {
        board.KO.push(schemeTwist);
        const index = board.hq.reduce((maxIndex, card, i, arr) => {
            return arr[maxIndex].cost > card.cost ? maxIndex : i;
        }, 0);
        if (index !== -1) {
            const hero = board.hq.splice(index, 1)[0];
            board.hq.push(...board.heroDeck.draw());
            board.moveVillains(new Skrull(hero), dialog);
        }
    }
    setup(board: BoardService, dialog: MatDialog, box: BoxService) {
        board.villainDeck.create(8, new scheme_twist);
        const setupObs = new BehaviorSubject<boolean>(false);
        open();
        function open() {
            const dialogRef = dialog.open(SelectWithRandomDialog, {
                data: {
                    array: Object.values(box.herosesBox.cards),
                    header: 'Select Heroses'
                }
            });
            dialogRef.afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    const choosenGroup = box.pick('heroses', choosen.index, false);
                    board.heroDeck.create(1, choosenGroup[0]);
                    board.heroDeck.create(3, choosenGroup[1]);
                    board.heroDeck.create(5, choosenGroup[2]);
                    board.heroDeck.create(5, choosenGroup[3]);
                    board.heroDeck.shuffle();
                    board.villainDeck.put(board.heroDeck.splice(0, 12).map(card => new Skrull(card)));
                    setupObs.next(true);
                }
            });
        }
        board.drawVillain().subscribe(sub => {
            if (board.escapedVillain.filter(card => card['team'] === 'hero').length >= 6) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    board.reload();
                });
            }
        });
        return setupObs.asObservable();
    }
}

export class super_hero_civil_war implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_super_hero_civil_war.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist) {
        board.KO.push(schemeTwist);
        board.KO.put(board.hq.take());
        for (let i = 0; i < 5; i++) {
            board.hq.push(...board.heroDeck.draw());
        }
    }
    setup(board: BoardService, dialog: MatDialog, box: BoxService) {
        board.villainDeck.create(8, new scheme_twist);
        const setupObs = new BehaviorSubject<boolean>(false);
        open();
        function open() {
            const dialogRef = dialog.open(SelectWithRandomDialog, {
                data: {
                    array: Object.values(box.herosesBox.cards),
                    header: 'Select Heroses'
                }
            });
            dialogRef.afterClosed().subscribe(choosen => {
                if (choosen === undefined) {
                    open();
                } else {
                    const choosenGroup = box.pick('heroses', choosen.index, false);
                    board.heroDeck.create(1, choosenGroup[0]);
                    board.heroDeck.create(3, choosenGroup[1]);
                    board.heroDeck.create(5, choosenGroup[2]);
                    board.heroDeck.create(5, choosenGroup[3]);
                    setupObs.next(true);
                }
            });
        }
        board.drawVillain().subscribe(sub => {
            if (board.heroDeck.length === 0) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    board.reload();
                });
            }
        });
        return setupObs.asObservable();
    }
}

export class unleash_cosmic_cube implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_unleash_cosmic_cube.png';
    counterTwist = 0;
    twist(board: BoardService, schemeTwist: scheme_twist, dialog: MatDialog) {
        board.KO.push(schemeTwist);
        switch (board.scheme.counterTwist) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            case 5:
            case 6:
                board.discardPile.put(board.woundsDeck.draw());
                break;
            case 7:
                board.discardPile.put(board.woundsDeck.draw().concat(board.woundsDeck.draw(), board.woundsDeck.draw()));
                break;
            case 8:
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(sub => {
                    board.reload();
                });
        }
    }
    setup(board: BoardService) { board.villainDeck.create(8, new scheme_twist); }
}
