import { useState } from 'react';
import {
	clamp,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedReaction,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

type ScrollCtx = {
	prevY: number;
};

/**
 * Scroll handler hook for "jump to top" and sticky header functionality
 * @param headerHeight needed for sticky header
 * @param scrollToTopTravelDistance adjustable distance for when to show scroll to top button
 * @returns
 */
export const useScrollHandler = (headerHeight?: number, scrollToTopTravelDistance?: number) => {
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
			// scrollPos.value = e.contentOffset.y;
			const diff = e.contentOffset.y - ctx.prevY;
			headerHeight && (scrollClamp.value = clamp(scrollClamp.value + diff, 0, headerHeight));
			ctx.prevY = e.contentOffset.y;
			scrollOffset.value = e.contentOffset.y;
		},
		onMomentumBegin: (e) => {
			'worklet';
			// How to stop scrollToTop button from showing before distance???
			if ((e.velocity?.y ?? 0) > 0 && e.contentOffset.y > (scrollToTopTravelDistance ?? 500)) {
				isScrollingUp.value = true;
			} else if ((e.velocity?.y ?? 0) <= 0) {
				isScrollingUp.value = false;
			}
		},
	});

	const headerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollClamp.value,
						[0, headerHeight],
						[0, -headerHeight],
						Extrapolation.CLAMP,
					),
				},
			],
		};
	}, [headerHeight]);

	useAnimatedReaction(
		() => {
			return scrollOffset.value > (scrollToTopTravelDistance ?? 500) && isScrollingUp.value;
		},
		(shouldShow) => {
			if (shouldShow) runOnJS(setShouldShowScrollToTop)(true);
			if (!shouldShow) runOnJS(setShouldShowScrollToTop)(false);
		},
	);

	return { scrollHandler, headerStyle, shouldShowScrollToTop };
};
