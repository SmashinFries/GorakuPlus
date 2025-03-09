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
	setTheme: ({ mode, isDark, isAMOLED }: ThemeState) => void;
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
	persist(
		(set, _get) => ({
			mode: 'mi_chan',
			isDark: Appearance.getColorScheme() === 'dark',
			isAMOLED: false,
			setTheme: ({ isDark, mode, isAMOLED }) =>
				switchTheme({
					switchThemeFunction: () => {
						set((state) => ({
							isDark: isDark !== undefined ? isDark : state.isDark,
							mode: mode !== undefined ? mode : state.mode,
							isAMOLED: isAMOLED !== undefined ? isAMOLED : state.isAMOLED,
						}));
					},
					animationConfig: {
						type: 'fade',
						duration: 900,
					},
				}),
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => ThemeStorage),
		},
	),
);
