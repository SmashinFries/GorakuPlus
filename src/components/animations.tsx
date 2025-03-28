import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native';
import { Divider, Icon, IconButton, Text, TextProps, TouchableRipple } from 'react-native-paper';
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolation,
	interpolateColor,
	withSpring,
	useAnimatedReaction,
	withTiming,
	Easing,
	withSequence,
	ZoomIn,
	AnimatedProps,
	FadeIn,
	FadeOut,
} from 'react-native-reanimated';
import { rgbToRgba } from '@/utils';
import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import useImageRotation from '@/hooks/useImageRotation';

export const useHeaderAnim = (start = 40, end = 110) => {
	const input_range = [start, end];
	const { colors } = useAppTheme();
	const rgbaColor = useMemo(
		() => rgbToRgba(colors.elevation.level3, 0.85),
		[colors.elevation.level3],
	);
	const scrollY = useSharedValue(0);
	const bgTransY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});
	const headerTitleStyle = useAnimatedStyle(() => {
		const opac = interpolate(scrollY.value, input_range, [0, 1], {
			extrapolateLeft: Extrapolation.CLAMP,
		});

		return {
			opacity: opac,
		};
	});

	const headerStyle = useAnimatedStyle(() => {
		const bgColor = interpolateColor(scrollY.value, input_range, ['transparent', rgbaColor]);

		return {
			backgroundColor: bgColor,
		};
	});

	const headerActionStyle = useAnimatedStyle(() => {
		const bgColor = interpolateColor(scrollY.value, input_range, [rgbaColor, 'transparent']);

		return {
			backgroundColor: bgColor,
		};
	});

	// @ts-ignore
	const bgImageStyle = useAnimatedStyle(() => {
		const scale = interpolate(scrollY.value, [0, end], [1.05, 1.2], Extrapolation.CLAMP);
		return {
			transform: [{ translateY: bgTransY.value }, { scale: scale }],
		};
	});

	useAnimatedReaction(
		() => {
			return scrollY.value;
		},
		(currentValue, previousValue) => {
			if (currentValue !== previousValue) {
				// bgTransY.value = withSpring(-(currentValue / 2), { damping: 10, mass: 0.5 });
				bgTransY.value = currentValue <= 0 ? 0 : -(currentValue / 3);
			}
		},
	);

	return { scrollHandler, headerStyle, headerTitleStyle, bgImageStyle, headerActionStyle };
};

type AnimViewProps = {
	style?: StyleProp<ViewStyle>;
	delay?: number;
	entering?: AnimatedProps<ViewProps>['entering'];
	exiting?: AnimatedProps<ViewProps>['exiting'];
	children: React.ReactNode;
};
export const AnimView = ({ children, style, delay, entering, exiting }: AnimViewProps) => {
	return (
		<Animated.View
			style={style}
			entering={entering ?? ZoomIn.delay(delay).duration(600)}
			exiting={exiting}
			// from={{ translateY: height }}
			// animate={{ translateY: 0 }}
			// delay={delay}
			// transition={{ type: 'spring', mass: 0.5, damping: 10 }}
		>
			{children}
		</Animated.View>
	);
};

export const TransXInView = ({
	children,
	style,
}: AnimViewProps & { direction: 'left' | 'right' }) => {
	// const { width } = useWindowDimensions();
	return (
		<Animated.View
			// renderToHardwareTextureAndroid
			style={style}
			// from={{ translateX: direction === 'left' ? -width : width }}
			// animate={{ translateX: direction === 'right' ? 0 : 0 }}
			// delay={delay}
			// transition={{ type: 'spring', mass: 0.5, damping: 10 }}
		>
			{children}
		</Animated.View>
	);
};

export const TransXInViewMem = memo(TransXInView);
export const AnimViewMem = memo(AnimView);

