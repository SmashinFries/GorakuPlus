import { useAppTheme } from '@/store/theme/themes';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

const PAGE_ITEM_SIZE = 12;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SetupNavButtonProps = {
	icon: string;
	onPress: () => void;
	disabled?: boolean;
};
const SetupNavButton = ({ icon, disabled, onPress }: SetupNavButtonProps) => {
	return <IconButton icon={icon} disabled={disabled} onPress={onPress} />;
};

type PageIndicatorProps = {
	page: number;
	numPages: number;
	onPress: (page: number) => void;
};
const PageIndicator = ({ page, numPages, onPress }: PageIndicatorProps) => {
	const { colors } = useAppTheme();
	const PageItem = (idx: number) => {
		const pageAnimVal = useSharedValue(1);
		const animatedStyle = useAnimatedStyle(() => {
			return {
				transform:
					page === idx
						? [
								{
									scale: pageAnimVal.value,
								},
							]
						: undefined,
			};
		});

		useEffect(() => {
			if (page === idx) {
				pageAnimVal.value = withRepeat(
					withSequence(
						withTiming(1.3, { duration: 750 }),
						withTiming(1, { duration: 750 }),
					),
					-1,
				);
			} else {
				pageAnimVal.value = 1;
			}
		}, [page, idx]);

		return (
			<AnimatedPressable
				key={idx}
				onPress={() => onPress(idx)}
				style={[
					animatedStyle,
					{
						height: PAGE_ITEM_SIZE,
						width: PAGE_ITEM_SIZE,
						borderRadius: 10,
						backgroundColor: page >= idx ? colors.primary : colors.onBackground,
						marginHorizontal: 5,
					},
				]}
			/>
		);
	};

	return Array.from({ length: numPages }, (_, i) => PageItem(i));
};

type SetupNavBarProps = {
	page: number;
	numPages: number;
	onPageChange: (page: number) => void;
};
export const SetupNavBar = ({ page, numPages, onPageChange }: SetupNavBarProps) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<SetupNavButton
				icon="arrow-left"
				onPress={() => onPageChange(page - 1)}
				disabled={page === 0}
			/>
			<PageIndicator
				page={page}
				numPages={numPages}
				onPress={(page: number) => onPageChange(page)}
			/>
			<SetupNavButton
				icon="arrow-right"
				onPress={() => {
					onPageChange(page + 1);
				}}
				disabled={page + 1 === numPages} // page is index (from 0) while numPages is actual number of pages (from 1)
			/>
		</View>
	);
};
