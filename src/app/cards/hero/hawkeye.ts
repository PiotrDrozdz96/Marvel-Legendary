import { MatDialog } from '@angular/material';
import { skip } from 'rxjs/operators';
import { Hero, Team, Color } from '../../models/card';
import { BoardService } from '../../services/board.service';

// tslint:disable:class-name

export class rare implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hawkeye/hawkeye_rare.png';
    team: Team = 'avengers';
    color: Color = 'grey';
    attack = 5;
    recrutingPoints = 0;
    cost = 7;
    sub(board: BoardService) {
        return board.defeatedVillain().pipe(skip(1)).subscribe(sub => {
            board.victoryPile.put(board.bystandersDeck.draw().concat(board.bystandersDeck.draw(), board.bystandersDeck.draw()));
        });
    }
}

export class uncommon implements Hero {
    type = 'hero';
    image = 'assets/cards/hero/hawkeye/hawkeye_uncommon.png';
    team: Team = 'avengers';
    color: Color = 'grey';
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
    team: Team = 'avengers';
    color: Color = 'yellow';
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
    team: Team = 'avengers';
    color: Color = 'grey';
    attack = 2;
    recrutingPoints = 0;
    cost = 4;
    func(board: BoardService, dialog: MatDialog) {
        if (board.checkPlayedCards('team', 'avengers')) {
            board.playerAttack++;
        }
    }
}
