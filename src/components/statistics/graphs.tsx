import { View } from 'react-native';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useMemo } from 'react';
import { rgbToRgba } from '@/utils';
import { ListHeading } from '../text';
import { UserAnimeStatsQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { BarChart, barDataItem } from 'react-native-gifted-charts';

type ScoreGraphProps = {
	scores: UserAnimeStatsQuery['User']['statistics']['anime']['scores'];
};
export const ScoreGraph = ({ scores }: ScoreGraphProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useAppTheme();
	const scoreData = useMemo(() => [...scores]?.sort((a, b) => a.score - b.score), [scores]);

	const labels = useMemo(() => scoreData?.map((item) => item.score.toString()), []);
	const barData = useMemo<barDataItem[]>(
		() => scoreData?.map((item) => ({ value: item.count })),
		[],
	);

	// const chartConfig: AbstractChartConfig = {
	// 	backgroundColor: colors.onSecondaryContainer,
	// 	backgroundGradientFromOpacity: 0,
	// 	backgroundGradientToOpacity: 0,
	// 	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	// 	strokeWidth: 3, // optional, default 3
	// 	barPercentage: 0.8,
	// 	useShadowColorFromDataset: false, // optional
	// 	barRadius: 5,
	// };

	return (
		<ScrollView horizontal>
			<View>
				<ListHeading title="Scores" />
				<BarChart data={barData} />
				{/* <BarChart
					data={data}
					width={width}
					height={200}
					yAxisLabel="T"
					yAxisSuffix=""
					chartConfig={{
						...chartConfig,
						color: (opacity) => rgbToRgba(colors.primary, opacity),
					}}
					// verticalLabelRotation={30}
					withHorizontalLabels={false}
					withInnerLines={false}
					showValuesOnTopOfBars
					showBarTops
				/> */}
			</View>
		</ScrollView>
	);
};

// type EpisodesGraphProps = {
//     // episodes: UserAnimeStatsQuery['User']['statistics']['anime'][''];
// };
// export const EpisodesGraph = () => {};
