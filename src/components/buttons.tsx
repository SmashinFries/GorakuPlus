import { useAppTheme } from '@/store/theme/themes';
import { FlashList } from '@shopify/flash-list';
import { MutableRefObject } from 'react';
import { Text as RNText } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
