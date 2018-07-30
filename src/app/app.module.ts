import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material';

import { BoardService } from './services/board.service';
import { BoxService } from './services/box.service';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KOComponent } from './ko/ko.component';
import { CityscapeComponent } from './cityscape/cityscape.component';
import { HqComponent } from './hq/hq.component';
import { CardComponent } from './card/card.component';

import { CardsListDialog } from './dialogs/cards-list-dialog/cards-list.dialog';
import { SelectDialog } from './dialogs/cards-list-dialog/select.dialog';
import { SelectWithRandomDialog } from './dialogs/cards-list-dialog/select-with-random.dialog';
import { SelectGroupWithRandomDialog } from './dialogs/cards-list-dialog/select-group-with-random.dialog';

import { PlayCardsDialog } from './dialogs/play-cards-dialog/play-cards.dialog';
import { EndGameDialog } from './dialogs/end-game-dialog/end-game.dialog';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    KOComponent,
    CityscapeComponent,
    HqComponent,
    CardComponent,
    PlayCardsDialog,
    CardsListDialog,
    SelectDialog,
    SelectWithRandomDialog,
    SelectGroupWithRandomDialog,
    EndGameDialog,
    MenuComponent
  ],
  entryComponents: [
    PlayCardsDialog,
    CardsListDialog,
    SelectDialog,
    SelectWithRandomDialog,
    SelectGroupWithRandomDialog,
    EndGameDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: MenuComponent },
      { path: 'game', component: BoardComponent }
    ])
  ],
  providers: [BoardService, BoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
