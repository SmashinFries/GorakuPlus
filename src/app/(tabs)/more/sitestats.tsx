import { FlatList, ScrollView, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Button, List, Portal, Text } from 'react-native-paper';
import { memo, useCallback, useEffect, useState } from 'react';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { AnilistIcon } from '@/components/svgs';
import { ListSubheader } from '@/components/titles';
import { useAppTheme } from '@/store/theme/themes';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { SiteStatistics, SiteTrend, useSiteStatsQuery } from '@/api/anilist/__genereated__/gql';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { GorakuActivityIndicator } from '@/components/loading';
import { lineDataItem } from 'react-native-gifted-charts';
import { getCompactNumberForm, getOrdinalString } from '@/utils';
import { GorakuLineChart, GorakuLineChartLabel } from '@/components/statistics/line';
import { FlashList } from '@shopify/flash-list';
import { AnimViewMem } from '@/components/animations';

const StatChart = ({ data }: { data: SiteTrend[] }) => {
	const { colors } = useAppTheme();
	const chartData: lineDataItem[] = data?.toReversed()?.map((trend, idx) => ({
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

const StatSectionMemo = memo(StatSection);

// Cant figure out cause of scroll performance drop :/
const SiteStatsPage = () => {
	const { data, isFetching } = useSiteStatsQuery({}, { refetchOnMount: true });
	const renderItem = useCallback(
		({ item }) =>
			data?.SiteStatistics[item] && (
				<StatSectionMemo data={data?.SiteStatistics[item]?.nodes} title={item} />
			),
		[],
	);

	return (
		<View style={{ height: '100%' }}>
			{isFetching && (
				<AnimViewMem
					style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
					entering={FadeIn}
					exiting={FadeOut}
				>
					<GorakuActivityIndicator />
				</AnimViewMem>
			)}
			{!isFetching && data && (
				<AnimViewMem entering={FadeIn} style={{ height: '100%', width: '100%' }}>
					<FlatList
						data={
							data.SiteStatistics && [
								'users',
								'anime',
								'manga',
								'characters',
								'staff',
								'reviews',
							]
						}
						renderItem={renderItem}
						removeClippedSubviews
						// estimatedItemSize={237}
						keyExtractor={(item, idx) => idx.toString()}
					/>
				</AnimViewMem>
			)}
		</View>
	);
};

export default SiteStatsPage;
