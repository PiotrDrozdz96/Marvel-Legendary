import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { EscapedVillainsComponent } from './escaped-villains/escaped-villains.component';
import { KOComponent } from './ko/ko.component';
import { CityscapeComponent } from './cityscape/cityscape.component';
import { HqComponent } from './hq/hq.component';
import { CardComponent } from './card/card.component';
import { SelectMastermindDialog } from './select-dialog/select-mastermind.dialog';
import { SelectSchemeDialog } from './select-dialog/select-scheme.dialog';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    EscapedVillainsComponent,
    KOComponent,
    CityscapeComponent,
    HqComponent,
    CardComponent,
    SelectMastermindDialog,
    SelectSchemeDialog
  ],
  entryComponents: [
    SelectMastermindDialog,
    SelectSchemeDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
