import { Accordion } from '@/components/animations';
import { ScrollView, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { ScoreItem, StatBar, StatusItem } from '../statistics';
import Animated from 'react-native-reanimated';
import {
	AniMediaQuery_Media_Media_rankings_MediaRank,
	AniMediaQuery_Media_Media_stats_MediaStats,
	MediaRankType,
} from '@/api/anilist/__genereated__/gql';
import { router } from 'expo-router';

type StatSectionProps = {
	id: number;
	statData: AniMediaQuery_Media_Media_stats_MediaStats | null | undefined;
	rankData: (AniMediaQuery_Media_Media_rankings_MediaRank | null)[] | null | undefined;
};
export const StatSection = ({ id, rankData, statData }: StatSectionProps) => {
	if (
		(rankData?.length ?? 0) < 1 &&
		(statData?.scoreDistribution?.length ?? 0) < 1 &&
		(statData?.statusDistribution?.length ?? 0) < 1
	) {
		return null;
	}

	const sortedStatus = statData?.statusDistribution
		? [...statData.statusDistribution].sort((a, b) => (b?.amount ?? 0) - (a?.amount ?? 0))
		: null;
	const sortedScores = statData?.scoreDistribution
		? [...statData.scoreDistribution].sort((a, b) => (a?.score ?? 0) - (b?.score ?? 0))
		: null;
	const highestAmountObject =
		(sortedScores?.length ?? 0) > 0
			? sortedScores?.reduce((prev, current) => {
					return (prev?.amount ?? 0) > (current?.amount ?? 0) ? prev : current;
				})
			: null;
	let highestScore = highestAmountObject?.score ?? null;

	// Check if all amounts are the same
	if (sortedScores?.every((item) => item?.amount === highestAmountObject?.amount)) {
		highestScore = 0;
	}

	return (
		<Animated.View>
			<Accordion title="Statistics">
				<Button
					mode="elevated"
					onPress={() => router.navigate(`/statistics/media/${id}`)}
					style={{ margin: 10 }}
				>
					View all
				</Button>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
				>
					{rankData?.map((ranking, idx) => (
						<Chip
							key={idx}
							icon={ranking?.type === MediaRankType.Rated ? 'star' : 'heart'}
							style={{ margin: 5 }}
							textStyle={{ textTransform: 'capitalize' }}
						>
							#{ranking?.rank} {ranking?.context}
						</Chip>
					))}
				</ScrollView>
				{(statData?.statusDistribution?.length ?? 0) > 0 ? (
					<View style={{ paddingHorizontal: 15, marginTop: 10, marginBottom: 5 }}>
						<Text variant="titleLarge" style={{ marginBottom: 5 }}>
							Status Distribution
						</Text>
						<StatBar
							data={
								sortedStatus?.filter(
									(item): item is NonNullable<typeof item> => item !== null,
								) ?? []
							}
						/>
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'flex-start',
							}}
						>
							{sortedStatus?.map((statusDis, idx) => (
								<StatusItem key={idx} status={statusDis ?? undefined} />
							))}
						</View>
					</View>
				) : null}
				{(statData?.scoreDistribution?.length ?? 0) > 0 && (
					<View
						style={{
							marginTop: 10,
							marginBottom: 5,
							alignItems: 'flex-start',
						}}
					>
						<Text
							variant="titleLarge"
							style={{ marginBottom: 5, paddingHorizontal: 15 }}
						>
							Score Distribution
						</Text>
						<StatBar
							data={
								statData?.scoreDistribution?.filter(
									(item): item is NonNullable<typeof item> => item !== null,
								) ?? []
							}
						/>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ paddingHorizontal: 15 }}
						>
							{sortedScores?.map((scoreDis, idx) => (
								<ScoreItem
									key={idx}
									score={scoreDis ?? undefined}
									highestScore={highestScore ?? undefined}
								/>
							))}
						</ScrollView>
					</View>
				)}
			</Accordion>
		</Animated.View>
	);
};
