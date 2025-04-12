import { StyleSheet, View } from 'react-native';
import { arrayRange } from '@/utils';
import { Icon } from 'react-native-paper';
import Animated, {
	cancelAnimation,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type SkeletonProps = {
	colors: MD3Colors;
	active: boolean;
};

export const ThemeSkeleton = ({ colors, active }: SkeletonProps) => {
	return (
		<View
			style={[
				styles.container,
				{
					borderColor: colors.primary,
					backgroundColor: colors.background,
					// elevation: 20,
					shadowColor: active ? colors.primary : undefined,
					shadowRadius: 5,
					shadowOpacity: 20,
					overflow: 'hidden',
				},
			]}
		>
			<View
				style={[
					styles.btmBar,
					{
						backgroundColor: colors.elevation.level5,
						borderColor: colors.background,
					},
				]}
			>
				{arrayRange(1, 4, 1).map((item, idx) => (
					<View
						key={idx}
						style={[styles.btmBarItem, { backgroundColor: colors.secondaryContainer }]}
					/>
				))}
				{/* <View style={[styles.btmBarItem, { backgroundColor: colors.secondaryContainer }]} /> */}
			</View>
			<View style={[styles.mainItem, { backgroundColor: colors.secondary }]}></View>
		</View>
	);
};

export const ThemeCustomSkeleton = ({ colors, active }: SkeletonProps) => {
	const time = useSharedValue(0);

	const animatedColorStyle = useAnimatedStyle(() => ({
		borderColor: interpolateColor(
			time.value,
			[0, 1],
			['rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,0,255,1)'],
		),
	}));

	useEffect(() => {
		if (!active) {
			time.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
		} else {
			cancelAnimation(time);
		}
	}, [active]);

	return (
		<Animated.View
			style={[
				{
					borderWidth: 1,
					borderRadius: 12,
					alignItems: 'center',
					paddingHorizontal: 15,
					paddingVertical: 10,
					borderColor: active ? colors.primary : 'transparent',
				},
			]}
		>
			<Animated.View
				style={[
					styles.container,
					active ? { borderColor: colors.primary } : animatedColorStyle,
					{
						backgroundColor: colors.background,
						// elevation: 20,
						// shadowColor: active ? colors.primary : undefined,
						shadowRadius: 5,
						shadowOpacity: 20,
						overflow: 'hidden',
						justifyContent: 'center',
						alignItems: 'center',
					},
				]}
			>
				<Icon source={'plus'} size={24} />
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 100,
		width: 60,
		borderRadius: 10,
		borderWidth: 2,
		alignItems: 'center',
	},
	btmBar: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '100%',
		borderWidth: 2,
		borderRadius: 10,
		height: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btmBarItem: {
		height: 8,
		width: 8,
		borderRadius: 8 / 2,
		marginHorizontal: 2,
	},
	mainItem: {
		height: 40,
		width: 30,
		position: 'absolute',
		top: 0,
		left: 0,
		marginLeft: 5,
		marginTop: 5,
		borderRadius: 6,
	},
});
