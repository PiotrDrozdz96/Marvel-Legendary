import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-text',
    template: `
        <h1>{{h1}}</h1>
        <h2>{{h2}}</h2>
    `
})
// tslint:disable-next-line:component-class-suffix
export class TextDialog {

    h1: string;
    h2: string;

    constructor(
        public dialogRef: MatDialogRef<TextDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.h1 = data.h1;
        this.h2 = data.h2;
    }

}
