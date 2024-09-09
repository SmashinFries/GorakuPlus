import { useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ListHeading } from '../text';
import { View } from 'react-native';
import { useMemo } from 'react';
import { rgbToRgba } from '@/utils';
import {
	UserAnimeStatsQuery,
	UserMangaStatsQuery,
	UserReleaseYearStatistic,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { LineChart, LineChartPropsType } from 'react-native-gifted-charts';

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
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	// const chartConfig: AbstractChartConfig = {
	// 	backgroundColor: colors.onSecondaryContainer,
	// 	backgroundGradientFromOpacity: 0,
	// 	backgroundGradientToOpacity: 0,
	// 	color: (opacity = 1) => rgbToRgba(colors.secondary, opacity),
	// 	strokeWidth: 3, // optional, default 3
	// 	barPercentage: 0.8,
	// 	useShadowColorFromDataset: false, // optional
	// 	barRadius: 5,
	// };
	// const ryData = useMemo(
	// 	() =>
	// 		[...data]?.sort(
	// 			(a: UserReleaseYearStatistic, b: UserReleaseYearStatistic) =>
	// 				a.releaseYear - b.releaseYear,
	// 		),
	// 	[data],
	// );

	// const labels = useMemo(() => data?.sort(),[data])

	// const dataset: LineChartData = {
	// 	labels: ryData?.map((item: UserReleaseYearStatistic) => item.releaseYear.toString()),
	// 	datasets: [
	// 		{
	// 			data: ryData?.map((item: UserReleaseYearStatistic) => item.count),
	// 			color: (opacity = 1) => rgbToRgba(colors.primary, opacity),
	// 			strokeWidth: 3,
	// 		},
	// 	],
	// };

	return (
		<View>
			<ListHeading title="Release Year" />
			{/* <LineChart
				data={dataset}
				width={width}
				height={256}
				verticalLabelRotation={30}
				chartConfig={chartConfig}
				withVerticalLines={false}
				withHorizontalLines={false}
				bezier
			/> */}
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

export const GorakuLineChartLabel = ({
	val,
	marginLeft,
	color,
	bold = true,
}: {
	val: string | number;
	marginLeft: number;
	color: string;
	bold?: boolean;
}) => {
	return (
		<View style={{ width: 70, marginLeft: marginLeft }}>
			<Text style={{ color: color ?? 'white', fontWeight: bold ? 'bold' : undefined }}>
				{val}
			</Text>
		</View>
	);
};

type GorakuLineChartProps = LineChartPropsType;
export const GorakuLineChart = ({ ...props }: GorakuLineChartProps) => {
	const { colors } = useAppTheme();
	return (
		<LineChart
			color={colors.primary}
			yAxisTextStyle={{ color: colors.onSurface }}
			xAxisLabelTextStyle={{ color: colors.onSurface }}
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
			textColor={colors.onSurface}
			verticalLinesStrokeLinecap="round"
			verticalLinesStrokeDashArray={[2, 3]}
			verticalLinesUptoDataPoint
			{...props}
		/>
	);
};
