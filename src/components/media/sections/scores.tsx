import { View } from 'react-native';
import React from 'react';
import { getScoreColor } from '@/utils';
import { useAppTheme } from '@/store/theme/themes';
import { Divider, Text } from 'react-native-paper';

type ScoreViewProps = {
	meanScore: number | null;
	averageScore: number | null;
	malScore: number | null;
	userScore: number | null;
	height?: number;
};
// export const ScoreCircles = ({
// 	avgScore,
// 	malScore,
// 	meanScore,
// 	userScore,
// }: ScoreViewProps & { scoreColors: { red: number; yellow: number } }) => {
// 	const isMalEnabled = useMatchStore((state) => state.isMalEnabled);
// 	return (
// 		<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}>
// 			<ScoreContainer
// 				title={'Mean'}
// 				score={meanScore}
// 				opacity={0.35}
// 				color={getScoreColor(meanScore)}
// 				delay={870}
// 			/>
// 			<ScoreContainer
// 				title={'Average'}
// 				score={avgScore}
// 				opacity={0.35}
// 				color={getScoreColor(avgScore)}
// 				delay={835}
// 			/>
// 			{isMalEnabled && (
// 				<ScoreContainer
// 					title={'MAL'}
// 					score={malScore}
// 					opacity={0.35}
// 					color={getScoreColor(malScore, true)}
// 					delay={800}
// 					isMal
// 				/>
// 			)}
// 			{/* {userScore ? (
//                 <ScoreContainer
//                     title={'Yours'}
//                     score={userScore}
//                     opacity={0.35}
//                     color={getScoreColor(userScore, scoreColors, true)}
//                     // color={'red'}
//                     delay={780}
//                     isMal
//                 />
//             ) : null} */}
// 		</View>
// 	);
// };

export const ScoreView = ({
	type,
	score,
	height = 50,
}: {
	type: 'average' | 'mean' | 'review' | 'mal';
	score: number;
	height?: number;
}) => {
	const { colors } = useAppTheme();
	return (
		<View style={{ flexDirection: 'row' }}>
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
								backgroundColor: getScoreColor(score, type === 'mal'),
							}}
						/>
					)}
				</View>
			</View>
			<View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{score ?? '-'}
					{type === 'review' ? '/100' : ''}
				</Text>
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

export const MediaScoresView = ({
	averageScore,
	malScore,
	meanScore,
	userScore,
	height,
}: ScoreViewProps) => {
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
			<ScoreView type="average" score={averageScore} height={height} />
			<ScoreView type="mean" score={meanScore} height={height} />
			<ScoreView type="mal" score={malScore} height={height} />
		</View>
	);
};
