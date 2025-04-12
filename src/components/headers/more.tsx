import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useAudioPlayer } from 'expo-audio';
import { Image, ImageProps } from 'expo-image';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	cancelAnimation,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ParticleBackground from '../particles';
import { Appbar } from 'react-native-paper';

const AnimatedImage = Animated.createAnimatedComponent<ImageProps>(Image);

const gorakuVoice = require('../../../assets/audio/goraku-voice.mp3');

const MoveableBanner = () => {
	const { width } = useWindowDimensions();
	const player = useAudioPlayer(gorakuVoice);
	const pressed = useSharedValue<boolean>(false);
	const offsetX = useSharedValue<number>(0);
	const offsetY = useSharedValue<number>(0);
	const pulseScale = useSharedValue<number>(1);

	const playVoice = async () => player.play();

	// const startIdleAnimation = () => {
	// 	pulseScale.value = withRepeat(
	// 		withTiming(0.8, {
	// 			duration: 1500,
	// 		}),
	// 		-1,
	// 		true,
	// 	);
	// };

	const pan = Gesture.Pan()
		.onStart(() => {
			cancelAnimation(pulseScale);
			pulseScale.value = 1;
		})
		.onBegin(() => {
			pressed.value = true;
		})
		.onChange((event) => {
			offsetX.value = event.translationX;
			offsetY.value = event.translationY;
		})
		.onFinalize(() => {
			offsetX.value = withSpring(0);
			offsetY.value = withSpring(0);
			pressed.value = false;
			// runOnJS(startIdleAnimation)();
		});

	const longPress = Gesture.LongPress().onStart((_e) => {
		runOnJS(playVoice)();
	});

	const gestures = Gesture.Race(pan, longPress);

	const animatedGestureStyle = useAnimatedStyle<any>(() => ({
		transform: [
			{ translateX: offsetX.value },
			{ translateY: offsetY.value },
			{ scale: withTiming(pressed.value ? 0.8 : 1) },
		],
	}));

	const animatedIdleStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pulseScale.value }],
	}));

	// useEffect(() => {
	// 	startIdleAnimation();
	// });

	return (
		<GestureDetector gesture={gestures}>
			<AnimatedImage
				source={require('../../../assets/iconsv3/banner.png')}
				style={[
					animatedGestureStyle,
					animatedIdleStyle,
					{
						width: width - 100,
						height: 150,
						overflow: 'visible',
						alignSelf: 'center',
						position: 'absolute',
						// top: -25,
						bottom: 0,
					},
				]}
				// contentFit="contain"
				contentFit="contain"
			/>
		</GestureDetector>
	);
};

export const MoreHeader = (_props: NativeStackHeaderProps) => {
	const { top } = useSafeAreaInsets();

	return (
		<Appbar.Header style={{ height: 150 + top, justifyContent: 'center' }}>
			<ParticleBackground mascotOnly />
			<MoveableBanner />
		</Appbar.Header>
	);
};
