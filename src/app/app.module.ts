import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material';

import { BoardService } from './board.service';
import { VillainsService } from './villains.service';
import { HeroService } from './hero.service';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KOComponent } from './ko/ko.component';
import { CityscapeComponent } from './cityscape/cityscape.component';
import { HqComponent } from './hq/hq.component';
import { CardComponent } from './card/card.component';
import { SelectMastermindDialog } from './select-dialog/select-mastermind.dialog';
import { SelectSchemeDialog } from './select-dialog/select-scheme.dialog';
import { SelectVillainsDialog } from './select-dialog/select-villains.dialog';
import { SelectHenchmenDialog } from './select-dialog/select-henchmen.dialog';
import { SelectHeroDialog } from './select-dialog/select-hero.dialog';
import { PlayCardsDialog } from './play-cards-dialog/play-cards.dialog';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    KOComponent,
    CityscapeComponent,
    HqComponent,
    CardComponent,
    SelectMastermindDialog,
    SelectSchemeDialog,
    SelectVillainsDialog,
    SelectHenchmenDialog,
    SelectHeroDialog,
    PlayCardsDialog
  ],
  entryComponents: [
    SelectMastermindDialog,
    SelectSchemeDialog,
    SelectVillainsDialog,
    SelectHenchmenDialog,
    SelectHeroDialog,
    PlayCardsDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [BoardService, VillainsService, HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
