import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { ThemeCustomSkeleton, ThemeSkeleton } from './more/settings/appearance/skeletons';
import { IconButton, Text } from 'react-native-paper';
import { availableThemes, ThemeOptions } from '@/store/theme/themes';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export type ThemeCardProps = {
	item: Omit<ThemeOptions, 'custom'>;
	currentMode: ThemeOptions;
	isDark: boolean;
	onPress: () => void;
};
export const ThemeCard = ({ item, currentMode, isDark, onPress }: ThemeCardProps) => {
	const themeColors =
		availableThemes[isDark ? 'dark' : 'light'][item as keyof (typeof availableThemes)['dark']]
			.colors;
	return (
		<Pressable
			style={{
				marginHorizontal: 10,
				borderRadius: 12,
				overflow: 'hidden',
			}}
			onPress={onPress}
			android_ripple={{
				foreground: true,
				color: themeColors.primary,
			}}
		>
			<View
				style={{
					borderWidth: 1,
					borderColor: currentMode === item ? themeColors.primary : 'transparent',
					borderRadius: 12,
					alignItems: 'center',
					paddingHorizontal: 15,
					paddingVertical: 10,
				}}
			>
				<ThemeSkeleton colors={themeColors} active={currentMode === item} />
				<Text
					style={{
						paddingHorizontal: 10,
						paddingTop: 10,
						textTransform: 'capitalize',
						alignSelf: 'center',
					}}
					numberOfLines={2}
				>
					{item.replaceAll('_', ' ')}
				</Text>
			</View>
		</Pressable>
	);
};

export type ThemeCustomCardProps = {
	currentMode: ThemeOptions;
	currentColors: MD3Colors;
};
export const ThemeCustomCard = ({ currentMode, currentColors }: ThemeCustomCardProps) => {
	return (
		<Pressable
			style={{
				marginHorizontal: 10,
				borderRadius: 12,
				overflow: 'hidden',
			}}
			onPress={() => router.navigate('/(dialogs)/customThemeDialog')}
			android_ripple={{
				foreground: true,
				color: currentColors.primary,
			}}
		>
			<ThemeCustomSkeleton colors={currentColors} active={currentMode === 'custom'} />
			<Text
				style={{
					paddingHorizontal: 10,
					textTransform: 'capitalize',
					alignSelf: 'center',
				}}
				numberOfLines={2}
			>
				Custom
			</Text>
		</Pressable>
	);
};

export const LightDarkButton = ({
	mode,
	colors,
	isSelected,
	onPress,
}: {
	mode: 'light' | 'dark' | 'AMOLED';
	colors: MD3Colors;
	// isDark: boolean;
	// isAMOLED: boolean;
	isSelected: boolean;
	onPress: () => void;
}) => {
	// const isSelected = mode === 'dark' ? isDark : mode === 'light' ? !isDark : isAMOLED;
	return (
		<Pressable
			onPress={onPress}
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: isSelected ? colors.primaryContainer : undefined,
				borderRadius: 12,
				padding: 6,
				overflow: 'hidden',
			}}
			android_ripple={{ color: colors.backdrop, foreground: true }}
		>
			<IconButton
				icon={mode === 'dark' || mode === 'AMOLED' ? 'weather-night' : 'weather-sunny'}
				selected={isSelected}
			/>
			<Text
				variant="labelLarge"
				style={{
					color: isSelected ? colors.onPrimaryContainer : colors.onBackground,
					textTransform: mode === 'AMOLED' ? undefined : 'capitalize',
				}}
			>
				{mode !== 'AMOLED' ? `${mode} Mode` : 'AMOLED'}
			</Text>
		</Pressable>
	);
};
