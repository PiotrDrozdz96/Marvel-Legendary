import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-player-name',
    templateUrl: './player-name.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class PlayerNameDialog {

    constructor(public board: BoardService) { }

}
