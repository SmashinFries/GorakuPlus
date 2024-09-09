import { useAppTheme } from '@/store/theme/themes';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ScoreContainerProps = {
	title?: string;
	score: number;
	opacity?: number;
	color?: string;
	isMal?: boolean;
	animate?: boolean;
	delay?: number;
	size?: number;
};
export const ScoreContainer = ({
	title,
	color,
	opacity,
	score,
	delay,
	animate = true,
	isMal = false,
	size = 85,
}: ScoreContainerProps) => {
	const height = size;
	const width = size;
	const heightAnim = useSharedValue(0);
	const fillHeight = score ? ((isMal ? score * 10 : score) / 100) * height : 0;

	const { colors } = useAppTheme();

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: heightAnim.value,
		};
	});

	useEffect(() => {
		heightAnim.value = withSpring(fillHeight);
	}, []);

	return (
		<View>
			<View
				style={{
					height: height,
					width: width,
					borderRadius: height / 2,
					opacity: opacity,
					justifyContent: 'flex-end',
					alignItems: 'center',
					overflow: 'hidden',
				}}
			>
				<Animated.View
					// from={{ height: 0 }}
					// animate={{ height: fillHeight }}
					style={[
						{
							position: 'absolute',
							// height: fillHeight,
							width: width,
							backgroundColor: color,
						},
						animatedStyle,
					]}
				/>
			</View>
			<View
				style={{
					position: 'absolute',
					height: height,
					width: width,
					borderRadius: height / 2,
					borderWidth: 1,
					borderColor: score ? color : colors.outline,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>{score ?? '?'}</Text>
				{title ? <Text>{title}</Text> : null}
			</View>
		</View>
	);
};
