import { Villain } from '../../models/card';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material';

// tslint:disable:class-name

export class doctor_octopus implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/spider_foes/villain_spider_foes_doctor_octopus.png';
    team = 'spiderFoes';
    attack = 4;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        board.numberOfDrawing = 8;
    }
}

export class green_goblin implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/spider_foes/villain_spider_foes_green_goblin.png';
    team = 'spiderFoes';
    attack = 6;
    points = 4;
    ambush(board: BoardService, dialog: MatDialog) {
        board.fields[0].bystanders = board.bystandersDeck.draw();
    }
}

export class the_lizard implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/spider_foes/villain_spider_foes_the_lizard.png';
    team = 'spiderFoes';
    attack = 3;
    points = 2;
    fight(board: BoardService, dialog: MatDialog) {
        if (board.fields[0].card && board.fields[0].card === this) {
            board.discardPile.put(board.woundsDeck.draw());
        }
    }
}

export class venom implements Villain {
    type = 'villain';
    image = 'assets/cards/villain/spider_foes/villain_spider_foes_venom.png';
    team = 'spiderFoes';
    attack = 5;
    points = 3;
    escape(board: BoardService, dialog: MatDialog) {
        board.discardPile.put(board.woundsDeck.draw());
    }
}
