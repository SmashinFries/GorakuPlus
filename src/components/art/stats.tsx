import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, Divider, IconButton, Text, useTheme } from 'react-native-paper';

type StatisticsBarProps = {
    favorites: number;
    up_score?: number;
    down_score?: number;
};
export const StatisticsBar = ({ favorites, up_score, down_score }: StatisticsBarProps) => {
	const { colors } = useTheme();
	const totalScore = up_score + -down_score;
	const percentage = `${totalScore} (${(
		(totalScore > 0 ? up_score / totalScore : 1) * 100
	).toFixed(0)}% upvoted)`;

	const StatItem = useCallback(
		({ icon, color, text }: { icon: string; color: string; text: string }) => {
			return (
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<IconButton iconColor={color} size={14} icon={icon} />
					<Text>{text}</Text>
				</View>
			);
		},
		[],
	);

	return (
		<View style={[styles.container]}>
			<Divider />
			<View style={[styles.iconsContainer]}>
				<StatItem icon="heart" color="red" text={favorites?.toString()} />
				<StatItem icon="trophy-variant" color="yellow" text={percentage} />
			</View>
			<Divider />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	iconsContainer: {
		flexDirection: 'row',
		marginBottom: 5,
		justifyContent: 'space-evenly',
	},
});
