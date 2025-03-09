import {
	MediaRankType,
	MediaTrendsQuery,
	useMediaTrendsQuery,
} from '@/api/anilist/__genereated__/gql';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Chip, List, Text } from 'react-native-paper';
import { LineChart, LineChartPropsType } from 'react-native-gifted-charts';
import { useAppTheme } from '@/store/theme/themes';
import { ScoreItem, StatBar, StatusItem } from '@/components/media/statistics';

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
	activityData: NonNullable<NonNullable<MediaTrendsQuery['Media']>['trends']>['nodes'];
}) => {
	const { colors } = useAppTheme();
	const trendData: LineChartPropsType['data'] = activityData
		? activityData?.toReversed()?.map((trend, idx) => ({
				value: trend?.trending ?? 0,
				dataPointText: `${trend?.trending?.toLocaleString() ?? '0'}`,
				textShiftY: -10,
				// hideDataPoint: !!(idx % 2),
				textColor: colors.onSurface,
				dataPointColor: colors.primary,
				customDataPoint: () => <CustomDataPoint bgColor={colors.primary} />,
				labelComponent: () =>
					!(idx % 2) && (
						<CustomLabel
							val={`${trend?.date ? new Date(trend.date * 1000).getDate() : '?'}th`}
							marginLeft={20}
						/>
					),
			}))
		: [];

	const lowestTrending = activityData
		? [...activityData]?.sort((a, b) => (a?.trending ?? 0) - (b?.trending ?? 0))[0]
		: null;
	// const highestTrending = activityData
	// 	? [...activityData].sort((a, b) => (b?.trending ?? 0) - (a?.trending ?? 0))[0]
	// 	: null;

	if (!activityData || activityData?.length < 1) return null;
	return (
		<View>
			<List.Item
				title={'Recent Activity Per Day'}
				description={
					activityData.at(-1)?.date &&
					activityData[0]?.date &&
					`${activityData.at(-1)?.date ? new Date((activityData.at(-1)?.date ?? 0) * 1000).toLocaleDateString() : '?'} -> ${new Date((activityData[0]?.date ?? 0) * 1000).toLocaleDateString()}`
				}
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
					yAxisOffset={(lowestTrending?.trending ?? 0) - 50}
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
	airingData: NonNullable<NonNullable<MediaTrendsQuery['Media']>['airingTrends']>['nodes'];
}) => {
	const { colors } = useAppTheme();

	const airingScoreData: LineChartPropsType['data'] =
		(airingData?.length ?? 0) > 0
			? airingData
					?.toReversed()
					?.filter((airtrend) => !!airtrend?.episode)
					?.map((airingTrend) => ({
						value: airingTrend?.averageScore,
						dataPointText: `${airingTrend?.averageScore}`,
						textShiftY: -10,
						textColor: colors.onSurface,
						dataPointColor: colors.primary,
						// label: ,
						customDataPoint: () => <CustomDataPoint bgColor={colors.primary} />,
						labelComponent: () => (
							<CustomLabel val={`${airingTrend?.episode}`} marginLeft={50} />
						),
					}))
			: [];
	const lowestAiringScore =
		(airingData?.length ?? 0) > 0
			? [...(airingData ?? [])]
					?.filter((data) => data?.episode !== null)
					?.sort((a, b) => (a?.averageScore ?? 0) - (b?.averageScore ?? 0))[0]
			: null;
	const highestAiringScore =
		(airingData?.length ?? 0) > 0
			? [...(airingData ?? [])]
					?.filter((data) => data?.episode !== null)
					?.sort((a, b) => (b?.averageScore ?? 0) - (a?.averageScore ?? 0))[0]
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
						yAxisOffset={lowestAiringScore?.averageScore ?? undefined}
						maxValue={
							highestAiringScore?.averageScore && lowestAiringScore?.averageScore
								? highestAiringScore?.averageScore -
									lowestAiringScore?.averageScore +
									2
								: undefined
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
	airingData: NonNullable<NonNullable<MediaTrendsQuery['Media']>['airingTrends']>['nodes'];
}) => {
	const { colors } = useAppTheme();

	const airingProgData: LineChartPropsType['data'] =
		airingData
			?.toReversed()
			?.filter((data) => !!data?.episode)
			?.map((airProgData) => ({
				value: airProgData?.inProgress,
				dataPointText: `${airProgData?.inProgress?.toLocaleString()}`,
				textShiftY: -10,
				textColor: colors.onSurface,
				dataPointColor: colors.primary,
				customDataPoint: () => <CustomDataPoint bgColor={colors.primary} />,
				labelComponent: () => (
					<CustomLabel val={`${airProgData?.episode}`} marginLeft={50} />
				),
			})) ?? [];

	const lowestAiringProgress =
		(airingData?.length ?? 0) > 0
			? [...(airingData ?? [])]
					?.filter((data) => data?.episode !== null)
					?.sort((a, b) => (a?.inProgress ?? 0) - (b?.inProgress ?? 0))[0]
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
						yAxisOffset={lowestAiringProgress?.inProgress ?? undefined}
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
	const { aniIdStat: id } = useLocalSearchParams<{ aniIdStat: string }>();
	const { data, isFetching } = useMediaTrendsQuery(
		{ id: id ? parseInt(id) : null },
		{ enabled: !!id, refetchOnMount: false },
	);

	const statusDistSorted = [...(data?.Media?.distribution?.status ?? [])]?.sort(
		(a, b) => (b?.amount ?? 0) - (a?.amount ?? 0),
	);

	const scoreDistSorted = [...(data?.Media?.distribution?.score ?? [])]?.sort(
		(a, b) => (a?.score ?? 0) - (b?.score ?? 0),
	);

	return (
		<View style={{ height: '100%', width: '100%' }}>
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
								icon={ranking?.type === MediaRankType.Rated ? 'star' : 'heart'}
								style={{ margin: 5 }}
								textStyle={{ textTransform: 'capitalize' }}
							>
								#{ranking?.rank} {ranking?.context}
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
										<StatusItem key={idx} status={statusDis ?? undefined} />
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
											score={scoreDis ?? undefined}
											highestScore={
												[...scoreDistSorted].sort(
													(a, b) => (b?.amount ?? 0) - (a?.amount ?? 0),
												)[0]?.score ?? undefined
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
