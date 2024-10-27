import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { useAppTheme } from '@/store/theme/themes';
import { LineChart, LineChartPropsType } from 'react-native-gifted-charts';

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
			// isAnimated
			// animateOnDataChange
			// animationDuration={1200}
			textColor={colors.onSurface}
			verticalLinesStrokeLinecap="round"
			verticalLinesStrokeDashArray={[2, 3]}
			verticalLinesUptoDataPoint
			{...props}
		/>
	);
};
