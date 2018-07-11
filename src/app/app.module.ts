import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ShieldDeckComponent } from './shield-deck/shield-deck.component';
import { MastermindDeckComponent } from './mastermind-deck/mastermind-deck.component';
import { SchemeDeckComponent } from './scheme-deck/scheme-deck.component';
import { EscapedVillainsComponent } from './escaped-villains/escaped-villains.component';
import { KOComponent } from './ko/ko.component';
import { WoundsDeckComponent } from './wounds-deck/wounds-deck.component';
import { CityscapeComponent } from './cityscape/cityscape.component';
import { HqComponent } from './hq/hq.component';
import { BystandersDeckComponent } from './bystanders-deck/bystanders-deck.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ShieldDeckComponent,
    MastermindDeckComponent,
    SchemeDeckComponent,
    EscapedVillainsComponent,
    KOComponent,
    WoundsDeckComponent,
    CityscapeComponent,
    HqComponent,
    BystandersDeckComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
