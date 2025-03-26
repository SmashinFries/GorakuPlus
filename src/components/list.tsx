import { FlashList, FlashListProps } from '@shopify/flash-list';
import { RefObject, useRef } from 'react';
import Animated, { AnimatedScrollViewProps } from 'react-native-reanimated';
import { ScrollToTopButton } from './buttons';
import { useScrollHandler } from '@/hooks/animations/useScrollHandler';

export const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type FlashListAnimProps = FlashListProps<any> & {
	isSticky?: boolean;
	headerHeight?: number;
	showScrollToTop?: boolean;
	scrollToTopIconTop?: number; // style top
	scrollToTopTravelDistance?: number;
	listRef?: RefObject<FlashList<any>>;
};
export const FlashListAnim = (props: FlashListAnimProps) => {
	const listRef = useRef<FlashList<any>>(null);
	const { headerStyle, scrollHandler, shouldShowScrollToTop } = useScrollHandler(
		props.headerHeight,
		props.scrollToTopTravelDistance,
	);

	return (
		<>
			<AnimatedFlashList
				ref={props.listRef ?? listRef}
				{...props}
				onScroll={scrollHandler}
				style={[props.style, props.isSticky && headerStyle]}
			/>
			{shouldShowScrollToTop && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
					top={props.scrollToTopIconTop ?? 110}
				/>
			)}
		</>
	);
};

type LongScrollViewProps = AnimatedScrollViewProps & {
	scrollToTopIconTop?: number; // style top
	scrollToTopTravelDistance?: number;
};
export const LongScrollView = (props: LongScrollViewProps) => {
	const listRef = useRef<Animated.ScrollView>(null);
	const { scrollHandler, shouldShowScrollToTop } = useScrollHandler(
		undefined,
		props.scrollToTopTravelDistance,
	);

	return (
		<>
			<Animated.ScrollView
				ref={listRef}
				{...props}
				onScroll={scrollHandler}
				style={[props.style]}
			/>
			{shouldShowScrollToTop && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollTo({ y: 0, animated: true })}
					top={props.scrollToTopIconTop ?? 110}
				/>
			)}
		</>
	);
};
