import { useSettingsStore } from '@/store/settings/settingsStore';
import { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
	Easing,
	cancelAnimation,
	clamp,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

type Use3dPanConfig = {
	xLimit: [number, number];
	yLimit: [number, number];
	disableAutoRotation?: boolean; // autorotation freezes the app on char / staff screens
};

const animConfig: Use3dPanConfig = {
	xLimit: [-45, 45],
	yLimit: [-80, 80],
	disableAutoRotation: false
};

const use3dPan = (config = animConfig) => {
	const { interaction3D, autoRotation } = useSettingsStore();
	const xRotation = useSharedValue(0);
	const yRotation = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
			yRotation.value = clamp(
				e.translationX * 1,
				!config.disableAutoRotation && autoRotation ? -360 : config.yLimit[0],
				!config.disableAutoRotation && autoRotation ? 360 : config.yLimit[1],
			);
			xRotation.value = clamp(e.translationY * -1, config.xLimit[0], config.xLimit[1]);
		})
		.onEnd(() => {
			yRotation.value = withTiming(0, { duration: 1000 });
			xRotation.value = withTiming(0, { duration: 1000 });
		});

	const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
		// @ts-ignore this works tho... \0-0/
		transform: [
			{ perspective: 500 },
			{ rotateX: `${xRotation.value}deg` },
			{ rotateY: `${yRotation.value}deg` },
		],
	}));

	useEffect(() => {
		let isActive = true;
		if (autoRotation && !config.disableAutoRotation && isActive) {
			yRotation.value = withDelay(
				600,
				withRepeat(withTiming(360, { duration: 15000, easing: Easing.linear }), -1),
			);
		}
		return () => {
			isActive = false;
			cancelAnimation(yRotation);
			cancelAnimation(xRotation);
			// Reset both values
			yRotation.value = 0;
			xRotation.value = 0;
		};
	}, [autoRotation, config.disableAutoRotation]);

	return { panGesture, animatedStyle: interaction3D ? animatedStyle : {} };
};

export default use3dPan;
