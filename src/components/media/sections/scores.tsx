import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import React from 'react';
import { getScoreColor } from '@/utils';
import { useAppTheme } from '@/store/theme/themes';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';

type ScoreViewProps = {
	meanScore: number | null;
	averageScore: number | null;
	malScore: number | null;
	userScore: number | null;
	height?: number;
};
export const ScoreView = ({
	type,
	score,
	height = 50,
	barColor,
	isLoading = false,
	containerStyle,
}: {
	type: 'average' | 'mean' | 'review' | 'mal';
	score: number | null | undefined;
	height?: number;
	barColor?: string;
	isLoading?: boolean;
	containerStyle?: ViewStyle;
}) => {
	const { colors } = useAppTheme();
	return (
		<View
			style={[
				{
					flexDirection: 'row',
					// width: `${100 / 3}%`,
					justifyContent: 'center',
				},
				containerStyle,
			]}
		>
			<View>
				<View
					style={{
						width: 4,
						height: height,
						backgroundColor: colors.surfaceVariant,
						justifyContent: 'flex-end',
						borderRadius: 12,
						overflow: 'hidden',
					}}
				>
					{score && (
						<View
							style={{
								position: 'absolute',
								height:
									type === 'mal' ? (score / 10) * height : (score / 100) * height, // could just `${score}%` lol
								width: '100%',
								backgroundColor: barColor ?? getScoreColor(score, type === 'mal'),
							}}
						/>
					)}
				</View>
			</View>
			<View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<Text variant="titleMedium" style={{ textAlign: 'center' }}>
						{score ?? '-'}
						{type === 'review' ? '/100' : ''}
					</Text>
				)}
				<Divider />
				<Text
					variant="labelMedium"
					style={{ textAlign: 'center', color: colors.onSurfaceVariant }}
				>
					{type === 'average'
						? 'Avg'
						: type === 'mean'
							? 'Mean'
							: type === 'review'
								? 'Score'
								: 'MAL'}
				</Text>
			</View>
		</View>
	);
};

export const MediaScoresView = ({ averageScore, malScore, meanScore, height }: ScoreViewProps) => {
	return (
		<View style={{ flexDirection: 'row' }}>
			<ScoreView
				type="average"
				score={averageScore}
				height={height}
				containerStyle={MediaScoresStyle.scoreView}
			/>
			<ScoreView
				type="mean"
				score={meanScore}
				height={height}
				containerStyle={MediaScoresStyle.scoreView}
			/>
			<ScoreView
				type="mal"
				score={malScore}
				height={height}
				containerStyle={MediaScoresStyle.scoreView}
			/>
		</View>
	);
};

const MediaScoresStyle = StyleSheet.create({
	scoreView: {
		width: `${100 / 3}%`,
	},
});