type ToggableChevronProps = {
	isExpanded: boolean;
};
const ToggableChevron = ({ isExpanded }: ToggableChevronProps) => {
	const iconRotation = useSharedValue(0);
	const { colors } = useAppTheme();

	const animatedIconStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${iconRotation.value}deg` }],
		};
	});

	const toggleRotation = useCallback(() => {
		iconRotation.value = withSpring(isExpanded ? 0 : 180, { damping: 10, mass: 0.5 });
	}, [iconRotation, isExpanded]);

	useEffect(() => {
		toggleRotation();
	}, [isExpanded, toggleRotation]);

	return (
		<Animated.View style={[animatedIconStyle, { alignSelf: 'center' }]}>
			<Icon size={24} color={colors.onSurfaceVariant} source={'chevron-up'} />
		</Animated.View>
	);
};

type AnimateHeightProps = {
	initialHeight: number;
	containerStyle?: ViewStyle;
	children: ReactNode;
	toggleUwuifier?: () => void;
};
export const ExpandableDescription = ({
	initialHeight,
	containerStyle,
	toggleUwuifier,
	children,
}: AnimateHeightProps) => {
	const { colors, dark } = useAppTheme();
	const height = useSharedValue(initialHeight);
	const [totalHeight, setTotalHeight] = useState<number>(0);
	const [currentHeight, setCurrentHeight] = useState<number>(initialHeight);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			height: height.value,
		};
	});

	const resetHeight = useCallback(() => {
		height.value = withSpring(initialHeight, { damping: 10, mass: 0.5 });
		setCurrentHeight(initialHeight);
	}, [height, totalHeight]);

	const increaseHeight = useCallback(() => {
		height.value = withSpring(totalHeight, { damping: 10, mass: 0.5 });
		setCurrentHeight(totalHeight);
	}, [height, totalHeight]);

	useEffect(() => {
		if (initialHeight > totalHeight) {
			height.value = totalHeight;
		}
	}, [initialHeight, totalHeight]);

	useEffect(() => {
		if (isExpanded) {
			increaseHeight();
		} else {
			resetHeight();
		}
	}, [isExpanded]);

	return (
		<View style={[{ marginBottom: 25 }, containerStyle]}>
			<Animated.View style={[animatedStyles, { overflow: 'hidden' }]}>
				<View style={[StyleSheet.absoluteFill, { bottom: 'auto', paddingBottom: 10 }]}>
					<View
						onLayout={(e) => setTotalHeight(e.nativeEvent.layout.height)}
						style={{
							flex: 1,
							// paddingHorizontal: 20,
							paddingVertical: 10,
							paddingBottom: 20,
							// backgroundColor: colors.secondaryContainer,
							borderRadius: 12,
							margin: 15,
						}}
					>
						{children}
					</View>
				</View>
				{!isExpanded && (
					<LinearGradient
						colors={[dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)', colors.background]}
						locations={
							Math.floor(currentHeight) < Math.floor(totalHeight) ? [0.5, 1] : [1, 1]
						}
						style={{
							position: 'absolute',
							height: '100%',
							width: '100%',
							pointerEvents: 'none',
						}}
					/>
				)}
			</Animated.View>
			{totalHeight > initialHeight && (
				<View>
					<IconButton
						icon={
							Math.floor(currentHeight) === initialHeight
								? 'chevron-down'
								: 'chevron-up'
						}
						onPress={() => setIsExpanded((prev) => !prev)}
						onLongPress={toggleUwuifier ? toggleUwuifier : undefined}
						style={{
							position: 'absolute',
							bottom: -35,
							alignSelf: 'center',
							overflow: 'visible',
						}}
					/>
				</View>
			)}
			{/* {currentHeight <= totalHeight && (
				<View>
					<IconButton
						icon={
							Math.floor(currentHeight) === initialHeight
								? 'chevron-down'
								: 'chevron-up'
						}
						onPress={() => setIsExpanded((prev) => !prev)}
						onLongPress={toggleUwuifier}
						style={{
							position: 'absolute',
							bottom: -35,
							alignSelf: 'center',
							overflow: 'visible',
						}}
					/>
				</View>
			)} */}
		</View>
	);
};

export const ExpandableDescriptionMem = memo(ExpandableDescription);

export type AccordionProps = {
	title: string;
	titleNumberOfLines?: number;
	titleVariant?: TextProps<any>['variant'];
	titleStyle?: StyleProp<TextStyle>;
	description?: ReactNode;
	descriptionNumberOfLines?: number;
	descriptionStyle?: StyleProp<TextStyle>;
	children: ReactNode;
	initialExpand?: boolean;
	containerKey?: string | number;
	left?: ReactNode;
	enableDivider?: boolean;
};
export const Accordion = ({
	title,
	titleNumberOfLines,
	titleVariant,
	titleStyle,
	left,
	children,
	description,
	descriptionNumberOfLines,
	descriptionStyle,
	initialExpand = false,
	containerKey = 1,
	enableDivider = false,
}: AccordionProps) => {
	const { colors } = useAppTheme();
	const [isExpanded, setIsExpanded] = useState(initialExpand);
	const initialHeight = 0;
	const duration = 200;
	const height = useSharedValue(0);
	const [totalHeight, setTotalHeight] = useState<number>(0);
	// const [currentHeight, setCurrentHeight] = useState<number>(initialHeight);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			height: height.value,
		};
	});

	const toggleHeight = useCallback(() => {
		height.value = withTiming(
			height.value === totalHeight
				? initialHeight
				: totalHeight - height.value + initialHeight,
			{ duration },
		);
		// setCurrentHeight(
		// 	height.value === totalHeight
		// 		? initialHeight
		// 		: totalHeight - height.value + initialHeight,
		// );
		setIsExpanded((prev) => !prev);
	}, [height, initialHeight, totalHeight]);

	useEffect(() => {
		if (initialExpand && totalHeight) {
			height.value = withTiming(totalHeight, { duration });
		}
	}, [totalHeight]);

	useEffect(() => {
		if (isExpanded && totalHeight) {
			height.value = withTiming(totalHeight, { duration });
		}
	}, [isExpanded, totalHeight]);

	useEffect(() => {
		setIsExpanded(initialExpand);
	}, [initialExpand]);

	return (
		<View style={[{ overflow: 'visible' }]}>
			<View style={{ backgroundColor: 'transparent' }}>
				<TouchableRipple
					onPress={toggleHeight}
					// rippleColor={colors.background}
					rippleColor={'transparent'}
					borderless
					style={{ paddingVertical: 8, paddingRight: 24 }}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
						{left}
						<View style={[{ flex: 1, paddingLeft: 16, justifyContent: 'center' }]}>
							<Text
								selectable={false}
								numberOfLines={titleNumberOfLines}
								style={[titleStyle]}
								variant={titleVariant ?? 'titleMedium'}
							>
								{title}
							</Text>
							{description && typeof description === 'string' ? (
								<Text
									selectable={false}
									numberOfLines={descriptionNumberOfLines}
									style={[
										{
											fontSize: 14,
											color: colors.onSurfaceVariant,
										},
										descriptionStyle,
									]}
								>
									{description}
								</Text>
							) : null}
						</View>
						<View
							style={[
								{
									marginVertical: 6,
								},
							]}
						>
							<ToggableChevron isExpanded={isExpanded} />
						</View>
					</View>
				</TouchableRipple>
				{description && typeof description !== 'string' ? description : null}
			</View>
			<Animated.View key={containerKey} style={[animatedStyles, { overflow: 'hidden' }]}>
				<View style={[StyleSheet.absoluteFill, { bottom: 'auto' }]}>
					<View
						onLayout={(e) => {
							setTotalHeight(e.nativeEvent.layout.height);
						}}
						// style={{
						//     paddingHorizontal: 20,
						//     paddingVertical: 10,
						//     paddingBottom: 20,
						//     // backgroundColor: colors.secondaryContainer,
						//     borderRadius: 12,
						//     margin: 15,
						// }}
					>
						{isExpanded && (
							<AnimViewMem
								style={
									{
										// backgroundColor: !disableBGColor ? colors.backdrop : undefined,
									}
								}
								entering={FadeIn.duration(500)}
								exiting={FadeOut.duration(800)}
							>
								{children}
								{enableDivider && (
									<Divider style={{ backgroundColor: colors.primary }} />
								)}
							</AnimViewMem>
						)}
					</View>
				</View>
			</Animated.View>
		</View>
	);
};

export const AccordionMemo = memo(Accordion);

export const FullscreenBackground = ({
	urls,
	imgRotationLength = 7200,
}: {
	urls: string[];
	imgRotationLength?: number;
}) => {
	const img_src = useImageRotation(urls, imgRotationLength);
	const { dark, colors } = useAppTheme();
	const imgScaleVal = useSharedValue(1);

	const imageAnimStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: imgScaleVal.value }],
		};
	});

	const onImageLoaded = () => {
		imgScaleVal.value = withSequence(
			withTiming(1, { duration: 0 }),
			withTiming(1.5, { duration: 15000, easing: Easing.linear }),
		);
	};

	return (
		<View style={{ position: 'absolute', width: '100%', height: '100%' }}>
			<Animated.View style={[{ width: '100%', height: '100%' }, imageAnimStyle]}>
				<Image
					source={{ uri: img_src }}
					style={{ width: '100%', height: '100%' }}
					// transition={transition}
					transition={0}
					contentFit="cover"
					placeholder={{ blurhash: colors.blurhash }}
					onLoad={onImageLoaded}
				/>
			</Animated.View>
			<View
				style={{
					position: 'absolute',
					backgroundColor: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
					width: '100%',
					height: '100%',
				}}
			/>
			<LinearGradient
				colors={[
					colors.elevation.level2,
					'transparent',
					'transparent',
					colors.elevation.level2,
				]}
				style={{ position: 'absolute', height: '100%', width: '100%' }}
				locations={[0, 0.1, 0.6, 1]}
			/>
		</View>
	);
};
