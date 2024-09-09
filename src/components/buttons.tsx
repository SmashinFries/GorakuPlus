import { useAppTheme } from '@/store/theme/themes';
import { FlashList } from '@shopify/flash-list';
import { MutableRefObject } from 'react';
import { Pressable, Text as RNText, View } from 'react-native';
import { Button, IconButton, MD3DarkTheme, Text } from 'react-native-paper';
import Animated, { AnimatedScrollViewProps, FadeIn, FadeOut } from 'react-native-reanimated';
import { AnilistIcon } from './svgs';
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/component/ScrollView';

type FavoriteButtonProps = {
	isFavorite?: boolean;
	onToggle?: () => void;
	favorites?: number;
};
export const FavoriteButton = ({ isFavorite = false, favorites = 200 }: FavoriteButtonProps) => {
	const { colors } = useAppTheme();
	return (
		<Button
			icon={'heart-outline'}
			textColor="red"
			style={{
				borderColor: 'red',
				borderWidth: 1,
				flex: 1,
				maxWidth: '80%',
				marginTop: 20,
			}}
			mode="elevated"
		>
			<RNText style={{ color: colors.onBackground, fontWeight: 'bold', fontSize: 15 }}>
				{' '}
				{favorites}
			</RNText>
		</Button>
	);
};

export const ScrollToTopButton = ({
	listRef,
	top,
}: {
	listRef: MutableRefObject<FlashList<any>> | MutableRefObject<AnimatedScrollView>;
	top?: number;
}) => {
	const { colors } = useAppTheme();
	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{ position: 'absolute', top: top ?? 0, alignSelf: 'center' }}
		>
			<IconButton
				icon={'chevron-up'}
				onPress={() => {
					(listRef as MutableRefObject<FlashList<any>>).current?.scrollToOffset
						? (listRef as MutableRefObject<FlashList<any>>).current?.scrollToOffset({
								offset: 0,
								animated: true,
							})
						: (listRef as MutableRefObject<AnimatedScrollView>).current?.scrollTo({
								y: 0,
								animated: true,
							});
				}}
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
