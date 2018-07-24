import { BoardService } from '../services/board.service';
import { BoxService } from '../services/box.service';
import { MatDialog } from '@angular/material';
import { SelectWithRandomDialog } from '../dialogs/cards-list-dialog/select-with-random.dialog';
import { EndGameDialog } from '../dialogs/end-game-dialog/end-game.dialog';
import { Deck } from '../models/deck';
import { Scheme, Card, Villain } from '../models/card';
import { wound } from './wounds';
import { bystander } from './bystanders';
import * as henchman from './villain/henchmen';
import { BehaviorSubject } from 'rxjs';

// tslint:disable:class-name

export class scheme_twist implements Card {
    type = 'schemeTwist';
    image = 'assets/cards/scheme/scheme_twist.png';
}

export class legacy_virus implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_legacy_virus.png';
    counterTwist = 0;
    twist(board: BoardService) {
        if (!board.playerHand.some(card => card.color === 'grey')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
    setup(board: BoardService, dialog: MatDialog) {
        board.villianDeck.create(8, new scheme_twist);
        board.woundsDeck.take();
        board.woundsDeck.create(6, new wound);
        board.drawVillain().subscribe(sub => {
            if (board.woundsDeck.length === 0) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    location.reload();
                });
            }
        });
    }
}

export class midtown_bank_robbery implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_midtown_bank_robbery.png';
    counterTwist = 0;
    twist(board: BoardService) {
        if (board.fields[1].card != null) {
            board.fields[1].bystanders.push(...board.bystandersDeck.draw(), ...board.bystandersDeck.draw());
            board.fields[1].attack = board.fields[1].bystanders.length;
        }
        board.drawVillainObs.next(true);
    }
    setup(board: BoardService, dialog: MatDialog) {
        const length = 12 - board.villianDeck.filter(card => card.type === 'bystander').length;
        board.villianDeck.create(8, new scheme_twist);
        for (let i = 0; i < length; i++) {
            board.villianDeck.put(board.bystandersDeck.draw());
        }
        board.drawVillain().subscribe(sub => {
            board.fields.forEach(field => {
                field.attack = field.bystanders.length;
            });
            if (board.escapedVillain.filter(card => card.type === 'bystander').length >= 8) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    location.reload();
                });
            }
        });
    }
}

export class negative_zone_prison_breakout implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_negative_zone_prison_breakout.png';
    counterTwist = 0;
    twist(board: BoardService) {
        board.drawVillainObs.next(true);
        board.drawVillainObs.next(true);
    }
    setup(board: BoardService, dialog: MatDialog, box: BoxService) {
        board.villianDeck.create(8, new scheme_twist);
        const setupObs = new BehaviorSubject<boolean>(false);
        const beforeHenchmen = board.villianDeck.filter((card) => card['team'] === 'henchman');
        dialog.open(SelectWithRandomDialog, {
            data: {
                array: box.henchmenBox.cards,
                header: 'Select additional Henchman group'
            }
        }).afterClosed().subscribe(choosen => {
            board.villianDeck.create(10, box.henchmenBox.pick(choosen.index)[0]);
            board.villianDeck.create(10 - beforeHenchmen.length, beforeHenchmen[0]);
            setupObs.next(true);
        });
        board.drawVillain().subscribe(sub => {
            if (board.escapedVillain.filter(card => card.type === 'villain').length >= 12) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    location.reload();
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
    twist(board: BoardService) { }
    setup(board: BoardService, dialog: MatDialog) { board.villianDeck.create(7, new scheme_twist); }
}

export class replace_leaders_killbots implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_replace_leaders_killbots.png';
    counterTwist = 0;
    twist(board: BoardService) {
        board.fields.filter(field => field.card && field.card.team === 'killbots').forEach(field => {
            field.card.attack = board.scheme.counterTwist;
        });
    }
    setup(board: BoardService, dialog: MatDialog) {
        board.villianDeck.create(5, new scheme_twist);
        board.scheme.counterTwist = 3;
        const length = 18 - board.villianDeck.filter(card => card.type === 'bystander').length;
        const killbots = Object.assign(new bystander, {
            image: 'assets/cards/scheme/killbot.png',
            type: 'villain',
            team: 'killbots',
            attack: 3
        });
        board.villianDeck = board.villianDeck.map(card => card.type === 'bystander' ?
            Object.assign({}, killbots) : card, undefined, true) as Deck<Card>;
        board.villianDeck.create(length, killbots);
        board.drawVillain().subscribe(sub => {
            board.fields.filter(field => field.card && field.card.team === 'killbots').forEach(field => {
                field.card.attack = board.scheme.counterTwist;
            });
            if (board.escapedVillain.filter(card => card.team === 'killbots').length >= 5) {
                dialog.open(EndGameDialog, { data: { header: 'lose' } }).afterClosed().subscribe(subs => {
                    location.reload();
                });
            }
        });
    }
}

export class secret_invasion_shapeshifters implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_secret_invasion_shapeshifters.png';
    counterTwist = 0;
    twist(board: BoardService) { }
    setup(board: BoardService, dialog: MatDialog) { board.villianDeck.create(8, new scheme_twist); }
}

export class super_hero_civil_war implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_super_hero_civil_war.png';
    counterTwist = 0;
    twist(board: BoardService) { }
    setup(board: BoardService, dialog: MatDialog) { board.villianDeck.create(8, new scheme_twist); }
}

export class unleash_cosmic_cube implements Scheme {
    type = 'scheme';
    image = 'assets/cards/scheme/scheme_unleash_cosmic_cube.png';
    counterTwist = 0;
    twist(board: BoardService, dialog: MatDialog) {
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
                    location.reload();
                });
        }
    }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
}
