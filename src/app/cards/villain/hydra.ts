import { Villain } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class endless_armies_hydra implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/hydra/villain_hydra_endless_armies_hydra.png';
    team = 'hydra';
    attack = 4;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        board.drawVillainObs.next(true);
        board.drawVillainObs.next(true);
    }
}

export class kidnappers implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/hydra/villain_hydra_kidnappers.png';
    team = 'hydra';
    attack = 3;
    points = 1;
    fight(board: BoardService, dialog: MatDialog) {
        board.discardPile.put(board.shieldDeck.draw());
    }
}

export class supreme_hydra implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/hydra/villain_hydra_supreme_hydra.png';
    team = 'hydra';
    attack = 6;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        this.points = this.points * board.victoryPile.filter(card => card['team'] === 'hydra').length;
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}

export class viper implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/hydra/villain_hydra_viper.png';
    team = 'hydra';
    attack = 5;
    points = 3;
    fight(board: BoardService, dialog: MatDialog) {
        if (!board.victoryPile.find(card => card['team'] === 'hydra')) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
    escape = (board: BoardService, dialog: MatDialog) => this.fight(board, dialog);
}
