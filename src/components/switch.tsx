import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { useEffect, useState } from 'react';
import { ColorValue, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { List, Switch, Icon, SwitchProps as PaperSwitchProps } from 'react-native-paper';
import Animated, {
	Easing,
	Extrapolate,
	interpolate,
	interpolateColor,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { TextStyle } from 'react-native';
import { useAppTheme } from '@/store/theme/themes';
import * as Haptics from 'expo-haptics';

export const GorakuSwitch = (props: PaperSwitchProps) => {
	const { colors, dark } = useAppTheme();

	return (
		<Switch
			{...props}
			thumbColor={props.value ? (dark ? colors.primary : colors.primaryContainer) : undefined}
			color={colors.primary}
		/>
	);
};

// THIS IS NOT MY CODE
// IM BORROWING THIS FROM @crystalarcus
// It is only slightly modified
// Here is the discussion about it - https://github.com/callstack/react-native-paper/issues/3797
type SwitchProps = {
	selected: boolean;
	onPress: () => void;
	fluid?: boolean;
	switchOnIcon?: IconSource; // IconSource from 'react-native-paper/lib/typescript/components/Icon'
	switchOffIcon?: IconSource; // IconSource from 'react-native-paper/lib/typescript/components/Icon'
	disabled?: boolean;
};

export const MaterialSwitch = ({
	selected,
	onPress,
	switchOnIcon,
	switchOffIcon,
	disabled,
}: SwitchProps) => {
	const { colors } = useAppTheme();
	const position = useSharedValue(selected ? 10 : -10);
	const handleHeight = useSharedValue(selected ? 24 : 16);
	const handleWidth = useSharedValue(selected ? 24 : 16);
	const [active, setActive] = useState(selected);
	const [isPressed, setIsPressed] = useState(false);
	//#region
	const pan = Gesture.Pan()
		.activateAfterLongPress(100)
		.onTouchesUp(() => setIsPressed(false))
		.runOnJS(true)
		.hitSlop(disabled ? -30 : 0)
		.onStart(() => {
			setIsPressed(true);
			handleHeight.value = withTiming(28, { duration: 160 });
			handleWidth.value = withTiming(28, { duration: 160 });
		})
		.onChange((event) => {
			if (position.value + event.translationX / 10 < -10) {
				position.value = -10;
				return;
			}
			if (position.value + event.translationX / 10 > 10) {
				position.value = 10;
				return;
			}
			position.value += event.translationX / 10;
		})
		.onEnd(() => {
			setIsPressed(false);
			if (position.value > 0) {
				position.value = withTiming(10);
				handleHeight.value = withTiming(24, { duration: 160 });
				handleWidth.value = withTiming(24, { duration: 160 }, (finished) => {
					'worklet';
					if (finished && !active) {
						runOnJS(callbackFunction)();
					}
				});
				return;
			}

			if (position.value < 0) {
				position.value = withTiming(-10);
				handleHeight.value = withTiming(16, { duration: 160 });
				handleWidth.value = withTiming(16, { duration: 160 }, (finished) => {
					'worklet';
					if (finished && active) {
						runOnJS(callbackFunction)();
					}
				});
				return;
			}
		});
	//#endregion
	const handleStyle = useAnimatedStyle(() =>
		disabled
			? {
					transform: [{ translateX: active ? 10 : -10 }],
					height: active ? 24 : 16,
					width: active ? 24 : 16,
					marginVertical: 'auto',
					minHeight: switchOffIcon ? 24 : 16,
					minWidth: switchOffIcon ? 24 : 16,
					opacity: active ? 1 : 0.36,
					backgroundColor: active ? colors.surface : colors.onSurface,
					borderRadius: 20,
					justifyContent: 'center',
					alignItems: 'center',
				}
			: {
					transform: [{ translateX: position.value }],
					opacity: 1,
					height: handleHeight.value,
					width: handleWidth.value,
					marginVertical: 'auto',
					minHeight: switchOffIcon ? 24 : 16,
					minWidth: switchOffIcon ? 24 : 16,
					backgroundColor: interpolateColor(
						position.value,
						[-10, 10],
						[colors.outline, colors.onPrimary],
					),
					borderRadius: 20,
					justifyContent: 'center',
					alignItems: 'center',
				},
	);
	const trackStyle = useAnimatedStyle(() =>
		disabled
			? {
					borderWidth: 2,
					borderRadius: 16,
					justifyContent: 'center',
					height: 32,
					width: 52,
					opacity: 0.12,
					backgroundColor: active ? colors.onSurface : colors.surfaceVariant,
					borderColor: colors.onSurface,
				}
			: {
					alignItems: 'center',
					opacity: 1,
					backgroundColor: interpolateColor(
						position.value,
						[-10, 10],
						[colors.surfaceVariant, colors.primary],
					),
					borderColor: interpolateColor(
						position.value,
						[-10, 10],
						[colors.outline, colors.primary],
					),
					borderWidth: 2,
					borderRadius: 16,
					justifyContent: 'center',
					height: 32,
					width: 52,
				},
	);
	const handleOutlineStyle = useAnimatedStyle(() => ({
		height: 40,
		width: 40,
		borderRadius: 20,
		position: 'absolute',
		transform: [{ translateX: position.value }],
		backgroundColor: !isPressed
			? 'transparent'
			: interpolateColor(position.value, [-10, 10], [colors.onSurface, colors.primary]),
		alignItems: 'center',
		opacity: 0.18,
		justifyContent: 'center',
	}));
	const callbackFunction = () => {
		onSwitchPress();
		setIsPressed(false);
	};
	const iconOnStyle = useAnimatedStyle(() => ({
		opacity: disabled ? 0.38 : interpolate(position.value, [0, 10], [0, 1], Extrapolate.CLAMP),
		overflow: 'hidden',
		transform: [
			{
				scale: interpolate(position.value, [0, 10], [0, 1], Extrapolate.CLAMP),
			},
			{
				rotate: `${interpolate(position.value, [0, 10], [-90, 0], Extrapolate.CLAMP)}deg`,
			},
		],
	}));
	const iconOffStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		opacity: disabled ? 0.38 : interpolate(position.value, [-10, 0], [1, 0], Extrapolate.CLAMP),
		overflow: 'hidden',
		transform: [
			{
				scale: interpolate(position.value, [-10, 0], [1, 0], Extrapolate.CLAMP),
			},
			{
				rotate: `${interpolate(position.value, [-10, 0], [-90, 0], Extrapolate.CLAMP)}deg`,
			},
		],
		// width: interpolate(position.value, [5, 10], [0, 16]),
	}));
	const changeSwitch = (withCallback: boolean) => {
		if (active) {
			handleHeight.value = withTiming(16, { duration: 100 });
			handleWidth.value = withTiming(16, { duration: 100 });
			position.value = withTiming(
				-10,
				{ duration: 250 },
				withCallback
					? (finished) => {
							'worklet';
							if (finished) {
								runOnJS(callbackFunction)();
							}
						}
					: undefined,
			);
			setActive(false);
		} else {
			handleHeight.value = withTiming(24, { duration: 100 });
			handleWidth.value = withTiming(24, { duration: 100 });

			position.value = withTiming(
				10,
				{ duration: 250 },
				withCallback
					? (finished) => {
							'worklet';
							if (finished) {
								runOnJS(callbackFunction)();
							}
						}
					: undefined,
			);
			setActive(true);
		}
	};
	const onSwitchPress = () => {
		onPress && onPress();
	};
	useEffect(() => {
		if (active !== selected) {
			changeSwitch(false);
		}
		handleHeight.value = withTiming(selected ? 24 : 16);
		handleWidth.value = withTiming(selected ? 24 : 16);
	}, [selected]);
	return (
		<View style={{ borderRadius: 20, backgroundColor: colors.surface }}>
			<View pointerEvents="none" style={stylesSwitch.stateOuter}>
				<Animated.View style={handleOutlineStyle} key={3}></Animated.View>
			</View>
			<Animated.View style={trackStyle} key={1}>
				<View>
					<GestureDetector gesture={pan}>
						<Pressable
							disabled={disabled}
							style={{
								justifyContent: 'center',
								height: 32,
								width: 52,
								alignItems: 'center',
							}}
							onLongPress={() => {
								handleHeight.value = withTiming(28, { duration: 100 });
								handleWidth.value = withTiming(28, { duration: 100 });
							}}
							onPress={() => {
								Haptics.selectionAsync();
								setIsPressed(true);
								changeSwitch(true);
							}}
						></Pressable>
					</GestureDetector>
				</View>
			</Animated.View>
			<View pointerEvents="none" style={stylesSwitch.stateOuter}>
				<Animated.View style={handleStyle} key={2}>
					{switchOnIcon ? (
						<Animated.View key={10} style={iconOnStyle}>
							<Icon
								source={switchOnIcon}
								size={16}
								color={disabled ? colors.onSurface : colors.onPrimaryContainer}
							/>
						</Animated.View>
					) : null}
					{switchOffIcon ? (
						<Animated.View key={9} style={iconOffStyle}>
							<Icon source={switchOffIcon} size={16} color={colors.surface} />
						</Animated.View>
					) : null}
				</Animated.View>
			</View>
		</View>
	);
};
const stylesSwitch = StyleSheet.create({
	stateOuter: {
		justifyContent: 'center',
		height: 32,
		width: 52,
		alignItems: 'center',
		position: 'absolute',
	},
});

