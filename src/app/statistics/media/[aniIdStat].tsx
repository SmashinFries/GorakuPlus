import {
	MediaRankType,
	MediaTrendsQuery,
	MediaType,
	useMediaTrendsQuery,
} from '@/api/anilist/__genereated__/gql';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Chip, Divider, List, Text } from 'react-native-paper';
import { LineChart } from 'react-native-gifted-charts';
import { CurveType, lineDataItem } from 'gifted-charts-core';
import { useAppTheme } from '@/store/theme/themes';
import { ScoreItem, StatBar, StatusItem } from '@/components/media/statistics';
import { Image } from 'expo-image';

const CustomLabel = ({ val, marginLeft }: { val: string | number; marginLeft: number }) => {
	return (
		<View style={{ width: 70, marginLeft: marginLeft }}>
			<Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
		</View>
	);
};

const CustomDataPoint = ({ bgColor }: { bgColor: string }) => {
	return (
		<View
			style={{
				width: 12,
				height: 12,
				backgroundColor: bgColor,
				// borderWidth: 4,
				borderRadius: 12 / 2,
			}}
		/>
	);
};

const ActivityChart = ({
	activityData,
}: {
	activityData: MediaTrendsQuery['Media']['trends']['nodes'];
}) => {
	const { colors } = useAppTheme();
	const trendData: lineDataItem[] = activityData
		? activityData?.toReversed()?.map((trend, idx) => ({
				value: trend.trending,
				dataPointText: `${trend.trending.toLocaleString()}`,
				textShiftY: -10,
				// hideDataPoint: !!(idx % 2),
				textColor: colors.onSurface,
				dataPointColor: colors.primary,
				customDataPoint: () => <CustomDataPoint bgColor={colors.primary} />,
				labelComponent: () =>
					!(idx % 2) && (
						<CustomLabel
							val={`${new Date(trend.date * 1000).getDate()}th`}
							marginLeft={20}
						/>
					),
			}))
		: [];

	const lowestTrending = activityData
		? [...activityData]?.sort((a, b) => a.trending - b.trending)[0]
		: null;
	const highestTrending = activityData
		? [...activityData].sort((a, b) => b.trending - a.trending)[0]
		: null;

	if (!activityData || activityData?.length < 1) return null;
	return (
		<View>
			<List.Item
				title={'Recent Activity Per Day'}
				description={`${new Date(activityData?.at(-1)?.date * 1000).toLocaleDateString()} -> ${new Date(activityData[0]?.date * 1000).toLocaleDateString()}`}
			/>
			<View>
				<LineChart
					data={trendData}
					color={colors.primary}
					yAxisTextStyle={{ color: colors.onSurface }}
					animateOnDataChange
					noOfSections={4}
					areaChart
					// curveType={CurveType.QUADRATIC}
					curved
					startFillColor={colors.primary}
					endFillColor={colors.primary}
					endFillColor1={colors.primary}
					startOpacity={0.4}
					endOpacity={0.4}
					spacing={50}
					rulesColor={colors.surfaceVariant}
					rulesType="solid"
					initialSpacing={10}
					yAxisColor={colors.outline}
					xAxisColor={colors.outline}
					thickness={6}
					isAnimated
					animationDuration={1200}
					animateTogether
					verticalLinesStrokeLinecap="round"
					verticalLinesStrokeDashArray={[2, 3]}
					verticalLinesUptoDataPoint
					yAxisOffset={lowestTrending?.trending - 50}
					scrollAnimation
					// maxValue={lowestTrending?.trending + 60}
					// lineGradient
				/>
			</View>
		</View>
	);
};

const AiringScoreChart = ({
	airingData,
}: {
	airingData: MediaTrendsQuery['Media']['airingTrends']['nodes'];
}) => {
	const { colors } = useAppTheme();

	const airingScoreData: lineDataItem[] =
		airingData?.length > 0
			? airingData
					?.toReversed()
					?.filter((airtrend) => !!airtrend.episode)
					?.map((airingTrend, idx) => ({
						value: airingTrend?.averageScore,
						dataPointText: `${airingTrend?.averageScore}`,
						textShiftY: -10,
						textColor: colors.onSurface,
						dataPointColor: colors.primary,
						// label: ,
						customDataPoint: () => <CustomDataPoint bgColor={colors.primary} />,
						labelComponent: () => (
							<CustomLabel val={`${airingTrend.episode}`} marginLeft={50} />
						),
					}))
			: [];
	const lowestAiringScore =
		airingData?.length > 0
			? [...(airingData ?? [])]
					?.filter((data) => data.episode !== null)
					?.sort((a, b) => a?.averageScore - b?.averageScore)[0]
			: null;
	const highestAiringScore =
		airingData?.length > 0
			? [...(airingData ?? [])]
					?.filter((data) => data.episode !== null)
					?.sort((a, b) => b?.averageScore - a?.averageScore)[0]
			: null;

	if (
		!airingData ||
		airingData?.length < 1 ||
		!airingScoreData ||
		!lowestAiringScore ||
		!highestAiringScore
	)
		return null;

	return (
		<View>
			<List.Item title={'Airing Score Progression'} style={{ paddingTop: 14 }} />
			{airingScoreData && lowestAiringScore && highestAiringScore && (
				<View>
					<LineChart
						data={airingScoreData}
						color={colors.primary}
						yAxisTextStyle={{ color: colors.onSurface }}
						// noOfSections={
						// 	highestAiringScore?.averageScore -
						// 	lowestAiringScore?.averageScore +
						// 	2
						// }
						noOfSections={4}
						areaChart
						curved
						startFillColor={colors.primary}
						endFillColor={colors.primary}
						endFillColor1={colors.primary}
						startOpacity={0.4}
						endOpacity={0.4}
						spacing={100}
						rulesColor={colors.surfaceVariant}
						rulesType="solid"
						initialSpacing={10}
						yAxisColor={colors.outline}
						xAxisColor={colors.outline}
						thickness={4}
						isAnimated
						animateOnDataChange
						animationDuration={1200}
						yAxisOffset={lowestAiringScore?.averageScore}
						maxValue={
							highestAiringScore?.averageScore - lowestAiringScore?.averageScore + 2
						} //how many from lowest value
						showVerticalLines
						verticalLinesStrokeLinecap="round"
						verticalLinesStrokeDashArray={[2, 3]}
						verticalLinesUptoDataPoint

						// lineGradient
					/>
				</View>
			)}
		</View>
	);
};

