// import { makeTheme } from 'dripsy';
// import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme } from '@react-navigation/native';

// const darkColors = {
//     $background: '#010101',
//     $text: '#e5e5e7',
//     $primary: '#007aff',
//     $header: '#121212',
// };

// const themeDark = makeTheme({
//     colors: darkColors,
// });

// type MyTheme = typeof themeDark;
// declare module 'dripsy' {
//     type DripsyCustomTheme = MyTheme;
// }

// const lightColors: typeof darkColors = {
//     $text: '#1c1c1e',
//     $background: '#f2f2f2',
//     $primary: '#007aff',
//     $header: '#ffffff',
// };

// const kawaiiColors: typeof darkColors = {
//     $text: '#1c1c1e',
//     $background: '#FFAFCC',
//     $primary: '#007aff',
//     $header: '#ffffff',
// };

// const themeLight = {
//     ...themeDark,
//     colors: lightColors,
// };

// const themeKawaii = {
//     ...themeDark,
//     colors: kawaiiColors,
// };

// const themes = {
//     light: {
//         navTheme: NavLightTheme,
//         dripsyTheme: themeLight,
//     },
//     dark: {
//         navTheme: NavDarkTheme,
//         dripsyTheme: themeDark,
//     },
//     kawaii: {
//         navTheme: NavLightTheme,
//         dripsyTheme: themeKawaii,
//     },
// };

type ThemeOptions = 'default' | 'kawaii' | 'punpun' | 'sonozaki_mion';
// type ThemeSelection = keyof typeof themes;
// export { themeDark, themeLight, themes, ThemeOptions, ThemeSelection };

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, MD3Theme, adaptNavigationTheme } from 'react-native-paper';
import { NavigationTheme } from 'react-native-paper/lib/typescript/src/types';
import { KawaiiDark, KawaiiLight } from './m3/kawaiiTheme';
import { PunpunDark, PunpunLight } from './m3/punpunTheme';
import { MionDark, MionLight } from './m3/mionTheme';

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

const lightThemes = {
    default: DefaultLightTheme,
    kawaii: KawaiiLightTheme,
    punpun: PunpunLightTheme,
    sonozaki_mion: MionLightTheme,
};
const darkThemes = {
    default: DefaultDarkTheme,
    kawaii: KawaiiDarkTheme,
    punpun: PunpunDarkTheme,
    sonozaki_mion: MionDarkTheme,
};
const availableThemes = {
    light: lightThemes,
    dark: darkThemes,
};

export { availableThemes, ThemeOptions };
