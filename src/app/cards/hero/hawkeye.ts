import { Hero } from '../../models/card';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hawkeye/hawkeye_rare.png';
    team = 'avengers';
    color = 'grey';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    defeatedVillain = 0;
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hawkeye/hawkeye_uncommon.png';
    team = 'avengers';
    color = 'grey';
    attack = 3;
    recrutingPoints = 0;
    cost = 5;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('color', 'grey')) {
            board.playerHand.put(board.playerDeck.draw());
        }
    }
}

export class common_1 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hawkeye/hawkeye_common_1.png';
    team = 'avengers';
    color = 'yellow';
    attack = 1;
    recrutingPoints = 0;
    cost = 3;
    func(board: BoardService, dialog: MatDialog) {
        board.playerHand.put(board.playerDeck.draw());
    }
}

export class common_2 implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hawkeye/hawkeye_common_2.png';
    team = 'avengers';
    color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('team', 'avengers')) {
            board.playerAttack++;
        }
    }
}
