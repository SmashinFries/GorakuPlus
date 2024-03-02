import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { View } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';

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
	const { colors } = useTheme();
	const [value, setValue] = useState(initialScore ?? 0);
	return (
		<NativeViewGestureHandler disallowInterruption={true}>
			<View style={{ paddingVertical: 10, paddingLeft: 10, paddingTop: 20 }}>
				<Text variant="titleMedium">
					{title} - {value}
				</Text>
				<Slider
					value={value}
					onValueChange={(value) => setValue(value)}
					onSlidingComplete={(value) => updateScore(value)}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.secondary}
					step={5}
					minimumValue={0}
					maximumValue={100}
					thumbTintColor={colors.primary}
					lowerLimit={minValue ?? null}
					upperLimit={maxValue ?? null}
				/>
			</View>
		</NativeViewGestureHandler>
	);
};
