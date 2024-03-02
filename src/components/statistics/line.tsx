import { useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { useTheme } from 'react-native-paper';
import { ListHeading } from '../text';
import { View } from 'react-native';
import {
	UserAnimeStatsQuery,
	UserMangaStatsQuery,
	UserReleaseYearStatistic,
} from '@/store/services/anilist/generated-anilist';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { useMemo } from 'react';
import { rgbToRgba } from '@/utils';

const data1 = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June'],
	datasets: [
		{
			data: [20, 45, 28, 80, 99, 43],
			color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
			strokeWidth: 2, // optional
		},
	],
	legend: ['Rainy Days'], // optional
};

type ReleaseYearsLineChartProps = {
	data:
		| UserAnimeStatsQuery['User']['statistics']['anime']['releaseYears']
		| UserMangaStatsQuery['User']['statistics']['manga']['releaseYears'];
};
export const ReleaseYearsLineChart = ({ data }: ReleaseYearsLineChartProps) => {
	const { colors } = useTheme();
	const { width } = useWindowDimensions();
	const chartConfig: AbstractChartConfig = {
		backgroundColor: colors.onSecondaryContainer,
		backgroundGradientFromOpacity: 0,
		backgroundGradientToOpacity: 0,
		color: (opacity = 1) => rgbToRgba(colors.secondary, opacity),
		strokeWidth: 3, // optional, default 3
		barPercentage: 0.8,
		useShadowColorFromDataset: false, // optional
		barRadius: 5,
	};
	const ryData = useMemo(
		() =>
			[...data]?.sort(
				(a: UserReleaseYearStatistic, b: UserReleaseYearStatistic) =>
					a.releaseYear - b.releaseYear,
			),
		[data],
	);

	// const labels = useMemo(() => data?.sort(),[data])

	const dataset: LineChartData = {
		labels: ryData?.map((item: UserReleaseYearStatistic) => item.releaseYear.toString()),
		datasets: [
			{
				data: ryData?.map((item: UserReleaseYearStatistic) => item.count),
				color: (opacity = 1) => rgbToRgba(colors.primary, opacity),
				strokeWidth: 3,
			},
		],
	};

	return (
		<View>
			<ListHeading title="Release Year" />
			<LineChart
				data={dataset}
				width={width}
				height={256}
				verticalLabelRotation={30}
				chartConfig={chartConfig}
				withVerticalLines={false}
				withHorizontalLines={false}
				bezier
			/>
		</View>
	);
};
