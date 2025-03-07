import { FlatList, View } from 'react-native';
import { List, Surface, Text } from 'react-native-paper';
import { useAppTheme } from '@/store/theme/themes';
import {
	SiteStatsQuery_SiteStatistics_SiteStatistics,
	SiteTrend,
	useSiteStatsQuery,
} from '@/api/anilist/__genereated__/gql';
import { GorakuActivityIndicator } from '@/components/loading';
import { lineDataItem } from 'react-native-gifted-charts';
import { getCompactNumberForm, getOrdinalString } from '@/utils';
import { GorakuLineChart, GorakuLineChartLabel } from '@/components/statistics/line';
import { Accordion, AnimViewMem } from '@/components/animations';
import { GorakuRefreshControl } from '@/components/explore/lists';

const StatChart = ({ data }: { data: SiteTrend[] }) => {
	const { colors } = useAppTheme();
	const chartData: lineDataItem[] = data?.toReversed()?.map((trend) => ({
		value: trend.count,
		dataPointText: `${trend.count.toLocaleString()}`,
		label: `${getOrdinalString(new Date(trend.date * 1000).getDate())}`,
		labelComponent: () => (
			<GorakuLineChartLabel
				val={getOrdinalString(new Date(trend.date * 1000).getDate())}
				marginLeft={45}
				color={colors.onSurface}
				bold={false}
			/>
		),
	}));
	const minValue = [...data]?.sort((a, b) => a.count - b.count)[0]?.count;

	if (!data) return null;
	return (
		<GorakuLineChart
			data={chartData}
			yAxisOffset={minValue ?? 0}
			showVerticalLines={false}
			hideYAxisText
			textShiftY={-8}
			height={150}
			overflowTop={8}
			scrollToEnd
		/>
	);
};

type StatSectionProps = {
	title: string;
	data: SiteTrend[];
};
const StatSection = ({ title, data }: StatSectionProps) => {
	if (!data) return null;
	return (
		<View style={{ marginVertical: 12 }}>
			<List.Item
				title={`${getCompactNumberForm(data[0]?.count)} ${title}`}
				right={(props) => (
					<Text
						style={[
							props.style,
							{ color: data[0]?.change > 0 ? 'green' : 'red', fontWeight: '900' },
						]}
					>{`${data[0]?.change > 0 ? '+' : ''}${data[0]?.change.toLocaleString()}`}</Text>
				)}
			/>
			<View style={{ paddingTop: 8 }}>
				<StatChart data={data} />
			</View>
		</View>
	);
};

const StatOverviewBox = ({ title, count }: { title: string; count: number | undefined }) => {
	const { colors } = useAppTheme();
	return (
		<Surface
			style={{
				alignItems: 'center',
				padding: 12,
				borderRadius: 12,
				borderWidth: 1,
				borderColor: colors.primary,
			}}
		>
			<Text variant="labelMedium">{title}</Text>
			<Text variant="titleLarge">{count?.toLocaleString()}</Text>
		</Surface>
	);
};

// Cant figure out cause of scroll performance drop :/
// Using accordions as a temp workaround
const SiteStatsPage = () => {
	const { data, isFetching, refetch, isRefetching } = useSiteStatsQuery({});
	return (
		<AnimViewMem style={{ height: '100%', width: '100%' }}>
			{isFetching && (
				<View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<GorakuActivityIndicator />
				</View>
			)}
			<FlatList
				data={['anime', 'manga', 'characters', 'staff', 'users', 'reviews']}
				renderItem={({ item, index }) => (
					<Accordion
						title={item}
						titleStyle={{ textTransform: 'capitalize' }}
						initialExpand={index === 0}
					>
						<StatSection
							data={
								data?.SiteStatistics?.[
									item as keyof SiteStatsQuery_SiteStatistics_SiteStatistics
								]?.nodes?.filter((node): node is SiteTrend => node !== null) ?? []
							}
							title={item}
						/>
					</Accordion>
				)}
				// removeClippedSubviews
				// estimatedItemSize={237}
				keyExtractor={(item, idx) => idx.toString()}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
				ListHeaderComponent={
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							paddingVertical: 12,
						}}
					>
						<StatOverviewBox
							title="Anime"
							count={data?.SiteStatistics?.anime?.nodes?.[0]?.count}
						/>
						<StatOverviewBox
							title="Manga"
							count={data?.SiteStatistics?.manga?.nodes?.[0]?.count}
						/>
						<StatOverviewBox
							title="Users"
							count={data?.SiteStatistics?.users?.nodes?.[0]?.count}
						/>
					</View>
				}
			/>
		</AnimViewMem>
	);
};

export default SiteStatsPage;
