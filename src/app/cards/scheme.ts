import { Scheme, Card } from '../models/card';
import { BoardService } from '../board.service';
import { wound } from './wounds';

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
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
}

export class scheme_negative_zone_prison_breakout implements Scheme {
    type = 'scheme';
    image = '/assets/cards/scheme/scheme_negative_zone_prison_breakout.png';
    counterTwist = 0;
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
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
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(5, new scheme_twist); }
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
    twist(board: BoardService) { }
    setup(board: BoardService) { board.villianDeck.create(8, new scheme_twist); }
}
