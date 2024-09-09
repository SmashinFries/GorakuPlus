import { useSettingsStore } from '@/store/settings/settingsStore';
import { ImageStyle } from 'expo-image';
import { useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
	Easing,
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
};

const animConfig: Use3dPanConfig = {
	xLimit: [-45, 45],
	yLimit: [-80, 80],
};

const use3dPan = (config = animConfig) => {
	const { interaction3D, autoRotation } = useSettingsStore();
	const xRotation = useSharedValue(0);
	const yRotation = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
			yRotation.value = clamp(
				e.translationX * 1,
				autoRotation ? -360 : config.yLimit[0],
				autoRotation ? 360 : config.yLimit[1],
			);
			xRotation.value = clamp(e.translationY * -1, config.xLimit[0], config.xLimit[1]);
		})
		.onEnd((e) => {
			yRotation.value = withTiming(0, { duration: 1000 });
			xRotation.value = withTiming(0, { duration: 1000 });
		});

	const animatedStyle = useAnimatedStyle<ImageStyle>(() => ({
		// @ts-ignore this works tho... \0-0/
		transform: [
			{ perspective: 500 },
			{ rotateX: `${xRotation.value}deg` },
			{ rotateY: `${yRotation.value}deg` },
		],
	}));

	useEffect(() => {
		if (autoRotation) {
			yRotation.value = withDelay(
				600,
				withRepeat(withTiming(360, { duration: 15000, easing: Easing.linear }), -1),
			);
		}
	}, [autoRotation]);

	return { panGesture, animatedStyle: interaction3D ? animatedStyle : {} };
};

export default use3dPan;
