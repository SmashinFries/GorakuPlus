import { Pressable, StyleSheet, View } from 'react-native';
import { arrayRange } from '@/utils';
import { StackAnimationTypes } from 'react-native-screens';
import { MD3Theme } from 'react-native-paper';

type SkeletonProps = {
	theme: MD3Theme;
	active: boolean;
};

export const ThemeSkeleton = ({ theme, active }: SkeletonProps) => {
	const { colors } = theme;
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

type NavSkeletonProps = SkeletonProps & {
	onPress: () => void;
	animation: StackAnimationTypes;
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
