import { useAppTheme } from '@/store/theme/theme';
import { FlashList } from '@shopify/flash-list';
import { MotiPressable } from 'moti/interactions';
import { MutableRefObject, useMemo } from 'react';
import { Text as RNText, ScrollView } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type LoadMoreButtonProps = {
	title: string;
	vertical?: boolean;
	onPress?: () => void;
};
export const LoadMoreButton = ({ title, vertical, onPress }: LoadMoreButtonProps) => {
	return (
		<MotiPressable
			containerStyle={{
				// backgroundColor: 'red',
				marginRight: 10,
				alignSelf: 'center',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			onPress={onPress}
			animate={useMemo(
				() =>
					({ hovered, pressed }) => {
						'worklet';
						return {
							scale: hovered || pressed ? 0.8 : 1,
						};
					},
				[],
			)}
		>
			{!vertical ? (
				<IconButton style={{ alignSelf: 'center' }} icon="arrow-expand-right" size={44} />
			) : (
				<Button>Load More</Button>
			)}
			{!vertical ? <Text style={{ textAlign: 'center' }}>{title}</Text> : null}
		</MotiPressable>
	);
};

type FavoriteButtonProps = {
	isFavorite?: boolean;
	onToggle?: () => void;
	favorites?: number;
};
export const FavoriteButton = ({ isFavorite = false, favorites = 200 }: FavoriteButtonProps) => {
	const { colors } = useTheme();
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
	listRef: MutableRefObject<FlashList<any>>;
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
					listRef.current?.scrollToOffset({ offset: 0, animated: true });
				}}
				style={{
					backgroundColor: colors.surfaceVariant,
				}}
			/>
		</Animated.View>
	);
};
