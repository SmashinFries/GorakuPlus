import { Accordion } from '@/components/animations';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { ScoreItem, StatBar, StatusItem } from '../statistics';
import Animated from 'react-native-reanimated';
import { AniMediaQuery, MediaRankType } from '@/api/anilist/__genereated__/gql';
import { router } from 'expo-router';

type StatSectionProps = {
	id: number;
	statData: AniMediaQuery['Media']['stats'];
	rankData: AniMediaQuery['Media']['rankings'];
};
export const StatSection = ({ id, rankData, statData }: StatSectionProps) => {
	if (
		rankData?.length < 1 &&
		statData?.scoreDistribution?.length < 1 &&
		statData?.statusDistribution?.length < 1
	) {
		return null;
	}

	const sortedStatus = statData?.statusDistribution
		? [...statData.statusDistribution].sort((a, b) => b.amount - a.amount)
		: null;
	const sortedScores = statData?.scoreDistribution
		? [...statData.scoreDistribution].sort((a, b) => a.score - b.score)
		: null;
	const highestAmountObject =
		sortedScores?.length > 0
			? sortedScores?.reduce((prev, current) => {
					return prev.amount > current.amount ? prev : current;
				})
			: null;
	let highestScore = highestAmountObject?.score ?? null;

	// Check if all amounts are the same
	if (sortedScores?.every((item) => item?.amount === highestAmountObject?.amount)) {
		highestScore = 0;
	}

	return (
		<Animated.View style={{ marginVertical: 15 }}>
			<Accordion title="Statistics">
				<Button
					mode="elevated"
					onPress={() =>
						router.navigate({
							pathname: '/statistics/media/[aniIdStat]',
							params: { id },
						})
					}
					style={{ margin: 10 }}
				>
					View all
				</Button>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingLeft: 10 }}
				>
					{rankData?.map((ranking, idx) => (
						<Chip
							key={idx}
							icon={ranking.type === MediaRankType.Rated ? 'star' : 'heart'}
							style={{ margin: 5 }}
							textStyle={{ textTransform: 'capitalize' }}
						>
							#{ranking.rank} {ranking.context}
						</Chip>
					))}
				</ScrollView>
				{statData?.statusDistribution?.length > 0 ? (
					<View style={{ paddingHorizontal: 15, marginTop: 10, marginBottom: 5 }}>
						<Text variant="titleLarge" style={{ marginBottom: 5 }}>
							Status Distribution
						</Text>
						<StatBar data={sortedStatus} />
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'flex-start',
							}}
						>
							{sortedStatus?.map((statusDis, idx) => (
								<StatusItem key={idx} status={statusDis} />
							))}
						</View>
					</View>
				) : null}
				{statData?.scoreDistribution?.length > 0 && (
					<View
						style={{
							paddingHorizontal: 15,
							marginTop: 10,
							marginBottom: 5,
							alignItems: 'flex-start',
						}}
					>
						<Text variant="titleLarge" style={{ marginBottom: 5 }}>
							Score Distribution
						</Text>
						<StatBar data={statData?.scoreDistribution} />
						<ScrollView horizontal>
							{sortedScores.map((scoreDis, idx) => (
								<ScoreItem key={idx} score={scoreDis} highestScore={highestScore} />
							))}
						</ScrollView>
					</View>
				)}
			</Accordion>
		</Animated.View>
	);
};
