import { useAppTheme } from '@/store/theme/themes';
import { useState } from 'react';
import { View } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';
import { MUISlider } from '../slider';

type ScoreSliderProps = {
	updateScore: (score: number) => void;
	title: string;
	initialScore?: number;
	minValue?: number;
	maxValue?: number;
};
export const ScoreSlider = ({
	updateScore,
	title,
	initialScore,
	maxValue = 100,
	minValue = 0,
}: ScoreSliderProps) => {
	const { colors } = useAppTheme();
	const [value, setValue] = useState(initialScore ?? 0);
	return (
		<NativeViewGestureHandler disallowInterruption={true}>
			<View style={{ paddingVertical: 10, paddingLeft: 10, paddingTop: 20 }}>
				<Text variant="titleMedium">
					{title} - {value}
				</Text>
				<MUISlider
					value={value}
					onValueChange={(value) => {
						setValue(value[0]);
						updateScore(value[0]);
					}}
					// onSlidingComplete={(value) => updateScore(value)}
					step={5}
					minValue={0}
					maxValue={100}
				/>
			</View>
		</NativeViewGestureHandler>
	);
};
