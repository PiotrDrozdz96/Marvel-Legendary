import { Box } from './box';
import * as scheme from '../cards/scheme';

export class SchemeBox extends Box {

    cards = {
        legacy_virus: new scheme.legacy_virus,
        midtown_bank_robbery: new scheme.midtown_bank_robbery,
        negative_zone_prison_breakout: new scheme.negative_zone_prison_breakout,
        portals_dark_dimnesion: new scheme.portals_dark_dimension,
        replece_leaders_killbots: new scheme.replace_leaders_killbots,
        secret_invasion_shapeshifters: new scheme.secret_invasion_shapeshifters,
        super_hero_civil_war: new scheme.super_hero_civil_war,
        unleash_cosmic_cube: new scheme.unleash_cosmic_cube
    };
}