type SwitchListItemProps = {
	selected: boolean;
	onPress: () => void;
	fluid?: boolean;
	switchOnIcon?: IconSource;
	switchOffIcon?: IconSource;
	title: string;
	description?: string;
	titleStyle?: StyleProp<TextStyle>;
	descriptionStyle?: StyleProp<TextStyle>;
	listStyle?: StyleProp<ViewStyle>;
	leftIcon?: IconSource;
	rippleColor?: ColorValue;
	disabled?: boolean;
};

export const MaterialSwitchListItem = ({
	title,
	description,
	titleStyle,
	listStyle,
	selected,
	onPress,
	leftIcon,
	switchOnIcon,
	switchOffIcon,
	fluid,
	rippleColor,
	disabled,
}: SwitchListItemProps) => {
	//#region
	const { colors } = useAppTheme();
	const position = useSharedValue(selected ? 10 : -10);
	const handleHeight = useSharedValue(selected ? 24 : 16);
	const handleWidth = useSharedValue(selected ? 24 : 16);
	const [active, setActive] = useState(selected);
	const [isPressed, setIsPressed] = useState(false);

	//#region
	const pan = Gesture.Pan()
		.activateAfterLongPress(100)
		.onTouchesUp(() => setIsPressed(false))
		.runOnJS(true)
		.hitSlop(disabled ? -30 : 0)
		.onStart(() => {
			setIsPressed(true);
			handleHeight.value = withTiming(28, { duration: 160 });
			handleWidth.value = withTiming(28, { duration: 160 });
		})
		.onChange((event) => {
			if (position.value + event.translationX / 20 < -10) {
				position.value = -10;
				return;
			}
			if (position.value + event.translationX / 20 > 10) {
				position.value = 10;
				return;
			}
			position.value += event.translationX / 20;
		})
		.onEnd(() => {
			setIsPressed(false);
			if (position.value > 0) {
				position.value = withTiming(10);
				handleHeight.value = withTiming(24, { duration: 160 });
				handleWidth.value = withTiming(24, { duration: 160 }, (finished) => {
					'worklet';
					if (finished && !active) {
						runOnJS(callbackFunction)();
					}
				});
				return;
			}

			if (position.value < 0) {
				position.value = withTiming(-10);
				handleHeight.value = withTiming(16, { duration: 160 });
				handleWidth.value = withTiming(16, { duration: 160 }, (finished) => {
					'worklet';
					if (finished && active) {
						runOnJS(callbackFunction)();
					}
				});
				return;
			}
		});
	//#endregion

	const handleStyle = useAnimatedStyle(() =>
		disabled
			? {
					transform: [{ translateX: active ? 10 : -10 }],
					height: active ? 24 : 16,
					width: active ? 24 : 16,
					marginVertical: 'auto',
					minHeight: switchOffIcon ? 24 : 16,
					minWidth: switchOffIcon ? 24 : 16,
					opacity: active ? 1 : 0.36,
					backgroundColor: active ? colors.surface : colors.onSurface,
					borderRadius: 20,
					justifyContent: 'center',
					alignItems: 'center',
				}
			: {
					transform: [{ translateX: position.value }],
					opacity: 1,
					height: handleHeight.value,
					width: handleWidth.value,
					marginVertical: 'auto',
					minHeight: switchOffIcon ? 24 : 16,
					minWidth: switchOffIcon ? 24 : 16,
					backgroundColor: interpolateColor(
						position.value,
						[-10, 10],
						[colors.outline, colors.onPrimary],
					),
					borderRadius: 20,
					justifyContent: 'center',
					alignItems: 'center',
				},
	);
	const trackStyle = useAnimatedStyle(() =>
		disabled
			? {
					borderWidth: 2,
					borderRadius: 16,
					justifyContent: 'center',
					height: 32,
					width: 52,
					opacity: 0.12,
					backgroundColor: active ? colors.onSurface : colors.surfaceVariant,
					borderColor: colors.onSurface,
				}
			: {
					alignItems: 'center',
					opacity: 1,
					backgroundColor: interpolateColor(
						position.value,
						[-10, 10],
						[colors.surfaceVariant, colors.primary],
					),
					borderColor: interpolateColor(
						position.value,
						[-10, 10],
						[colors.outline, colors.primary],
					),
					borderWidth: 2,
					borderRadius: 16,
					justifyContent: 'center',
					height: 32,
					width: 52,
				},
	);
	const handleOutlineStyle = useAnimatedStyle(() => ({
		height: 40,
		width: 40,
		borderRadius: 20,
		position: 'absolute',
		transform: [{ translateX: position.value }],
		backgroundColor: !isPressed
			? 'transparent'
			: interpolateColor(position.value, [-10, 10], [colors.onSurface, colors.primary]),
		alignItems: 'center',
		opacity: 0.18,
		justifyContent: 'center',
	}));
	const callbackFunction = () => {
		onSwitchPress();
		setIsPressed(false);
	};
	const changeSwitch = (withCallback: boolean) => {
		if (active) {
			handleHeight.value = withTiming(16, { duration: 100 });
			handleWidth.value = withTiming(16, { duration: 100 });
			position.value = withTiming(
				-10,
				{ duration: 250 },
				withCallback
					? (finished) => {
							'worklet';
							if (finished) {
								runOnJS(callbackFunction)();
							}
						}
					: undefined,
			);
			setActive(false);
		} else {
			handleHeight.value = withTiming(24, { duration: 100 });
			handleWidth.value = withTiming(24, { duration: 100 });

			position.value = withTiming(
				10,
				{ duration: 250 },
				withCallback
					? (finished) => {
							'worklet';
							if (finished) {
								runOnJS(callbackFunction)();
							}
						}
					: undefined,
			);
			setActive(true);
		}
	};
	const onTap = () => {
		if (active) {
			handleHeight.value = withTiming(16, {
				duration: 200,
				easing: Easing.out(Easing.poly(1.4)),
			});
			position.value = withTiming(
				-10,
				{ duration: 250, easing: Easing.out(Easing.poly(1.4)) },
				(finished) => {
					'worklet';
					if (finished) {
						runOnJS(callbackFunction)();
					}
				},
			);
			handleWidth.value = withSequence(
				withTiming(36, { duration: 50, easing: Easing.out(Easing.poly(1.4)) }),
				withTiming(16, { duration: 200, easing: Easing.out(Easing.poly(1.4)) }),
			);
			setActive(false);
		} else {
			handleHeight.value = withTiming(24, {
				duration: 180,
				easing: Easing.out(Easing.poly(1.4)),
			});

			position.value = withTiming(
				10,
				{ duration: 250, easing: Easing.out(Easing.poly(1.4)) },
				(finished) => {
					'worklet';
					if (finished) {
						runOnJS(callbackFunction)();
					}
				},
			);
			handleWidth.value = withSequence(
				withTiming(38, { duration: 50, easing: Easing.out(Easing.poly(1.4)) }),
				withTiming(24, { duration: 200, easing: Easing.out(Easing.poly(1.4)) }),
			);
			setActive(true);
		}
	};
	const onSwitchPress = () => {
		onPress && onPress();
	};
	useEffect(() => {
		if (active !== selected) {
			changeSwitch(false);
		}
		handleHeight.value = withTiming(selected ? 24 : 16);
		handleWidth.value = withTiming(selected ? 24 : 16);
	}, [selected]);
	//#endregion

	return (
		<List.Item
			left={() => (
				<List.Icon
					style={{ paddingRight: leftIcon ? 8 : 0 }}
					icon={leftIcon as IconSource}
				/>
			)}
			rippleColor={rippleColor}
			titleStyle={titleStyle}
			disabled={disabled}
			title={title}
			description={description}
			descriptionStyle={{ paddingRight: 10 }}
			style={listStyle}
			onPress={() => {
				if (fluid) {
					onTap();
				} else {
					changeSwitch(true);
				}
			}}
			right={() => (
				<View style={{ justifyContent: 'center' }}>
					<View pointerEvents="none" style={stylesSwitchList.stateOuter}>
						<Animated.View style={handleOutlineStyle} key={3}></Animated.View>
					</View>
					<Animated.View style={trackStyle} key={1}>
						<View>
							<GestureDetector gesture={pan}>
								<Pressable
									disabled={disabled}
									style={{
										justifyContent: 'center',
										height: 32,
										width: 52,
										alignItems: 'center',
										zIndex: 99,
									}}
									delayLongPress={100}
									onLongPress={() => {
										handleHeight.value = withTiming(28, { duration: 50 });
										handleWidth.value = withTiming(28, { duration: 50 });
									}}
									// onPressIn={() => setIsPressed(true)}
									onPress={() => {
										Haptics.impactAsync();
										setIsPressed(true);
										changeSwitch(true);
									}}
								></Pressable>
							</GestureDetector>
						</View>
					</Animated.View>
					<View pointerEvents="none" style={stylesSwitchList.stateOuter}>
						<Animated.View style={handleStyle} key={2}>
							{active && switchOnIcon ? (
								<View style={{ opacity: disabled ? 0.36 : 1 }}>
									<Icon
										source={switchOnIcon}
										size={16}
										color={
											disabled ? colors.onSurface : colors.onPrimaryContainer
										}
									/>
								</View>
							) : !active && switchOffIcon ? (
								<Icon source={switchOffIcon} size={16} color={colors.surface} />
							) : null}
						</Animated.View>
					</View>
				</View>
			)}
		/>
	);
};

const stylesSwitchList = StyleSheet.create({
	stateOuter: {
		justifyContent: 'center',
		height: 32,
		width: 52,
		alignItems: 'center',
		position: 'absolute',
	},
});
