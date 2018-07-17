import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class villain_hydra_endless_armies_hydra implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/hydra/villain_hydra_endless_armies_hydra.png';
    team = 'hydra';
    attack = 4;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        board.nextTurnObs.next(true);
        board.nextTurnObs.next(true);
    }
}

export class villain_hydra_kidnappers implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/hydra/villain_hydra_kidnappers.png';
    team = 'hydra';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.push(board.shieldDeck.draw());
    }
}

export class villain_hydra_supreme_hydra implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/hydra/villain_hydra_supreme_hydra.png';
    team = 'hydra';
    attack = 6;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        this.points = this.points * board.victoryPile.cards.filter(card => card['team'] === 'hydra').length;
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}

export class villain_hydra_viper implements Villain {
    type = 'villain';
    image = '/assets/cards/villain/hydra/villain_hydra_viper.png';
    team = 'hydra';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.victoryPile.cards.find(card => card['team'] === 'hydra')) {
            board.discardPile.push(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}
