import { Image } from 'expo-image';
import { useEffect } from 'react';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

const SIZES = {
	small: 24 * 1.5,
	large: 38 * 2,
};

type GorakuActivityIndicatorProps = {
	size?: 'small' | 'large';
};
export const GorakuActivityIndicator = ({ size }: GorakuActivityIndicatorProps) => {
	const spinValue = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${spinValue.value}deg` }],
		};
	});

	useEffect(() => {
		spinValue.value = withRepeat(
			withTiming(360, { duration: 1000, easing: Easing.linear }),
			-1,
		);
	}, []);

	return (
		<Animated.View style={[animatedStyle]}>
			<Image
				source={require('../../assets/iconsv3/loadIcon.png')}
				style={[{ width: SIZES[size ?? 'large'], height: SIZES[size ?? 'large'] }]}
				contentFit="contain"
			/>
		</Animated.View>
	);
};
