import { ImageStyle } from 'expo-image';
import { useState } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { clamp, runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const useZoom = () => {
	const [enablePan, setEnablePan] = useState(false);
	const zoomValue = useSharedValue(1);
	const savedZoomValue = useSharedValue(1);

	const positionX = useSharedValue(0);
	const savedPositionX = useSharedValue(0);

	const positionY = useSharedValue(0);
	const savedPositionY = useSharedValue(0);

	const resetZoom = () => {
		zoomValue.value = 1;
		savedZoomValue.value = 1;
	};

	const panGesture = Gesture.Pan()
		.enabled(enablePan)
		.onUpdate((e) => {
			if (zoomValue.value > 1) {
				positionX.value = savedPositionX.value + e.translationX;
				positionY.value = savedPositionY.value + e.translationY;
			}
		})
		.onEnd(() => {
			savedPositionX.value = positionX.value;
			savedPositionY.value = positionY.value;
			// if (position.value > width / 2) {
			// 	position.value = withTiming(width, { duration: 100 });
			// 	onLeft.value = false;
			// } else {
			// 	position.value = withTiming(0, { duration: 100 });
			// 	onLeft.value = true;
			// }
		});

	const zoomGesture = Gesture.Pinch()
		.onUpdate((e) => {
			zoomValue.value = clamp(savedZoomValue.value * e.scale, 1, 3);
		})
		.onEnd(() => {
			savedZoomValue.value = clamp(zoomValue.value, 1, 3);
			if (savedZoomValue.value > 1) {
				runOnJS(setEnablePan)(true);
			} else {
				runOnJS(setEnablePan)(false);
				savedPositionX.value = 0;
				positionX.value = 0;
				savedPositionY.value = 0;
				positionY.value = 0;
			}
		});

	const composedGesture = Gesture.Simultaneous(panGesture, zoomGesture);

	const animatedStyle = useAnimatedStyle<ImageStyle>(() => ({
		// @ts-ignore - not sure what the issue is - still works though
		transform: [
			{ scale: zoomValue.value },
			{ translateX: positionX.value },
			{ translateY: positionY.value },
		],
	}));

	return { zoomGesture: composedGesture, animatedStyle, resetZoom };
};

export default useZoom;
