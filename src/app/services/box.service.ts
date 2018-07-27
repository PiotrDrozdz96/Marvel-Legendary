import { Injectable } from '@angular/core';
import { BoxArray, BoxObject } from './box';
import { HeroBox } from './hero.box';
import { MastermindBox } from './mastermind.box';
import { SchemeBox } from './scheme.box';
import { VillainsBox } from './villains.box';
import { HenchmenBox } from './henchmen.box';

@Injectable({
    providedIn: 'root'
  })
  export class BoxService {

    mastermindBox: BoxArray;
    schemeBox: BoxArray;
    villainsBox: BoxObject;
    henchmenBox: BoxObject;
    heroBox: BoxArray;

      constructor() {
          this.mastermindBox = new MastermindBox;
          this.schemeBox = new SchemeBox;
          this.villainsBox = new VillainsBox;
          this.henchmenBox = new HenchmenBox;
          this.heroBox = new HeroBox;
      }
  }
