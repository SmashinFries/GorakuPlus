import { availableThemes } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { ReactNode, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import { setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';

export const PaperThemeProvider = ({ children }: { children: ReactNode }) => {
	const { isDark, mode } = useThemeStore();

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
					? availableThemes['dark'][mode]
						? availableThemes['dark'][mode]
						: availableThemes['dark']['default']
					: availableThemes['light'][mode]
						? availableThemes['light'][mode]
						: availableThemes['light']['default']
			}
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
