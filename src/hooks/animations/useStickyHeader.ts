import {
	clamp,
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

type ScrollCtx = {
	prevY: number;
};

export const useStickyHeader = (headerHeight: number) => {
	const scrollClamp = useSharedValue(0);
	const scrollOffset = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler(
		{
			onBeginDrag: (e, ctx: ScrollCtx) => {
				'worklet';
				ctx.prevY = e.contentOffset.y;
			},
			onScroll: (e, ctx: ScrollCtx) => {
				'worklet';
				// scrollPos.value = e.contentOffset.y;
				const diff = e.contentOffset.y - ctx.prevY;
				scrollClamp.value = clamp(scrollClamp.value + diff, 0, headerHeight);
				ctx.prevY = e.contentOffset.y;
				scrollOffset.value = e.contentOffset.y;
			},
			onMomentumEnd: () => {
				'worklet';
			},
		},
		[headerHeight],
	);

	const stickyHeaderStyle = useAnimatedStyle(() => {
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

	return { scrollHandler, stickyHeaderStyle };
};
