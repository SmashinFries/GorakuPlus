import { useAppTheme } from '@/store/theme/themes';
import { View } from 'react-native';
import Animated, {
	useSharedValue,
	withTiming,
	ZoomInEasyDown,
	ZoomOutEasyDown,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import { Slider as RNSlider } from '@miblanchard/react-native-slider';
import { SliderOnChangeCallback } from '@miblanchard/react-native-slider/lib/types';

const _SliderRoundEdge = ({
	minColor,
	maxColor,
	backgroundColor,
	isMinEdge,
	isMaxEdge,
}: {
	minColor: string;
	maxColor: string;
	backgroundColor: string;
	isMinEdge: boolean;
	isMaxEdge: boolean;
}) => (
	<View style={{ position: 'absolute', height: '100%', justifyContent: 'center' }}>
		<View
			style={[
				{
					position: 'absolute',
					height: '100%',
					justifyContent: 'center',
					left: -15,
					elevation: 0,
					backgroundColor: backgroundColor,
				},
			]}
		>
			<View
				style={[
					{
						height: 16,
						width: 8,
						borderTopRightRadius: 4,
						borderBottomRightRadius: 4,
						elevation: 0,
						backgroundColor: isMinEdge ? 'transparent' : minColor,
					},
				]}
			/>
			<View
				style={{
					position: 'absolute',
					backgroundColor: isMinEdge ? 'transparent' : minColor,
					width: 10,
					height: 16,
					left: -8,
				}}
			/>
		</View>
		<View
			style={[
				{
					position: 'absolute',
					height: '100%',
					justifyContent: 'center',
					right: -15,
					backgroundColor: backgroundColor,
				},
			]}
		>
			<View
				style={[
					{
						height: 16,
						width: 8,
						borderTopLeftRadius: 4,
						borderBottomLeftRadius: 4,
						backgroundColor: isMaxEdge ? 'transparent' : maxColor,
					},
				]}
			/>
			<View
				style={{
					position: 'absolute',
					backgroundColor: isMaxEdge ? 'transparent' : maxColor,
					width: 10,
					height: 16,
					right: -8,
				}}
			/>
		</View>
	</View>
);

type MUISliderProps = {
	value: number | number[];
	onValueChange: (val: number[]) => void;
	maxValue: number;
	minValue: number;
	mode?: 'discrete' | 'continuous';
	step?: number;
	thumbBackgroundColor?: string;
	startFromZero?: boolean;
	showMinMax?: boolean;
	enableExperimentalMD3?: boolean;
};
/**
 * An attempt at designing a MD3 slider.
 * Would likely be easier to build from scratch.
 */
export const MUISlider = ({
	value,
	onValueChange,
	maxValue,
	minValue,
	mode = 'discrete',
	step = 1,
	thumbBackgroundColor,
	startFromZero = true,
	showMinMax = false,
	enableExperimentalMD3 = false,
}: MUISliderProps) => {
	const { colors } = useAppTheme();
	const trackMarks =
		mode === 'discrete'
			? Array.from({ length: maxValue }, (v, i) => i + 1)
			: [minValue, maxValue];
	const [isSliding, setIsSliding] = useState(false);
	const [trackWidth, _setTrackWidth] = useState(0);
	// const valueAnim = useSharedValue(value);
	// const trackWidthAnim = useSharedValue(0);
	const thumbWidthAnimVal = useSharedValue(4);
	const maxTrackWidth = useSharedValue(
		typeof value === 'number' ? trackWidth * (value / maxValue) : 0,
	);

	useEffect(() => {
		if (enableExperimentalMD3) {
			if (isSliding) {
				thumbWidthAnimVal.value = withTiming(2);
			} else {
				thumbWidthAnimVal.value = withTiming(4);
			}
		}
	}, [enableExperimentalMD3, isSliding]);

	useEffect(() => {
		if (typeof value === 'number' && trackWidth && enableExperimentalMD3) {
			maxTrackWidth.value = trackWidth * (value / maxValue);
		}
	}, [trackWidth, value, maxValue, enableExperimentalMD3]);

	return (
		<View
			style={{
				marginVertical: 6,
				paddingHorizontal: 8,
				flexDirection: 'row',
				width: '100%',
				alignItems: 'center',
			}}
		>
			{showMinMax && (
				<Text variant="titleMedium" style={{ paddingHorizontal: 8 }}>
					{minValue}
				</Text>
			)}
			<RNSlider
				value={value}
				onValueChange={(val) => {
					onValueChange(val);
				}}
				maximumValue={maxValue}
				minimumValue={minValue}
				containerStyle={{ borderRadius: 16 / 2, flex: 1, width: '100%' }}
				step={mode === 'discrete' && step}
				// trackStyle={{backgroundColor: }}
				minimumTrackTintColor={colors.primary}
				// minimumTrackTintColor="transparent"
				maximumTrackTintColor={colors.primaryContainer}
				// maximumTrackTintColor="transparent"
				// minimumTrackStyle={{ width: '90%' }}
				trackMarks={trackMarks}
				trackStyle={{ height: 16, borderRadius: 16 / 2 }}
				trackClickable
				startFromZero={startFromZero}
				// animationType="spring"
				// animateTransitions
				thumbTouchSize={{ height: 44, width: 4 }}
				onSlidingStart={() => setIsSliding(true)}
				onSlidingComplete={() => setIsSliding(false)}
				// renderMinimumTrackComponent={() => (
				// 	<View
				// 		style={{
				// 			height: 16,
				// 			alignItems: 'flex-end',
				// 			width: '100%',
				// 			backgroundColor: 'transparent',
				// 			borderRadius: 16 / 2,
				// 			overflow: 'hidden',
				// 		}}
				// 	>
				// 		<View
				// 			style={{
				// 				backgroundColor: colors.primary,
				// 				width: '100%',
				// 				marginRight: 8,
				// 				height: 16,
				// 				borderRadius: 4,
				// 				borderTopLeftRadius: 16 / 2,
				// 				borderBottomLeftRadius: 16 / 2,
				// 			}}
				// 		/>
				// 	</View>
				// )}
				// renderMaximumTrackComponent={() => (
				// 	<Animated.View
				// 		onLayout={(e) => {
				// 			trackWidthAnim.value = e.nativeEvent.layout.width;
				// 			setTrackWidth(e.nativeEvent.layout.width);
				// 		}}
				// 		style={{
				// 			height: 16,
				// 			width: '100%',
				// 			alignSelf: 'flex-end',
				// 			backgroundColor: 'transparent',
				// 			borderRadius: 16 / 2,
				// 			overflow: 'hidden',
				// 			paddingLeft: maxTrackWidth,
				// 		}}
				// 	>
				// 		<View
				// 			style={{
				// 				backgroundColor: colors.primaryContainer,
				// 				width: '100%',
				// 				marginLeft: 8,
				// 				height: 16,
				// 				borderRadius: 4,
				// 				borderTopRightRadius: 16 / 2,
				// 				borderBottomRightRadius: 16 / 2,
				// 			}}
				// 		/>
				// 	</Animated.View>
				// )}
				minimumTrackStyle={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
				renderTrackMarkComponent={() => (
					<View
						style={{
							width: 4,
							height: 4,
							borderRadius: 4 / 2,
							backgroundColor: colors.primary,
							marginHorizontal: 4,
						}}
					/>
				)}
				renderAboveThumbComponent={(_index, value) =>
					isSliding &&
					enableExperimentalMD3 && (
						<Animated.View
							entering={ZoomInEasyDown.delay(100)}
							exiting={ZoomOutEasyDown.delay(100)}
							style={{
								position: 'absolute',
								alignSelf: 'center',
								bottom: 8,
								height: 44,
								minWidth: 48,
								borderRadius: 48 / 2,
								backgroundColor: colors.inverseSurface,
								justifyContent: 'center',
							}}
						>
							<Text style={{ color: colors.inverseOnSurface, textAlign: 'center' }}>
								{value.toFixed(0)}
							</Text>
						</Animated.View>
					)
				}
				renderThumbComponent={(_idx) =>
					enableExperimentalMD3 ? (
						<View
							style={{
								height: 44,
								alignItems: 'center',
								alignSelf: 'center',
								backgroundColor: thumbBackgroundColor ?? colors.surface,
							}}
						>
							<Animated.View
								style={{
									width: thumbWidthAnimVal,
									height: '100%',
									borderRadius: 8,
									marginHorizontal: 6,
									backgroundColor: colors.primary,
									// backgroundColor: 'red',
								}}
							/>
						</View>
					) : (
						<View
							style={{
								height: 36,
								width: 4,
								alignItems: 'center',
								alignSelf: 'center',
								borderRadius: 12,
								marginHorizontal: 6,
								backgroundColor: colors.primary,
							}}
						/>
					)
				}
			/>
			{showMinMax && (
				<Text variant="titleMedium" style={{ paddingHorizontal: 8 }}>
					{maxValue}
				</Text>
			)}
		</View>
	);
};

// export const OMUISlider = ({
// 	initialValue = 0,
// 	onValueChange,
// 	minValue,
// 	maxValue,
// 	step,
// 	mode = 'discrete',
// 	snap = true,
// 	backgroundColor,
// 	isReset = false,
// 	resetValue,
// }: OMUISliderProps) => {
// 	const { colors } = useAppTheme();
// 	const progress = useSharedValue(initialValue);
// 	const min = useSharedValue(minValue);
// 	const max = useSharedValue(maxValue);
// 	const [bubbleText, setBubbleText] = useState(`${initialValue}`);
// 	// const [currentIndex, setCurrentIndex] = useState(initialValue);

// 	useEffect(() => {
// 		min.value = minValue;
// 		max.value = maxValue;
// 	}, [minValue, maxValue]);

// 	useEffect(() => {
// 		if (isReset !== undefined) {
// 			console.log('resetting to', resetValue);
// 			progress.value = resetValue;
// 		}
// 	}, [isReset]);

// 	return (
// 		<Slider
// 			style={{
// 				width: '90%',
// 				alignSelf: 'center',
// 				marginBottom: 20,
// 				marginTop: 12,
// 			}}
// 			progress={progress}
// 			minimumValue={min}
// 			maximumValue={max}
// 			containerStyle={{ borderRadius: 12 }}
// 			step={mode === 'discrete' ? step ?? maxValue : undefined}
// 			markStyle={{ backgroundColor: colors.primary }}
// 			// onValueChange={(val) => {
// 			// 	Number.isInteger(val) && setCurrentIndex(val);
// 			// }}
// 			sliderHeight={16}
// 			// bubble={(num) => `${num}`}
// 			// bubbleContainerStyle={{
// 			// 	height: 44,
// 			// 	minWidth: 48,
// 			// 	borderRadius: 48 / 2,
// 			// 	backgroundColor: colors.inverseSurface,
// 			// 	top: -26,
// 			// 	justifyContent: 'center',
// 			// 	alignSelf: 'center',
// 			// }}

// 			// bubbleTextStyle={{ color: colors.inverseOnSurface, backgroundColor: 'transparent' }}
// 			// bubbleWidth={48}
// 			setBubbleText={(txt) => {
// 				setBubbleText(txt);
// 			}}
// 			renderBubble={() => (
// 				<View
// 					style={{
// 						height: 44,
// 						minWidth: 48,
// 						borderRadius: 48 / 2,
// 						backgroundColor: colors.inverseSurface,
// 						top: -24,
// 						justifyContent: 'center',
// 						alignSelf: 'center',
// 					}}
// 				>
// 					<Text style={{ color: colors.inverseOnSurface, textAlign: 'center' }}>
// 						{bubbleText}
// 					</Text>
// 				</View>
// 			)}
// 			// thumbWidth={24}
// 			snapToStep={mode === 'discrete' && snap}
// 			hapticMode={mode === 'discrete' ? 'step' : 'both'}
// 			renderThumb={() => (
// 				<View
// 					style={{
// 						height: 44,
// 						alignItems: 'center',
// 						backgroundColor: backgroundColor ?? colors.surface,
// 					}}
// 				>
// 					{/* <SliderRoundEdge
// 						backgroundColor={colors.surface}
// 						minColor={colors.primary}
// 						maxColor={colors.primaryContainer}
// 						isMinEdge={currentIndex === minValue}
// 						isMaxEdge={currentIndex === maxValue}
// 					/> */}
// 					<View
// 						style={{
// 							width: 4,
// 							height: '100%',
// 							borderRadius: 8,
// 							marginHorizontal: 6,
// 							backgroundColor: colors.primary,
// 						}}
// 					/>
// 				</View>
// 			)}
// 			onHapticFeedback={() => {
// 				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// 			}}
// 			onSlidingComplete={onValueChange}
// 			theme={{
// 				minimumTrackTintColor: colors.primary,
// 				maximumTrackTintColor: colors.primaryContainer,
// 			}}
// 		/>
// 	);
// };

type TestSliderProps = {
	title: string;
	description?: string;
	initialValue: number | 'ANY';
	onValueUpdate: (val: number) => void;
	maxValue: number;
	allowTextInput?: boolean;
	minValue?: number;
	steps?: number;
};
export const Slider = ({
	title,
	description,
	initialValue,
	maxValue,
	minValue = 0,
	steps,
	allowTextInput = false,
	onValueUpdate,
}: TestSliderProps) => {
	const { colors } = useAppTheme();
	const [value, setValue] = useState(initialValue === 'ANY' ? (minValue ?? 0) : initialValue);
	const [textValue, setTextValue] = useState(`${initialValue}`);
	// const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

	const trackMarks = !!steps
		? Array.from({ length: maxValue }, (v, i) => i + 1)
		: [minValue, maxValue];

	const onSliderComplete: SliderOnChangeCallback = (val) => {
		onValueUpdate(Number(val[0].toFixed(0)));
		setTextValue(`${val[0].toFixed(0)}`);
	};

	const onTextInput = (txt: string) => {
		const num = parseInt(txt);
		setTextValue(txt);
		if (num && num > minValue && num <= maxValue) {
			setValue(num);
			onValueUpdate(Number(num.toFixed(0)));
		} else if (num && (num < minValue || num > maxValue)) {
			setValue(minValue);
			onValueUpdate(undefined);
		}
		// if (num) {
		// 	setValue(num);
		// 	onValueUpdate(Number(num.toFixed(0)));
		// }
	};

	useEffect(() => {
		setValue(initialValue === 'ANY' ? (minValue ?? 0) : initialValue);
		setTextValue(`${initialValue === 'ANY' ? '' : initialValue}`);
	}, [initialValue]);

	return (
		<View style={{ paddingVertical: 8 }}>
			<View style={{ paddingHorizontal: 16 }}>
				<Text variant="titleMedium">{title}</Text>
				{description ? (
					<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
						{description}
					</Text>
				) : null}
			</View>
			<View
				style={[
					{
						marginHorizontal: 16,
					},
					allowTextInput && {
						flexDirection: 'row',
						alignItems: 'center',
					},
				]}
			>
				<RNSlider
					value={value}
					onSlidingComplete={onSliderComplete}
					onValueChange={(vals) => {
						setValue(vals[0]);
						setTextValue(`${vals[0].toFixed(0)}`);
					}}
					step={steps}
					trackMarks={trackMarks}
					trackStyle={{ height: 6 }}
					minimumValue={minValue}
					maximumValue={maxValue}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.primaryContainer}
					thumbTintColor={colors.primary}
					thumbStyle={{ width: 20, height: 20 }}
					renderTrackMarkComponent={() => (
						<View
							style={{
								width: 4,
								height: 4,
								borderRadius: 4 / 2,
								backgroundColor: colors.primary,
							}}
						/>
					)}
					containerStyle={allowTextInput ? { flexGrow: 1, marginRight: 12 } : {}}
				/>
				{allowTextInput ? (
					<TextInput
						value={textValue}
						mode="outlined"
						dense
						onChangeText={onTextInput}
						placeholder={
							initialValue === 'ANY' && (value === 0 || value === minValue)
								? 'Any'
								: ''
						}
						keyboardType="number-pad"
						// onFocus={handleOnFocus}
						// onBlur={handleOnBlur}
					/>
				) : null}
			</View>
		</View>
	);
};

type RangeSliderProps = {
	title: string;
	initialValues: [number, number];
	onValueUpdate: (vals: number[]) => void;
	maxValue: number;
	minValue?: number;
	steps?: number;
};
export const RangeSlider = ({
	title,
	initialValues,
	maxValue,
	minValue = 0,
	steps,
	onValueUpdate,
}: RangeSliderProps) => {
	const { colors } = useAppTheme();
	const [values, setValues] = useState<number[]>(initialValues);

	const trackMarks = !!steps
		? Array.from({ length: maxValue }, (v, i) => i + 1)
		: [minValue, maxValue];

	const onSliderComplete: SliderOnChangeCallback = (vals) => {
		onValueUpdate([Number(vals[0].toFixed(0)), Number(vals[1].toFixed(0))]);
	};

	const reset = () => {
		onValueUpdate([minValue, maxValue]);
		setValues([minValue, maxValue]);
	};

	useEffect(() => {
		setValues(initialValues);
	}, [initialValues]);

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingHorizontal: 16,
					height: 28,
				}}
			>
				<Text variant="titleMedium">{title}</Text>
				{
					<Text
						variant="labelLarge"
						style={{ color: colors.primary }}
						onPress={reset}
						disabled={values[0] > minValue || values[1] < maxValue}
					>
						{/* <Icon source={'close'} size={undefined} color={colors.primary} /> */}
						{`${values[0].toFixed(0)} - ${values[1].toFixed(0)}`}
						{values[1] === maxValue ? ' +' : ''}{' '}
					</Text>
				}
			</View>
			<View
				style={[
					{
						marginHorizontal: 16,
					},
				]}
			>
				<RNSlider
					value={values}
					onSlidingComplete={onSliderComplete}
					onValueChange={(vals) => setValues(vals)}
					step={steps}
					trackMarks={trackMarks}
					trackStyle={{ height: 6 }}
					minimumValue={minValue}
					maximumValue={maxValue}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.primaryContainer}
					thumbTintColor={colors.primary}
					thumbStyle={{ width: 20, height: 20 }}
					// renderTrackMarkComponent={() => (
					// 	<View
					// 		style={{
					// 			width: 4,
					// 			height: 4,
					// 			borderRadius: 4 / 2,
					// 			backgroundColor: colors.primary,
					// 		}}
					// 	/>
					// )}
				/>
			</View>
		</View>
	);
};
