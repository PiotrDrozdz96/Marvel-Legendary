import { Box } from './box';
import * as scheme from '../cards/scheme';

export class SchemeBox extends Box {

    cards = [
        new scheme.legacy_virus,
        new scheme.midtown_bank_robbery,
        new scheme.negative_zone_prison_breakout,
        // new scheme.portals_dark_dimension,
        new scheme.replace_leaders_killbots,
        // new scheme.secret_invasion_shapeshifters,
        // new scheme.super_hero_civil_war,
        new scheme.unleash_cosmic_cube
      ];
}
