import useImageRotation from '@/hooks/useImageRotation';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
	SensorType,
	useAnimatedSensor,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';

type Props = {
	style?: any;
	urls: string[];
};
export const MediaBanner = ({ urls, style }: Props) => {
	const { colors } = useAppTheme();
	const isMotionAllowed = useSettingsStore((state) => state.allowSensorMotion);
	const img_src = useImageRotation(urls);

	const { sensor } = useAnimatedSensor(SensorType.ROTATION, { interval: 20 });

	// @ts-ignore - ???
	const animatedStyle = useAnimatedStyle(() => {
		const { pitch, roll } = sensor?.value ?? { pitch: 0, roll: 0 };
		return {
			transform: [
				{ translateX: withSpring(-roll * 25, { damping: 200 }) },
				{ translateY: withSpring(-pitch * 25, { damping: 200 }) },
			],
		};
	});

	return (
		<Animated.View style={[style, styles.container]}>
			<Animated.View style={[isMotionAllowed ? animatedStyle : {}, { paddingBottom: 10 }]}>
				<Image
					source={{ uri: img_src }}
					style={[styles.img]}
					placeholder={{ blurhash: colors.blurhash }}
					cachePolicy="memory"
					transition={2000}
					contentFit="cover"
				/>

				<LinearGradient
					style={[styles.container]}
					locations={[0, 0.8]}
					colors={['rgba(0,0,0,.2)', colors.background]}
				/>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: 300,
	},
	img: {
		width: '100%',
		height: '100%',
	},
});
