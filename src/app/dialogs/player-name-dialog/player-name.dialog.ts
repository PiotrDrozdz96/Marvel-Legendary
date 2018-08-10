import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-player-name',
    templateUrl: './player-name.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class PlayerNameDialog {

    testText: HTMLElement;
    fontSize = 40;

    constructor(
        public dialogRef: MatDialogRef<PlayerNameDialog>,
        public board: BoardService
    ) {
        this.testText = document.createElement('p');
        this.testText.style.visibility = 'hidden';
        this.testText.style.display = 'inline';
        this.testText.style.position = 'absolute';
        this.testText.style.top = '0';
        this.testText.style.fontSize = this.fontSize + 'px';
        this.testText.innerHTML = this.board.leaderboards.name;
        document.body.appendChild(this.testText);
        dialogRef.afterClosed().subscribe(sub => {
            document.body.removeChild(this.testText);
        });
    }

    changeFontSize() {
        this.testText.innerHTML = this.board.leaderboards.name;
        while (this.testText.offsetWidth > 200) {
            this.fontSize--;
            (document.body.getElementsByClassName('name')[0] as HTMLElement).style.fontSize = this.fontSize + 'px';
            this.testText.style.fontSize = this.fontSize + 'px';
        }
        while (this.testText.offsetWidth < 180 && this.fontSize <= 40) {
            this.fontSize++;
            (document.body.getElementsByClassName('name')[0] as HTMLElement).style.fontSize = this.fontSize + 'px';
            this.testText.style.fontSize = this.fontSize + 'px';
        }
    }

}
