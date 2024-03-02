import { View, useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { useTheme } from 'react-native-paper';
import { ListHeading } from '../text';
import {
	UserAnimeStatsQuery,
	UserCountryStatistic,
	UserMangaStatsQuery,
	UserStatusStatistic,
} from '@/store/services/anilist/generated-anilist';
import { getPieChartColor } from '@/utils';

type FormatPieProps = {
    data:
        | UserMangaStatsQuery['User']['statistics']['manga']['formats']
        | UserAnimeStatsQuery['User']['statistics']['anime']['formats'];
};
export const FormatPie = ({ data }: FormatPieProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const chartConfig: AbstractChartConfig = {
		backgroundColor: colors.onSecondaryContainer,
		backgroundGradientFromOpacity: 0,
		backgroundGradientToOpacity: 0,
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 3, // optional, default 3
		useShadowColorFromDataset: false, // optional
		barRadius: 5,
	};

	// const formats = useMemo(() => [...new Set(data?.map((item) => item.format))], [data]);

	const dataset = data?.map((item, idx) => {
		return {
			name: item.format,
			count: item.count,
			color: getPieChartColor(idx, colors.primary),
			legendFontColor: '#7F7F7F',
			legendFontSize: 16,
		};
	});

	if (data?.length < 1) return null;

	return (
		<View style={{ justifyContent: 'center', alignSelf: 'center' }}>
			<ListHeading title="Format Distribution" />
			<PieChart
				data={dataset}
				width={width}
				height={150}
				chartConfig={chartConfig}
				accessor={'count'}
				backgroundColor={'transparent'}
				paddingLeft={'0'}
			/>
		</View>
	);
};

type StatusPieProps = {
    data:
        | UserMangaStatsQuery['User']['statistics']['manga']['statuses']
        | UserAnimeStatsQuery['User']['statistics']['anime']['statuses'];
};
export const StatusPie = ({ data }: StatusPieProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const chartConfig: AbstractChartConfig = {
		backgroundColor: colors.onSecondaryContainer,
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 3, // optional, default 3
		useShadowColorFromDataset: false, // optional
	};

	// const formats = useMemo(() => [...new Set(data?.map((item) => item.format))], [data]);

	const dataset = data?.map((item: UserStatusStatistic, idx) => {
		return {
			name: item.status,
			count: item.count,
			color: getPieChartColor(idx, colors.primary),
			legendFontColor: '#7F7F7F',
			legendFontSize: 16,
		};
	});

	if (data?.length < 1) return null;

	return (
		<View style={{ justifyContent: 'center', alignSelf: 'center' }}>
			<ListHeading title="Statuses Distribution" />
			<PieChart
				data={dataset}
				width={width}
				height={150}
				chartConfig={chartConfig}
				accessor={'count'}
				backgroundColor={'transparent'}
				paddingLeft={'0'}
			/>
		</View>
	);
};

type CountryPieProps = {
    data:
        | UserMangaStatsQuery['User']['statistics']['manga']['countries']
        | UserAnimeStatsQuery['User']['statistics']['anime']['countries'];
};
export const CountryPie = ({ data }: CountryPieProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const chartConfig: AbstractChartConfig = {
		backgroundColor: colors.onSecondaryContainer,
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 3, // optional, default 3
		useShadowColorFromDataset: false, // optional
	};

	// const formats = useMemo(() => [...new Set(data?.map((item) => item.format))], [data]);

	const dataset = data?.map((item: UserCountryStatistic, idx) => {
		return {
			name: item.country,
			count: item.count,
			color: getPieChartColor(idx, colors.primary),
			legendFontColor: '#7F7F7F',
			legendFontSize: 16,
		};
	});

	if (data?.length < 1) return null;

	return (
		<View style={{ justifyContent: 'center', alignSelf: 'center' }}>
			<ListHeading title="Country Distribution" />
			<PieChart
				data={dataset}
				width={width}
				height={150}
				chartConfig={chartConfig}
				accessor={'count'}
				backgroundColor={'transparent'}
				paddingLeft={'0'}
			/>
		</View>
	);
};
