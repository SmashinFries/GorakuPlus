export type ThemeOptions = 'mi_chan' | 'hinata' | 'kawaii' | 'aqua' | 'berserk' | 'punpun';
const themeOptions: ThemeOptions[] = ['mi_chan', 'hinata', 'kawaii', 'aqua', 'berserk', 'punpun'];
// type ThemeSelection = keyof typeof themes;
// export { themeDark, themeLight, themes, ThemeOptions, ThemeSelection };

import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, useTheme } from 'react-native-paper';
import { KawaiiDark, KawaiiLight } from '../../store/theme/m3/kawaiiTheme';
import { PunpunDark, PunpunLight } from '../../store/theme/m3/punpunTheme';
import { MionDark, MionLight } from '../../store/theme/m3/mionTheme';
import { BerserkLight, BerserkDark } from '../../store/theme/m3/berserkTheme';
import { AquaDark, AquaLight } from '../../store/theme/m3/aquaTheme';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const blurHashTheme = {
	light: {
		mi_chan: 'BvOqG-SK^-FYWAwM',
		hinata: 'LqQSlCRk_Mt7tht6xujYM|WBspa$',
		kawaii: 'LNRnE4xc-@Z~Vat8o|WByEn6o_tj',
		punpun: 'LMN^e:t7~qay~qIU-;?b-;WBofof',
		aqua: 'LcO4F~Vs~pkq-;-:s:E1-oR*M|R*',
		berserk: 'LeN5[8og|xr@^R$+J6J6=fS$NFsV',
	},
	dark: {
		mi_chan: 'B35E.^z]5Q?@m:NZ',
		hinata: 'L59%G6kC00RP0Jay-:kD00Rj~ntR',
		kawaii: 'L6JP.c[f00LW000d~W=h0J~p]?Hu',
		punpun: 'LMN^e:t7~qay~qIU-;?b-;WBofof',
		aqua: 'L8DA$V9jB=-f00VBZ2JXX=ox-:Rl',
		berserk: 'LeN5[8og|xr@^R$+J6J6=fS$NFsV',
	},
};

const HinataLightTheme = {
	...MD3LightTheme,
	...LightTheme,
	colors: {
		...MD3LightTheme.colors,
		...LightTheme.colors,
		blurhash: blurHashTheme.light.hinata,
	},
};
const HinataDarkTheme = {
	...MD3DarkTheme,
	...DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		...DarkTheme.colors,
		blurhash: blurHashTheme.dark.hinata,
	},
};

const KawaiiLightTheme = {
	...HinataLightTheme,
	colors: {
		...HinataLightTheme.colors,
		...KawaiiLight,
		blurhash: blurHashTheme.light.kawaii,
	},
};

const KawaiiDarkTheme = {
	...HinataDarkTheme,
	colors: {
		...HinataDarkTheme.colors,
		...KawaiiDark,
		blurhash: blurHashTheme.dark.kawaii,
	},
};

const PunpunLightTheme = {
	...HinataLightTheme,
	colors: {
		...HinataLightTheme.colors,
		...PunpunLight,
		blurhash: blurHashTheme.light.punpun,
	},
};

const PunpunDarkTheme = {
	...HinataDarkTheme,
	colors: {
		...HinataDarkTheme.colors,
		...PunpunDark,
		blurhash: blurHashTheme.dark.punpun,
	},
};

const MionLightTheme = {
	...HinataLightTheme,
	colors: {
		...HinataLightTheme.colors,
		...MionLight,
		blurhash: blurHashTheme.light.mi_chan,
	},
};

const MionDarkTheme = {
	...HinataDarkTheme,
	colors: {
		...HinataDarkTheme.colors,
		...MionDark,
		blurhash: blurHashTheme.dark.mi_chan,
	},
};

const AquaLightTheme = {
	...HinataLightTheme,
	colors: {
		...HinataLightTheme.colors,
		...AquaLight,
		blurhash: blurHashTheme.light.aqua,
	},
};

const AquaDarkTheme = {
	...HinataDarkTheme,
	colors: {
		...HinataLightTheme.colors,
		...AquaDark,
		blurhash: blurHashTheme.dark.aqua,
	},
};

const BerserkLightTheme = {
	...HinataLightTheme,
	colors: {
		...HinataLightTheme.colors,
		...BerserkLight,
		blurhash: blurHashTheme.light.berserk,
	},
};

const BerserkDarkTheme = {
	...HinataDarkTheme,
	colors: {
		...HinataDarkTheme.colors,
		...BerserkDark,
		blurhash: blurHashTheme.dark.berserk,
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

type AppTheme = typeof HinataLightTheme;

const useAppTheme = () => useTheme<AppTheme>();

export { availableThemes, themeOptions, useAppTheme, AppTheme };
