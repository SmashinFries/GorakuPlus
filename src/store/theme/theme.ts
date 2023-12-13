export type ThemeOptions = 'mi_chan' | 'hinata' | 'kawaii' | 'aqua' | 'berserk' | 'punpun';
const themeOptions: ThemeOptions[] = ['mi_chan', 'hinata', 'kawaii', 'aqua', 'berserk', 'punpun'];
// type ThemeSelection = keyof typeof themes;
// export { themeDark, themeLight, themes, ThemeOptions, ThemeSelection };

import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { KawaiiDark, KawaiiLight } from './m3/kawaiiTheme';
import { PunpunDark, PunpunLight } from './m3/punpunTheme';
import { MionDark, MionLight } from './m3/mionTheme';
import { BerserkLight, BerserkDark } from './m3/berserkTheme';
import { AquaDark, AquaLight } from './m3/aquaTheme';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const HinataLightTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
    },
};
const HinataDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
    },
};

const KawaiiLightTheme = {
    ...HinataLightTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...KawaiiLight,
    },
};

const KawaiiDarkTheme = {
    ...HinataDarkTheme,
    colors: {
        ...HinataDarkTheme.colors,
        ...KawaiiDark,
    },
};

const PunpunLightTheme = {
    ...HinataLightTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...PunpunLight,
    },
};

const PunpunDarkTheme = {
    ...HinataDarkTheme,
    colors: {
        ...HinataDarkTheme.colors,
        ...PunpunDark,
    },
};

const MionLightTheme = {
    ...HinataLightTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...MionLight,
    },
};

const MionDarkTheme = {
    ...HinataDarkTheme,
    colors: {
        ...HinataDarkTheme.colors,
        ...MionDark,
    },
};

const AquaLightTheme = {
    ...HinataLightTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...AquaLight,
    },
};

const AquaDarkTheme = {
    ...HinataDarkTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...AquaDark,
    },
};

const BerserkLightTheme = {
    ...HinataLightTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...BerserkLight,
    },
};

const BerserkDarkTheme = {
    ...HinataDarkTheme,
    colors: {
        ...HinataLightTheme.colors,
        ...BerserkDark,
    },
};

const lightThemes = {
    hinata: HinataLightTheme,
    kawaii: KawaiiLightTheme,
    punpun: PunpunLightTheme,
    mi_chan: MionLightTheme,
    aqua: AquaLightTheme,
    berserk: BerserkLightTheme,
};
const darkThemes = {
    hinata: HinataDarkTheme,
    kawaii: KawaiiDarkTheme,
    punpun: PunpunDarkTheme,
    mi_chan: MionDarkTheme,
    aqua: AquaDarkTheme,
    berserk: BerserkDarkTheme,
};
const availableThemes = {
    light: lightThemes,
    dark: darkThemes,
};

export { availableThemes, themeOptions };
