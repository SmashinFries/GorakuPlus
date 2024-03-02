import { ScrollView, useWindowDimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { useTheme } from 'react-native-paper';
import { UserOverviewQuery } from '@/store/services/anilist/generated-anilist';
import { View } from 'react-native';
import { rgbToRgba } from '@/utils';

const commitsData = [
	{ date: '2017-01-02', count: 1 },
	{ date: '2017-01-03', count: 2 },
	{ date: '2017-01-04', count: 3 },
	{ date: '2017-01-05', count: 4 },
	{ date: '2017-01-06', count: 5 },
	{ date: '2017-01-30', count: 2 },
	{ date: '2017-01-31', count: 3 },
	{ date: '2017-03-01', count: 2 },
	{ date: '2017-04-02', count: 4 },
	{ date: '2017-03-05', count: 2 },
	{ date: '2017-02-30', count: 4 },
];

type UserHeatmapProps = {
    data: UserOverviewQuery['Viewer']['stats']['activityHistory'];
};
export const UserHeatmap = ({ data }: UserHeatmapProps) => {
	const { colors } = useTheme();
	const { width } = useWindowDimensions();

	const chartConfig: AbstractChartConfig = {
		backgroundColor: colors.onSecondaryContainer,
		backgroundGradientFromOpacity: 0,
		backgroundGradientToOpacity: 0,
		color: (opacity = 1) => rgbToRgba(colors.primary, opacity),
		strokeWidth: 3, // optional, default 3
		useShadowColorFromDataset: false, // optional
		barRadius: 5,
	};

	const dataset = data?.map((item) => {
		return {
			date: new Date(item.date * 1000),
			count: item.amount,
		};
	});

	return (
		<ScrollView horizontal contentContainerStyle={{ flex: 1 }}>
			<View style={{ width: width + (data.length / 7) * 18, height: 220 }}>
				<ContributionGraph
					values={dataset}
					endDate={new Date()}
					numDays={data?.length ?? 130}
					width={width + (data.length / 7) * 18}
					height={220}
					squareSize={12}
					gutterSize={5}
					chartConfig={chartConfig}
				/>
			</View>
		</ScrollView>
	);
};
