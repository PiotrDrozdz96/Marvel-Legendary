import { Scheme, Card } from '../models/card';
import { BoardService } from '../board.service';
import { wound } from './wounds';
import { henchman_sentinel, henchman_doombot_legion, henchman_hand_ninjas, henchman_savage_land_mutants } from '../cards/villain/henchmen';
import { bystander } from './bystanders';

// tslint:disable:class-name

export class scheme_twist implements Card {
    type = 'schemeTwist';
    image = '/assets/cards/scheme/scheme_twist.png';
}

export class scheme_legacy_virus implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_legacy_virus.png';
    counterTwist = 0;
    twist(board: BoardService) {
        if (!board.playerHand.cards.some(card => card.color === 'grey')) {
            board.discardPile.push(board.woundsDeck.draw());
        }
    }
    setup(board: BoardService) {
        board.villianDeck.create(8, new scheme_twist);
        board.woundsDeck.cards = [];
        board.woundsDeck.create(6, new wound);
        board.nextTurn().subscribe(sub => {
            if (board.woundsDeck.cards.length === 0) {
                console.log('Evil Wins');
            }
        });
    }
}

export class scheme_midtown_bank_robbery implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_midtown_bank_robbery.png';
    counterTwist = 0;
    twist(board: BoardService) {
        if (board.fields[1].card != null) {
            board.fields[1].bystanders.push(...board.bystandersDeck.draw(), ...board.bystandersDeck.draw());
            board.fields[1].attack = board.fields[1].bystanders.length;
        }
    }
    setup(board: BoardService) {
        const length = 12 - board.villianDeck.cards.filter(card => card.type === 'bystander').length;
        board.villianDeck.create(8, new scheme_twist);
        for (let i = 0; i < length; i++) {
            board.villianDeck.push(board.bystandersDeck.draw());
        }
        board.nextTurn().subscribe(sub => {
            board.fields.forEach(field => {
                field.attack = field.bystanders.length;
            });
            if (board.escapedVillain.cards.filter(card => card.type === 'bystander').length >= 8) {
                console.log('Evil Wins');
            }
        });
    }
}

export class scheme_negative_zone_prison_breakout implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_negative_zone_prison_breakout.png';
    counterTwist = 0;
    twist(board: BoardService) {
        board.nextTurnObs.next(true);
        board.nextTurnObs.next(true);
    }
    setup(board: BoardService) {
        board.villianDeck.create(8, new scheme_twist);
        const beforeHenchmen = board.villianDeck.cards.filter(card => card['team'] === 'henchman');
        const henchmen = [
            new henchman_sentinel,
            new henchman_doombot_legion,
            new henchman_hand_ninjas,
            new henchman_savage_land_mutants
        ];
        const cards = henchmen.reduce((arr, card) => {
            return card.image === beforeHenchmen[0].image ? arr : arr.concat([card]);
        }, []);
        board.villianDeck.create(10, cards[Math.floor(Math.random() * cards.length)]);
        board.villianDeck.create(10 - beforeHenchmen.length, beforeHenchmen[0]);
        board.nextTurn().subscribe(sub => {
            if (board.escapedVillain.cards.filter(card => card.type === 'villain').length >= 12) {
                console.log('Evil Wins');
            }
        });
    }
}

export class scheme_portals_dark_dimension implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_portals_dark_dimension.png';
    counterTwist = 0;
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(7, new scheme_twist); }
}

export class scheme_replace_leaders_killbots implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_replace_leaders_killbots.png';
    counterTwist = 0;
    twist(board: BoardService) {
        board.fields.filter(field => field.card && field.card.team === 'killbots').forEach(field => {
            field.card.attack = board.scheme.counterTwist;
        });
    }
    setup(board: BoardService) {
        board.villianDeck.create(5, new scheme_twist);
        board.scheme.counterTwist = 3;
        const length = 18 - board.villianDeck.cards.filter(card => card.type === 'bystander').length;
        const killbots = Object.assign(new bystander, {
            image: '/assets/cards/scheme/killbot.png',
            type: 'villain',
            team: 'killbots',
            attack: 3
        });
        board.villianDeck.cards = board.villianDeck.cards.map(card => card.type === 'bystander' ? Object.assign({}, killbots) : card);
        board.villianDeck.create(length, killbots);
        board.nextTurn().subscribe(sub => {
            board.fields.filter(field => field.card && field.card.team === 'killbots').forEach(field => {
                field.card.attack = board.scheme.counterTwist;
            });
            if (board.escapedVillain.cards.filter(card => card.team === 'killbots').length >= 5) {
                console.log('Evil Wins');
            }
        });
    }
}

export class scheme_secret_invasion_shapeshifters implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_secret_invasion_shapeshifters.png';
    counterTwist = 0;
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
}

export class scheme_super_hero_civil_war implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_super_hero_civil_war.png';
    counterTwist = 0;
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
}

export class scheme_unleash_cosmic_cube implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_unleash_cosmic_cube.png';
    counterTwist = 0;
    twist(board: BoardService) {
        switch (board.scheme.counterTwist) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            case 5:
            case 6:
                board.discardPile.push(board.woundsDeck.draw());
                break;
            case 7:
                board.discardPile.push(board.woundsDeck.draw().concat(board.woundsDeck.draw().concat(board.woundsDeck.draw())));
                break;
            case 8:
                console.log('Evil Wins');
        }
    }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
}
