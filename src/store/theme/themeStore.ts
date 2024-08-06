import { MMKV } from 'react-native-mmkv';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { ThemeOptions } from './themes';
import switchTheme from 'react-native-theme-switch-animation';

const storage = new MMKV({ id: 'theme-storage' });
const ThemeStorage = getZustandStorage(storage);

type ThemeState = {
	mode?: ThemeOptions;
	isDark?: boolean;
};
type ThemeAction = {
	setTheme: ({ mode, isDark }: ThemeState) => void;
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
	persist(
		(set, get) => ({
			mode: 'mi_chan',
			isDark: Appearance.getColorScheme() === 'dark',
			setTheme: ({ isDark, mode }) =>
				switchTheme({
					switchThemeFunction: () => {
						set((state) => ({
							isDark: isDark !== undefined ? isDark : state.isDark,
							mode: mode !== undefined ? mode : state.mode,
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
