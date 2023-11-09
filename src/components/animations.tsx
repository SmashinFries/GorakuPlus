import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, useDynamicAnimation } from 'moti';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ReactNode, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    StyleProp,
    ViewStyle,
    useWindowDimensions,
    TextStyle,
} from 'react-native';
import { Button, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    interpolateColor,
    useDerivedValue,
    withSpring,
    useAnimatedReaction,
} from 'react-native-reanimated';
import { rgbToRgba } from '../utils';

export const useHeaderAnim = (start = 40, end = 110) => {
    const input_range = [start, end];
    const { colors } = useTheme();
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

    const bgImageStyle = useAnimatedStyle(() => {
        const scale = interpolate(scrollY.value, [0, start], [1.05, 1.1]);
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
                bgTransY.value = -(currentValue / 3);
            }
        },
    );

    return { scrollHandler, headerStyle, headerTitleStyle, bgImageStyle, headerActionStyle };
};

type AnimViewProps = {
    style?: StyleProp<ViewStyle>;
    animation?: boolean;
    delay?: number;
    children: React.ReactNode;
};
export const TransYUpView = ({ children, style, delay, animation = true }: AnimViewProps) => {
    const { height } = useWindowDimensions();

    if (!animation) {
        return <View style={style}>{children}</View>;
    }

    return (
        <MotiView
            style={style}
            from={{ translateY: height }}
            animate={{ translateY: 0 }}
            delay={delay}
            transition={{ type: 'spring', mass: 0.5, damping: 10 }}
        >
            {children}
        </MotiView>
    );
};

export const TransXInView = ({
    children,
    style,
    direction,
    delay,
}: AnimViewProps & { direction: 'left' | 'right' }) => {
    const { width } = useWindowDimensions();
    return (
        <MotiView
            renderToHardwareTextureAndroid
            style={style}
            from={{ translateX: direction === 'left' ? -width : width }}
            animate={{ translateX: direction === 'right' ? 0 : 0 }}
            delay={delay}
            transition={{ type: 'spring', mass: 0.5, damping: 10 }}
        >
            {children}
        </MotiView>
    );
};

export const TransXInViewMem = memo(TransXInView);
export const TransYUpViewMem = memo(TransYUpView);

type ToggableChevronProps = {
    isExpanded: boolean;
};
const ToggableChevron = ({ isExpanded }: ToggableChevronProps) => {
    const iconRotation = useSharedValue(0);
    const { colors } = useTheme();

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
        <Animated.View style={[animatedIconStyle]}>
            <MaterialCommunityIcons size={24} color={colors.onSurfaceVariant} name={'chevron-up'} />
        </Animated.View>
    );
};

type AnimateHeightProps = {
    initialHeight: number;
    children: ReactNode;
};
export const ExpandableDescription = ({ initialHeight, children }: AnimateHeightProps) => {
    const { colors } = useTheme();
    const height = useSharedValue(initialHeight);
    const [totalHeight, setTotalHeight] = useState<number>(0);
    const [currentHeight, setCurrentHeight] = useState<number>(initialHeight);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    const toggleHeight = useCallback(() => {
        height.value = withSpring(
            height.value === totalHeight
                ? initialHeight
                : totalHeight - height.value + initialHeight,
            { damping: 10, mass: 0.5 },
        );
        setCurrentHeight(
            height.value === totalHeight
                ? initialHeight
                : totalHeight - height.value + initialHeight,
        );
    }, [height, totalHeight]);

    return (
        <View style={{ overflow: 'visible', marginVertical: 15 }}>
            <Animated.View style={[animatedStyles, { overflow: 'hidden' }]}>
                <View style={[StyleSheet.absoluteFill, { bottom: 'auto', paddingBottom: 10 }]}>
                    <View
                        onLayout={(e) => setTotalHeight(e.nativeEvent.layout.height)}
                        style={{
                            paddingHorizontal: 20,
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
                <LinearGradient
                    colors={['transparent', colors.background]}
                    locations={
                        Math.floor(currentHeight) < Math.floor(totalHeight) ? [0.5, 1] : [1, 1]
                    }
                    style={{ position: 'absolute', height: '100%', width: '100%' }}
                />
            </Animated.View>
            {currentHeight <= totalHeight && (
                <IconButton
                    icon={
                        Math.floor(currentHeight) === initialHeight ? 'chevron-down' : 'chevron-up'
                    }
                    onPress={toggleHeight}
                    style={{
                        position: 'absolute',
                        bottom: -35,
                        alignSelf: 'center',
                        overflow: 'visible',
                    }}
                />
            )}
        </View>
    );
};

type AccordianProps = {
    title: string;
    titleNumberOfLines?: number;
    description?: string;
    descriptionNumberOfLines?: number;
    descriptionStyle?: StyleProp<TextStyle>;
    children: ReactNode;
    initialExpand?: boolean;
};
export const Accordian = ({
    title,
    titleNumberOfLines,
    children,
    description,
    descriptionNumberOfLines,
    descriptionStyle,
    initialExpand = false,
}: AccordianProps) => {
    const { colors } = useTheme();
    const [isExpanded, setIsExpanded] = useState(initialExpand);
    const initialHeight = 0;
    const height = useSharedValue(0);
    const [totalHeight, setTotalHeight] = useState<number>(0);
    const [currentHeight, setCurrentHeight] = useState<number>(initialHeight);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    const toggleHeight = useCallback(() => {
        height.value = withSpring(
            height.value === totalHeight
                ? initialHeight
                : totalHeight - height.value + initialHeight,
            { damping: 10, mass: 0.5 },
        );
        setCurrentHeight(
            height.value === totalHeight
                ? initialHeight
                : totalHeight - height.value + initialHeight,
        );
        setIsExpanded((prev) => !prev);
    }, [height, totalHeight]);

    useEffect(() => {
        if (initialExpand) {
            toggleHeight();
        }
    }, [initialExpand, totalHeight]);

    return (
        <View style={[{ overflow: 'visible' }]}>
            <View style={{ backgroundColor: colors?.background }}>
                <TouchableRipple
                    onPress={toggleHeight}
                    rippleColor={colors.background}
                    borderless
                    style={{ paddingVertical: 8, paddingRight: 24 }}
                >
                    <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                        <View style={[{ paddingLeft: 16 }, { flex: 1, justifyContent: 'center' }]}>
                            <Text
                                selectable={false}
                                numberOfLines={titleNumberOfLines}
                                style={[{ fontSize: 16 }]}
                            >
                                {title}
                            </Text>
                            {description ? (
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
                        <View style={[{ marginVertical: 6, paddingLeft: 8 }]}>
                            {/* <Animated.View>
                                <MaterialCommunityIcons
                                    size={24}
                                    color={colors.onSurfaceVariant}
                                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                                />
                            </Animated.View> */}
                            <ToggableChevron isExpanded={isExpanded} />
                        </View>
                    </View>
                </TouchableRipple>
            </View>
            <Animated.View style={[animatedStyles, { overflow: 'hidden' }]}>
                <View style={[StyleSheet.absoluteFill, { bottom: 'auto', paddingBottom: 10 }]}>
                    <View
                        onLayout={(e) => setTotalHeight(e.nativeEvent.layout.height)}
                        // style={{
                        //     paddingHorizontal: 20,
                        //     paddingVertical: 10,
                        //     paddingBottom: 20,
                        //     // backgroundColor: colors.secondaryContainer,
                        //     borderRadius: 12,
                        //     margin: 15,
                        // }}
                    >
                        {children}
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};
