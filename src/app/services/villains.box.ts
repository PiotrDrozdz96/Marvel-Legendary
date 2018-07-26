import { Box } from './box';
import * as villain_brotherhood from '../cards/villain/brootherhood';
import * as villain_asgard from '../cards/villain/enemies_of_asgard';
import * as villain_hydra from '../cards/villain/hydra';
import * as villain_masters from '../cards/villain/masters_of_evil';
import * as villain_radiation from '../cards/villain/radiation';
import * as villain_skrull from '../cards/villain/skrulls';
import * as villain_spider_foes from '../cards/villain/spider_foes';

export class VillainsBox extends Box {

    cards = [
        [
            new villain_brotherhood.blob,
            new villain_brotherhood.juggernaut,
            new villain_brotherhood.mystique,
            new villain_brotherhood.sabertooth
        ],
        [
            new villain_asgard.destroyer,
            new villain_asgard.enchantress,
            new villain_asgard.frost_giant,
            new villain_asgard.ymir
        ],
        [
            new villain_hydra.endless_armies_hydra,
            new villain_hydra.kidnappers,
            new villain_hydra.supreme_hydra,
            new villain_hydra.viper
        ],
        [
            new villain_masters.baron_zemo,
            new villain_masters.melter,
            new villain_masters.ultron,
            new villain_masters.whirlwind
        ],
        [
            new villain_radiation.abomination,
            new villain_radiation.maestro,
            new villain_radiation.theleader,
            new villain_radiation.zzzax
        ],
        [
            new villain_skrull.power_skrull,
            new villain_skrull.queen_veranke,
            new villain_skrull.shapeshifters,
            new villain_skrull.super_skrull
        ],
        [
            new villain_spider_foes.doctor_octopus,
            new villain_spider_foes.green_goblin,
            new villain_spider_foes.the_lizard,
            new villain_spider_foes.venom
        ]
    ];

}
