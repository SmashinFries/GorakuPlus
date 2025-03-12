import { MMKV } from 'react-native-mmkv';
import { Appearance } from 'react-native';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { ThemeOptions } from './themes';
import switchTheme from 'react-native-theme-switch-animation';
import { create } from 'zustand';

const storage = new MMKV({ id: 'theme-storage' });
const ThemeStorage = getZustandStorage(storage);

export type ThemeState = {
	mode: ThemeOptions;
	isDark: boolean;
	isAMOLED: boolean;
};
type ThemeAction = {
	// setTheme: ({ mode, isDark, isAMOLED }: ThemeState) => void;
	setThemeMode: (mode: ThemeOptions) => void;
	setThemeDark: (isDark: boolean) => void;
	setThemeAMOLED: (isAMOLED: boolean) => void;
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
	persist(
		(set, _get) => ({
			mode: 'mi_chan',
			isDark: Appearance.getColorScheme() === 'dark',
			isAMOLED: false,
			setThemeMode: (mode) =>
				mode
					? set({ mode })
					: // switchTheme({
					// 	switchThemeFunction: () => {
					// 		set({
					// 			mode,
					// 		});
					// 	},
					// 	animationConfig: {
					// 		type: 'fade',
					// 		duration: 900,
					// 	},
					// })
					null,
			setThemeDark(isDark) {
				switchTheme({
					switchThemeFunction: () => {
						set({
							isDark,
						});
					},
					animationConfig: {
						type: 'fade',
						duration: 900,
					},
				})
				// set({ isDark: isDark });
			},
			setThemeAMOLED(isAMOLED) {
				set({ isAMOLED });
			},
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => ThemeStorage),
		},
	),
);
