import { Component } from '@angular/core';
import { SelectDialog } from './select.dialog';

@Component({
    selector: 'app-select',
    templateUrl: './select-with-random.dialog.html',
    styleUrls: ['./select-dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class SelectWithRandomDialog extends SelectDialog {

    randomImage = 'assets/back_of_card.png';

    random() { this.dialogRef.close({
        card: undefined,
        index: Math.floor(Math.random() * this.array.length)
    }); }

}
