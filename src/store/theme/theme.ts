export type ThemeOptions = 'default' | 'kawaii' | 'punpun' | 'sonozaki_mion' | 'aqua' | 'berserk';
const themeOptions: ThemeOptions[] = [
    'default',
    'kawaii',
    'punpun',
    'sonozaki_mion',
    'aqua',
    'berserk',
];
// type ThemeSelection = keyof typeof themes;
// export { themeDark, themeLight, themes, ThemeOptions, ThemeSelection };

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, MD3Theme, adaptNavigationTheme } from 'react-native-paper';
import { KawaiiDark, KawaiiLight } from './m3/kawaiiTheme';
import { PunpunDark, PunpunLight } from './m3/punpunTheme';
import { MionDark, MionLight } from './m3/mionTheme';
import { BerserkDark, BerserkLight } from './m3/berserkTheme';
import { AquaDark, AquaLight } from './m3/aquaTheme';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const DefaultLightTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
    },
};
const DefaultDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
    },
};

const KawaiiLightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...KawaiiLight,
    },
};

const KawaiiDarkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        ...KawaiiDark,
    },
};

const PunpunLightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...PunpunLight,
    },
};

const PunpunDarkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        ...PunpunDark,
    },
};

const MionLightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...MionLight,
    },
};

const MionDarkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        ...MionDark,
    },
};

const AquaLightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...AquaLight,
    },
};

const AquaDarkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...AquaDark,
    },
};

const BerserkLightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...BerserkLight,
    },
};

const BerserkDarkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultLightTheme.colors,
        ...BerserkDark,
    },
};

const lightThemes = {
    default: DefaultLightTheme,
    kawaii: KawaiiLightTheme,
    punpun: PunpunLightTheme,
    sonozaki_mion: MionLightTheme,
    aqua: AquaLightTheme,
    berserk: BerserkLightTheme,
};
const darkThemes = {
    default: DefaultDarkTheme,
    kawaii: KawaiiDarkTheme,
    punpun: PunpunDarkTheme,
    sonozaki_mion: MionDarkTheme,
    aqua: AquaDarkTheme,
    berserk: BerserkDarkTheme,
};
const availableThemes = {
    light: lightThemes,
    dark: darkThemes,
};

export { availableThemes, themeOptions };
