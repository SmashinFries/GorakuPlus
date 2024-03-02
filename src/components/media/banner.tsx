import useImageRotation from '@/hooks/useImageRotation';
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
	url: string;
	additionalUrls?: string[];
	allowMotion?: boolean;
};
export const MediaBanner = ({ url, style, allowMotion, additionalUrls }: Props) => {
	const { colors } = useTheme();
	const img_src = useImageRotation(url, additionalUrls);

	const { sensor } = useAnimatedSensor(SensorType.ROTATION, { interval: 20 });

	const animatedStyle = useAnimatedStyle(() => {
		const { pitch, roll } = sensor?.value ?? { pitch: 0, roll: 0 };
		return {
			transform: [
				{ translateX: allowMotion ? withSpring(-roll * 25, { damping: 200 }) : 0 },
				{ translateY: allowMotion ? withSpring(-pitch * 25, { damping: 200 }) : 0 },
				{ matrix: [] },
			],
		};
	});

	return (
		<Animated.View style={[style, styles.container]}>
			<Animated.View style={[animatedStyle, { paddingBottom: 10 }]}>
				<Image
					source={{ uri: img_src }}
					style={[styles.img]}
					cachePolicy="memory"
					transition={2000}
					contentFit="cover"
				/>

				<LinearGradient
					style={[styles.container]}
					locations={[0, 0.85]}
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
		height: 200,
	},
	img: {
		width: '100%',
		height: '100%',
	},
});
