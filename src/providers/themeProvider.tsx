import { availableThemes } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { ReactNode, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import { setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';
import { StatusBar } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export const PaperThemeProvider = ({ children }: { children: ReactNode }) => {
	const { isDark, mode, isAMOLED } = useThemeStore();
	const amoledColors: MD3Colors = {
		background: '#000001',
		surface: '#000',
	};

	useEffect(() => {
		setStatusBarTranslucent(true);
		if (isDark) {
			setStatusBarStyle('light');
		} else {
			setStatusBarStyle('dark');
		}
	}, [isDark]);

	return (
		<PaperProvider
			theme={
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
					: availableThemes['light'][mode]
			}
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
			<ThemeProvider
				value={
					isDark
						? availableThemes['dark'][mode]
							? availableThemes['dark'][mode]
							: availableThemes['dark']['default']
						: availableThemes['light'][mode]
							? availableThemes['light'][mode]
							: availableThemes['light']['default']
				}
			>
				{children}
			</ThemeProvider>
		</PaperProvider>
	);
};
