import {
	AniMediaQuery_Media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution,
	AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution,
} from '@/api/anilist/__genereated__/gql';
import { ScoreColors, StatusColors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { View, useWindowDimensions } from 'react-native';
import { Chip, MD3DarkTheme, MD3LightTheme, Text } from 'react-native-paper';

type StatusItemProps = {
	status?: AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution;
};
export const StatusItem = ({ status }: StatusItemProps) => {
	return (
		<View style={{ marginRight: 8, marginTop: 8, alignItems: 'center' }}>
			<Chip
				mode="flat"
				elevated
				textStyle={{ color: MD3DarkTheme.colors.onBackground, fontWeight: '900' }}
				style={{
					backgroundColor: StatusColors[status?.status as keyof typeof StatusColors],
					padding: 2,
				}}
			>
				{status?.status}
			</Chip>
			<Text>
				<Text style={{ color: StatusColors[status?.status as keyof typeof StatusColors] }}>
					{status?.amount?.toLocaleString()}
				</Text>{' '}
				Users
			</Text>
		</View>
	);
};

type ScoreItemProps = {
	score:
		| AniMediaQuery_Media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution
		| undefined;
	highestScore: number | undefined;
};
export const ScoreItem = ({ score, highestScore }: ScoreItemProps) => {
	return (
		<View style={{ marginRight: 20, marginTop: 10, alignItems: 'center' }}>
			<Chip
				mode="flat"
				elevated
				textStyle={{ color: MD3LightTheme.colors.onBackground, fontWeight: '900' }}
				style={{
					backgroundColor: ScoreColors[score?.score as keyof typeof ScoreColors],
					padding: 2,
				}}
			>
				{score?.score === highestScore && '🔥 '}
				{score?.score} %
			</Chip>
			<Text>
				<Text style={{ color: ScoreColors[score?.score as keyof typeof ScoreColors] }}>
					{score?.amount?.toLocaleString()}
				</Text>{' '}
				Users
			</Text>
		</View>
	);
};

type StatusBarProps = {
	data:
		| AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution[]
		| AniMediaQuery_Media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution[]
		| undefined;
};
export const StatBar = ({ data }: StatusBarProps) => {
	const { width } = useWindowDimensions();
	const bar_width = width - 20; // 20 = padding
	const total_users = data?.reduce((acc, curr) => acc + (curr?.amount ?? 0), 0);
	const colors: string[] = data?.map((stat) => {
		if (
			(
				stat as AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution
			)?.status
		)
			return StatusColors[
				(
					stat as AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution
				)?.status as keyof typeof StatusColors
			];
		else
			return ScoreColors[
				(
					stat as AniMediaQuery_Media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution
				)?.score as keyof typeof ScoreColors
			];
	});
	// const locations = data?.map((stat) => {
	//     return (stat.amount / total_users) * 100;
	// });
	const locations: [number, number, ...number[]] | null | undefined = data?.reduce(
		(acc, stat, index) => {
			const percentage = (stat.amount ?? 1) / (total_users ?? 1);
			const previousValue = index > 0 ? acc[index - 1] : 0;
			acc.push(percentage + previousValue);
			return acc;
		},
		[],
	);
	const sortedLocations = locations?.sort((a, b) => a - b);

	return (
		<View style={{ width: bar_width, alignSelf: 'center', borderRadius: 12 }}>
			{/* {data?.map((stat, idx) => (
                <View
                    key={idx}
                    style={{
                        backgroundColor: stat?.status
                            ? StatusColors[stat?.status]
                            : ScoreColors[stat?.score],
                        height: 10,
                        width: `${(stat.amount / total_users) * 100}%`,
                        borderTopLeftRadius: idx === 0 ? 12 : 0,
                        borderBottomLeftRadius: idx === 0 ? 12 : 0,
                        borderTopRightRadius: idx === data.length - 1 ? 12 : 0,
                        borderBottomRightRadius: idx === data.length - 1 ? 12 : 0,
                    }}
                />
            ))} */}
			{colors.length > 1 ? (
				<LinearGradient
					colors={colors as [string, string, ...string[]]}
					locations={sortedLocations}
					start={[0, 1]}
					end={[1, 0]}
					style={{ height: 10, borderRadius: 12, width: '100%' }}
				/>
			) : (
				<View
					style={{
						height: 10,
						borderRadius: 12,
						width: '100%',
						backgroundColor: colors[0],
					}}
				/>
			)}
		</View>
	);
};
