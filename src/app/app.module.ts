import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';

import { BoardService } from './services/board.service';
import { BoxService } from './services/box.service';
import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KOComponent } from './ko/ko.component';
import { CityscapeComponent } from './cityscape/cityscape.component';
import { HqComponent } from './hq/hq.component';
import { CardComponent } from './card/card.component';
import { MenuComponent } from './menu/menu.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

import { CardsListDialog } from './dialogs/cards-list-dialog/cards-list.dialog';
import { SelectDialog } from './dialogs/cards-list-dialog/select.dialog';
import { SelectWithRandomDialog } from './dialogs/cards-list-dialog/select-with-random.dialog';
import { TextDialog } from './dialogs/text.dialog';

import { PlayerNameDialog } from './dialogs/player-name-dialog/player-name.dialog';
import { PlayCardsDialog } from './dialogs/play-cards-dialog/play-cards.dialog';
import { EndGameDialog } from './dialogs/end-game-dialog/end-game.dialog';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';

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
    EndGameDialog,
    MenuComponent,
    LeaderboardsComponent,
    MenuSliderComponent,
    PlayerNameDialog,
    TextDialog
  ],
  entryComponents: [
    PlayCardsDialog,
    CardsListDialog,
    SelectDialog,
    SelectWithRandomDialog,
    PlayerNameDialog,
    EndGameDialog,
    TextDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: MenuComponent },
      { path: 'game', component: BoardComponent },
      { path: 'leaderboards', component: LeaderboardsComponent }
    ], { useHash: true })
  ],
  providers: [BoardService, BoxService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
