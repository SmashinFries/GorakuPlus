import { Accordion, TransYUpViewMem } from '@/components/animations';
import { AniMediaQuery, MediaRankType } from '@/store/services/anilist/generated-anilist';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { ScoreItem, StatBar, StatusItem } from '../statistics';

type StatSectionProps = {
	statData: AniMediaQuery['Media']['stats'];
	rankData: AniMediaQuery['Media']['rankings'];
};
export const StatSection = ({ rankData, statData }: StatSectionProps) => {
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
		<TransYUpViewMem style={{ marginVertical: 15 }} delay={1000}>
			<Accordion title="Statistics">
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
					<View style={{ paddingHorizontal: 15, marginTop: 10, marginBottom: 5 }}>
						<Text variant="titleLarge" style={{ marginBottom: 5 }}>
							Score Distribution
						</Text>
						<StatBar data={statData?.scoreDistribution} />
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'flex-start',
							}}
						>
							{sortedScores.map((scoreDis, idx) => (
								<ScoreItem key={idx} score={scoreDis} highestScore={highestScore} />
							))}
						</View>
					</View>
				)}
			</Accordion>
		</TransYUpViewMem>
	);
};
