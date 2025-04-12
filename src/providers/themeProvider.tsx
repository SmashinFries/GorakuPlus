import { availableThemes, ThemeOptions } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { ReactNode, useMemo } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import { MD3Colors, MD3Theme } from 'react-native-paper/lib/typescript/types';
import { createMaterial3Theme, Material3Theme } from '@pchmn/expo-material3-theme';

const amoledColors: Partial<MD3Colors> = {
	background: '#000001',
	surface: '#000',
};

const createPresetTheme = (mode: ThemeOptions, isDark: boolean, isAMOLED: boolean) => {
	if (mode === 'custom') return;

	if (isAMOLED) {
		return {
			...availableThemes[isDark ? 'dark' : 'light'][mode],
			colors: {
				...availableThemes[isDark ? 'dark' : 'light'][mode].colors,
				...amoledColors,
				// elevation:
			},
		} as MD3Theme;
	} else {
		return availableThemes[isDark ? 'dark' : 'light'][mode];
	}
};

const createCustomThemeBase = (theme: Material3Theme, isDark: boolean, isAMOLED: boolean) => {
	return isDark
		? {
				...MD3DarkTheme,
				colors: isAMOLED
					? { ...MD3DarkTheme.colors, ...theme.dark, ...amoledColors }
					: theme.dark,
			}
		: { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...theme.light } };
};

export const PaperThemeProvider = ({ children }: { children: ReactNode }) => {
	const { isDark, mode, customColor, isAMOLED } = useThemeStore();

	const currentTheme = useMemo(() => {
		if (mode === 'custom' && customColor) {
			return createCustomThemeBase(createMaterial3Theme(customColor), isDark, isAMOLED);
		} else {
			return createPresetTheme(mode, isDark, isAMOLED);
		}
	}, [mode, isDark, customColor, isAMOLED]);

	return (
		<PaperProvider theme={currentTheme}>
			<ThemeProvider value={currentTheme as any}>{children}</ThemeProvider>
		</PaperProvider>
	);
};
