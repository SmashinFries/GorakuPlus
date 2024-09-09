import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import Animated, {
	AnimatedScrollViewProps,
	clamp,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedReaction,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { ScrollToTopButton } from './buttons';
import { View } from 'react-native';

type ScrollCtx = {
	prevY: number;
};

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type FlashListAnimProps = FlashListProps<any> & {
	isSticky?: boolean;
	headerHeight?: number;
	showScrollToTop?: boolean;
	scrollToTopIconTop?: number; // style top
	scrollToTopTravelDistance?: number;
};
export const FlashListAnim = (props: FlashListAnimProps) => {
	const listRef = useRef<FlashList<any>>(null);
	const scrollClamp = useSharedValue(0);
	const scrollOffset = useSharedValue(0);

	const [shouldShowScrollToTop, setShouldShowScrollToTop] = useState(false);

	const scrollHandler = useAnimatedScrollHandler({
		onBeginDrag: (e, ctx: ScrollCtx) => {
			'worklet';
			ctx.prevY = e.contentOffset.y;
		},
		onScroll: (e, ctx: ScrollCtx) => {
			'worklet';
			// scrollPos.value = e.contentOffset.y;
			const diff = e.contentOffset.y - ctx.prevY;
			props.headerHeight &&
				(scrollClamp.value = clamp(scrollClamp.value + diff, 0, props.headerHeight));
			ctx.prevY = e.contentOffset.y;
			scrollOffset.value = e.contentOffset.y;
		},
		onMomentumEnd: () => {
			'worklet';
		},
	});

	const stickyHeaderStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollClamp.value,
						[0, props.headerHeight],
						[0, -props.headerHeight],
						Extrapolation.CLAMP,
					),
				},
			],
		};
	}, [props.headerHeight]);

	useAnimatedReaction(
		() => {
			return scrollOffset.value > props.scrollToTopTravelDistance ?? 500;
		},
		(shouldShow) => {
			if (shouldShow) runOnJS(setShouldShowScrollToTop)(true);
			if (!shouldShow) runOnJS(setShouldShowScrollToTop)(false);
		},
	);

	useEffect(() => {
		console.log('shouldShow:', shouldShowScrollToTop);
	}, [shouldShowScrollToTop]);

	return (
		<>
			<AnimatedFlashList
				ref={listRef}
				{...props}
				onScroll={scrollHandler}
				style={[props.style, props.isSticky && stickyHeaderStyle]}
			/>
			{shouldShowScrollToTop && (
				<ScrollToTopButton listRef={listRef} top={props.scrollToTopIconTop ?? 110} />
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
	const scrollClamp = useSharedValue(0);
	const scrollOffset = useSharedValue(0);
	const isScrollingUp = useSharedValue(false);

	const [shouldShowScrollToTop, setShouldShowScrollToTop] = useState(false);

	const scrollHandler = useAnimatedScrollHandler({
		onBeginDrag: (e, ctx: ScrollCtx) => {
			'worklet';
			ctx.prevY = e.contentOffset.y;
		},
		onScroll: (e, ctx: ScrollCtx) => {
			'worklet';
			ctx.prevY = e.contentOffset.y;
			scrollOffset.value = e.contentOffset.y;
			// isScrollingUp.value = e.
			// console.log(e.contentOffset.y, e.contentSize.height);
		},
		onMomentumBegin: (e) => {
			if (e.velocity.y > 0) {
				isScrollingUp.value = true;
			} else if (e.velocity.y < 0) {
				isScrollingUp.value = false;
			}
		},
		onMomentumEnd: (e) => {
			'worklet';
		},
	});

	useAnimatedReaction(
		() => {
			return (
				scrollOffset.value > (props.scrollToTopTravelDistance ?? 500) && isScrollingUp.value
			);
		},
		(shouldShow) => {
			if (shouldShow) runOnJS(setShouldShowScrollToTop)(true);
			if (!shouldShow) runOnJS(setShouldShowScrollToTop)(false);
		},
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
				<ScrollToTopButton listRef={listRef} top={props.scrollToTopIconTop ?? 110} />
			)}
		</>
	);
};