const AiringWatchersChart = ({
	airingData,
}: {
	airingData: MediaTrendsQuery['Media']['airingTrends']['nodes'];
}) => {
	const { colors } = useAppTheme();

	const airingProgData: lineDataItem[] = airingData
		?.toReversed()
		?.filter((data) => !!data?.episode)
		?.map((airProgData) => ({
			value: airProgData.inProgress,
			dataPointText: `${airProgData.inProgress.toLocaleString()}`,
			textShiftY: -10,
			textColor: colors.onSurface,
			dataPointColor: colors.primary,
			customDataPoint: () => <CustomDataPoint bgColor={colors.primary} />,
			labelComponent: () => <CustomLabel val={`${airProgData.episode}`} marginLeft={50} />,
		}));

	const lowestAiringProgress =
		airingData?.length > 0
			? [...(airingData ?? [])]
					?.filter((data) => data.episode !== null)
					?.sort((a, b) => a.inProgress - b.inProgress)[0]
			: null;

	if (!airingData || airingData?.length < 1 || !airingProgData || !lowestAiringProgress)
		return null;
	return (
		<View>
			<List.Item title={'Airing Watchers Progression'} style={{ paddingTop: 14 }} />
			{airingProgData && lowestAiringProgress && (
				<View>
					<LineChart
						data={airingProgData}
						color={colors.primary}
						yAxisTextStyle={{ color: colors.onSurface }}
						noOfSections={4}
						areaChart
						curved
						startFillColor={colors.primary}
						endFillColor={colors.primary}
						endFillColor1={colors.primary}
						startOpacity={0.4}
						endOpacity={0.4}
						spacing={100}
						rulesColor={colors.surfaceVariant}
						rulesType="solid"
						initialSpacing={10}
						yAxisColor={colors.outline}
						xAxisColor={colors.outline}
						thickness={4}
						isAnimated
						animateOnDataChange
						animationDuration={1200}
						yAxisOffset={lowestAiringProgress?.inProgress}
						showVerticalLines
						verticalLinesStrokeLinecap="round"
						verticalLinesStrokeDashArray={[2, 3]}
						verticalLinesUptoDataPoint
					/>
				</View>
			)}
		</View>
	);
};

const MediaStatsPage = () => {
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data, isFetching } = useMediaTrendsQuery(
		{ id: id ? parseInt(id) : null },
		{ enabled: !!id, refetchOnMount: false },
	);

	const statusDistSorted = [...(data?.Media?.distribution?.status ?? [])]?.sort(
		(a, b) => b.amount - a.amount,
	);

	const scoreDistSorted = [...(data?.Media?.distribution?.score ?? [])]?.sort(
		(a, b) => a.score - b.score,
	);

	return (
		<View>
			{isFetching && (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size={'large'} />
				</View>
			)}
			{data && !isFetching && (
				<ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingLeft: 10 }}
					>
						{data?.Media?.rankings?.map((ranking, idx) => (
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
					<ActivityChart activityData={data?.Media?.trends?.nodes} />
					<AiringScoreChart airingData={data?.Media?.airingTrends?.nodes} />
					<AiringWatchersChart airingData={data?.Media?.airingTrends?.nodes} />
					<View>
						<List.Item title={'Status Distribution'} />
						{statusDistSorted?.length > 0 ? (
							<View style={{ paddingHorizontal: 15, marginTop: 10, marginBottom: 5 }}>
								{/* <Text variant="titleLarge" style={{ marginBottom: 5 }}>
									Status Distribution
								</Text> */}
								<StatBar data={statusDistSorted} />
								<ScrollView horizontal showsHorizontalScrollIndicator={false}>
									{statusDistSorted?.map((statusDis, idx) => (
										<StatusItem key={idx} status={statusDis} />
									))}
								</ScrollView>
							</View>
						) : null}
						<List.Item title={'Score Distribution'} />
						{scoreDistSorted?.length > 0 && (
							<View
								style={{
									paddingHorizontal: 15,
									marginTop: 10,
									marginBottom: 5,
									alignItems: 'flex-start',
								}}
							>
								{/* <Text variant="titleLarge" style={{ marginBottom: 5 }}>
									Score Distribution
								</Text> */}

								<StatBar data={scoreDistSorted} />
								<ScrollView horizontal showsHorizontalScrollIndicator={false}>
									{scoreDistSorted.map((scoreDis, idx) => (
										<ScoreItem
											key={idx}
											score={scoreDis}
											highestScore={
												[...scoreDistSorted].sort(
													(a, b) => b.amount - a.amount,
												)[0]?.score
											}
										/>
									))}
								</ScrollView>
							</View>
						)}
					</View>
				</ScrollView>
			)}
		</View>
	);
};

export default MediaStatsPage;
