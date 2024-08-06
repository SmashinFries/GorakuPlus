import Slider from '@react-native-community/slider';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

type GorakuSliderProps = {
	updateValue: (val: number) => void;
	value: number;
	minValue?: number;
	maxValue?: number;
	step?: number;
	style?: StyleProp<ViewStyle>;
};
export const GorakuSlider = ({
	updateValue,
	value,
	maxValue = 100,
	minValue = 0,
	step = 5,
	style,
}: GorakuSliderProps) => {
	const { colors } = useTheme();
	return (
		<Slider
			value={value}
			onValueChange={(value) => updateValue(value)}
			// onSlidingComplete={(value) => updateValue(value)}
			minimumTrackTintColor={colors.primary}
			maximumTrackTintColor={colors.secondary}
			step={step}
			minimumValue={minValue}
			maximumValue={maxValue}
			thumbTintColor={colors.primary}
			lowerLimit={minValue ?? null}
			upperLimit={maxValue ?? null}
			style={[style]}
		/>
	);
};
