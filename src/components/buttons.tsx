import { useAppTheme } from '@/store/theme/themes';
import { Pressable, Text as View } from 'react-native';
import { IconButton, MD3DarkTheme, Text } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AnilistIcon } from './svgs';

export const ScrollToTopButton = ({ onPress, top }: { onPress: () => void; top?: number }) => {
	const { colors } = useAppTheme();

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{
				position: 'absolute',
				bottom: top ?? 0,
				alignSelf: 'center',
			}}
		>
			<IconButton
				icon={'chevron-up'}
				onPress={onPress}
				style={{
					backgroundColor: colors.surfaceVariant,
				}}
			/>
		</Animated.View>
	);
};

export const AnilistButton = ({ onPress }: { onPress: () => void }) => {
	const { roundness } = useAppTheme();
	return (
		<Pressable
			style={{
				borderRadius: roundness * 5,
				flexDirection: 'row',
				backgroundColor: '#2b2d42',
				padding: 8,
				alignItems: 'center',
				justifyContent: 'center',
				marginVertical: 40,
			}}
			onPress={onPress}
		>
			<View
				style={{
					position: 'absolute',
					// alignSelf: 'cen',
					justifyContent: 'flex-start',
					width: '100%',
				}}
			>
				<AnilistIcon height={36} width={36} isDark style={{ paddingHorizontal: 40 }} />
			</View>
			<View
				style={{
					// flex: 1,
					alignItems: 'center',
				}}
			>
				<Text variant="titleMedium" style={{ color: MD3DarkTheme.colors.onSurface }}>
					AniList
				</Text>
			</View>
		</Pressable>
	);
};
