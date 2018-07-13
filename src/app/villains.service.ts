import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Villain } from './models/card';
import {
    villain_brotherhood_blob,
    villain_brotherhood_juggernaut,
    villain_brotherhood_mystique,
    villain_brotherhood_sabretooth
} from './cards/villain/brootherhood';
import {
    villain_asgard_destroyer,
    villain_asgard_enchantress,
    villain_asgard_frost_giant,
    villain_asgard_ymir
} from './cards/villain/enemies_of_asgard';
import {
    villain_hydra_endless_armies_hydra,
    villain_hydra_kidnappers,
    villain_hydra_supreme_hydra,
    villain_hydra_viper
} from './cards/villain/hydra';
import {
    villain_masters_baron_zemo,
    villain_masters_melter,
    villain_masters_ultron,
    villain_masters_whirlwind
} from './cards/villain/masters_of_evil';
import {
    villain_radiation_abomination,
    villain_radiation_maestro,
    villain_radiation_theleader,
    villain_radiation_zzzax
} from './cards/villain/radiation';
import {
    villain_skrull_power_skrull,
    villain_skrull_queen_veranke,
    villain_skrull_shapeshifters,
    villain_skrull_super_skrull
} from './cards/villain/skrulls';
import {
    villain_spider_foes_doctor_octopus,
    villain_spider_foes_green_goblin,
    villain_spider_foes_the_lizard,
    villain_spider_foes_venom
} from './cards/villain/spider_foes';

@Injectable({
    providedIn: 'root'
})
export class VillainsService {

    private cards = [
        [
            new villain_brotherhood_blob,
            new villain_brotherhood_juggernaut,
            new villain_brotherhood_mystique,
            new villain_brotherhood_sabretooth
        ],
        [
            new villain_asgard_destroyer,
            new villain_asgard_enchantress,
            new villain_asgard_frost_giant,
            new villain_asgard_ymir
        ],
        [
            new villain_hydra_endless_armies_hydra,
            new villain_hydra_kidnappers,
            new villain_hydra_supreme_hydra,
            new villain_hydra_viper
        ],
        [
            new villain_masters_baron_zemo,
            new villain_masters_melter,
            new villain_masters_ultron,
            new villain_masters_whirlwind
        ],
        [
            new villain_radiation_abomination,
            new villain_radiation_maestro,
            new villain_radiation_theleader,
            new villain_radiation_zzzax
        ],
        [
            new villain_skrull_power_skrull,
            new villain_skrull_queen_veranke,
            new villain_skrull_shapeshifters,
            new villain_skrull_super_skrull
        ],
        [
            new villain_spider_foes_doctor_octopus,
            new villain_spider_foes_green_goblin,
            new villain_spider_foes_the_lizard,
            new villain_spider_foes_venom
        ]
    ];

    public cardsObs = new BehaviorSubject<Array<Array<Villain>>>(this.cards);

    constructor() { }

    getCards(): Observable<Array<Array<Villain>>> { return this.cardsObs.asObservable(); }
    splice(index: number): Array<Villain> {
        const result = this.cards[index];
        this.cards.splice(index, 1);
        return result;
    }

}
