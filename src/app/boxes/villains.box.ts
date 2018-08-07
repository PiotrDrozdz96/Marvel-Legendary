import { Box } from '../models/box';
import { Group } from '../models/group';
import { Villain } from '../models/card';
import * as villain_brotherhood from '../cards/villain/brootherhood';
import * as villain_asgard from '../cards/villain/enemies_of_asgard';
import * as villain_hydra from '../cards/villain/hydra';
import * as villain_masters from '../cards/villain/masters_of_evil';
import * as villain_radiation from '../cards/villain/radiation';
import * as villain_skrull from '../cards/villain/skrulls';
import * as villain_spider_foes from '../cards/villain/spider_foes';

export class VillainsBox extends Box {

    cards = {
        brootherhood: new Group<Villain>({
            name: 'Brootherhood',
            image: 'assets/cards/villain/brotherhood/brotherhood.png',
            cards: [
                new villain_brotherhood.blob,
                new villain_brotherhood.juggernaut,
                new villain_brotherhood.mystique,
                new villain_brotherhood.sabertooth
            ],
          }),
        enemies_of_asgard: new Group<Villain>({
            name: 'Enemies of Asgard',
            image: 'assets/cards/villain/enemies_of_asgard/enemies_of_asgard.png',
            cards: [
                new villain_asgard.destroyer,
                new villain_asgard.enchantress,
                new villain_asgard.frost_giant,
                new villain_asgard.ymir
            ],
          }),
        hydra: new Group<Villain>({
            name: 'Hydra',
            image: 'assets/cards/villain/hydra/hydra.png',
            cards: [
                new villain_hydra.endless_armies_hydra,
                new villain_hydra.kidnappers,
                new villain_hydra.supreme_hydra,
                new villain_hydra.viper
            ],
          }),
        masters_of_evil: new Group<Villain>({
            name: 'Masters of Evils',
            image: 'assets/cards/villain/masters_of_evil/masters_of_evil.png',
            cards: [
                new villain_masters.baron_zemo,
                new villain_masters.melter,
                new villain_masters.ultron,
                new villain_masters.whirlwind
            ],
          }),
        radiation: new Group<Villain>({
            name: 'Radiation',
            image: 'assets/cards/villain/radiation/radiation.png',
            cards: [
                new villain_radiation.abomination,
                new villain_radiation.maestro,
                new villain_radiation.theleader,
                new villain_radiation.zzzax
            ],
          }),
        skrulls: new Group<Villain>({
            name: 'Skrulls',
            image: 'assets/cards/villain/skrulls/skrulls.png',
            cards: [
                new villain_skrull.power_skrull,
                new villain_skrull.queen_veranke,
                new villain_skrull.shapeshifters,
                new villain_skrull.super_skrull
            ],
          }),
        spider_foes: new Group<Villain>({
            name: 'Spider-Foes',
            image: 'assets/cards/villain/spider_foes/spider_foes.png',
            cards: [
                new villain_spider_foes.doctor_octopus,
                new villain_spider_foes.green_goblin,
                new villain_spider_foes.the_lizard,
                new villain_spider_foes.venom
            ]
          }),
    };

}
