import { availableThemes } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { ReactNode, useMemo } from 'react';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SystemBars } from 'react-native-edge-to-edge';

export const PaperThemeProvider = ({ children }: { children: ReactNode }) => {
	const { isDark, mode, isAMOLED } = useThemeStore();
	const amoledColors: Partial<MD3Colors> = {
		background: '#000001',
		surface: '#000',
	};
	const currentTheme = useMemo(
		() =>
			isDark
				? isAMOLED
					? {
							...availableThemes['dark'][mode],
							colors: {
								...availableThemes['dark'][mode]['colors'],
								...amoledColors,
							},
						}
					: availableThemes['dark'][mode]
				: availableThemes['light'][mode],
		[mode, isDark, isAMOLED],
	);

	// useEffect(() => {
	// 	setStatusBarTranslucent(true);
	// 	if (isDark) {
	// 		setStatusBarStyle('light');
	// 	} else {
	// 		setStatusBarStyle('dark');
	// 	}
	// }, [isDark]);

	return (
		<PaperProvider
			theme={currentTheme}
			// theme={
			// 	isDark
			// 		? availableThemes['dark'][mode]
			// 			? availableThemes['dark'][mode]
			// 			: availableThemes['dark']['default']
			// 		: availableThemes['light'][mode]
			// 			? availableThemes['light'][mode]
			// 			: availableThemes['light']['default']
			// }
		>
			<ThemeProvider value={currentTheme}>
				{children}
				<SystemBars style={isDark ? 'light' : 'dark'} />
				{/* <StatusBar translucent={true} style={isDark ? 'light' : 'dark'} animated /> */}
			</ThemeProvider>
		</PaperProvider>
	);
};
