import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, useDynamicAnimation } from 'moti';
import { useRef } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    StyleProp,
    ViewStyle,
    useWindowDimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';

export const useHeaderAnim = () => {
    const { colors } = useTheme();
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    const headerTitleStyle = useAnimatedStyle(() => {
        const opac = interpolate(scrollY.value, [40, 110], [0, 1], {
            extrapolateLeft: Extrapolation.CLAMP,
        });

        return {
            opacity: opac,
        };
    });

    const headerStyle = useAnimatedStyle(() => {
        const bgColor = interpolateColor(
            scrollY.value,
            [40, 110],
            ['transparent', colors.background],
        );

        return {
            backgroundColor: bgColor,
        };
    });

    return { scrollHandler, headerStyle, headerTitleStyle };
};

type AnimateHeightProps = {
    children?: React.ReactNode;
    initialHeight: number;
    hide?: boolean;
    onHeightDidAnimate?: (height: number) => void;
    enterFrom?: 'bottom' | 'top';
} & React.ComponentProps<typeof MotiView>;

export const AnimateHeight = ({
    initialHeight,
    children,
    onHeightDidAnimate,
    enterFrom = 'top',
    hide = false,
    delay = Platform.select({ web: 250, default: 0 }),
    transition = { type: 'timing', delay },
    style,
    ...motiViewProps
}: AnimateHeightProps) => {
    const measuredHeight = useSharedValue(initialHeight);
    const { colors } = useTheme();
    const state = useDynamicAnimation(() => {
        return {
            height: initialHeight,
            // opacity: !initialHeight || hide ? 0 : 1,
        };
    });

    if ('state' in motiViewProps) {
        console.warn('[AnimateHeight] state prop not supported');
    }

    const animation = useDerivedValue(() => {
        let height = Math.ceil(measuredHeight.value);
        if (hide) {
            height = 80;
        }

        const notVisible = !height || hide;

        state.animateTo({
            height,
            // opacity: !height || hide ? 0 : 1,
        });
    }, [hide, measuredHeight]);

    return (
        <MotiView
            {...motiViewProps}
            state={state}
            // animate={{ height: initialHeight }}
            transition={transition}
            onDidAnimate={
                onHeightDidAnimate &&
                ((key, finished, _, { attemptedValue }) =>
                    key == 'height' && onHeightDidAnimate(attemptedValue as number))
            }
            style={[styles.hidden, style]}
        >
            <View
                style={[
                    StyleSheet.absoluteFill,
                    styles.autoBottom,

                    // THIS BREAKS IDK WHY, so ignore that prop
                    // enterFrom === 'top' ? styles.autoBottom : styles.autoTop,
                ]}
                onLayout={({ nativeEvent }) => {
                    measuredHeight.value = nativeEvent.layout.height;
                }}
            >
                {children}
            </View>
            <LinearGradient
                colors={['transparent', colors.background]}
                locations={hide ? [0.5, 1] : [1, 1]}
                style={{ position: 'absolute', height: '100%', width: '100%' }}
            />
        </MotiView>
    );
};

const styles = StyleSheet.create({
    autoBottom: {
        bottom: 'auto',
        paddingBottom: 10,
    },
    autoTop: {
        top: 'auto',
    },
    hidden: {
        overflow: 'hidden',
    },
});

type AnimViewProps = {
    style?: StyleProp<ViewStyle>;
    animation?: boolean;
    children: React.ReactNode;
};
export const TransYUpView = ({ children, style, animation = true }: AnimViewProps) => {
    const { height } = useWindowDimensions();

    if (!animation) {
        return <View style={style}>{children}</View>;
    }

    return (
        <MotiView
            style={style}
            from={{ translateY: height }}
            animate={{ translateY: 0 }}
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
}: AnimViewProps & { direction: 'left' | 'right' }) => {
    const { width } = useWindowDimensions();
    return (
        <MotiView
            style={style}
            from={{ translateX: direction === 'left' ? -width : width }}
            animate={{ translateX: direction === 'right' ? 0 : 0 }}
            transition={{ type: 'spring', mass: 0.5, damping: 10 }}
        >
            {children}
        </MotiView>
    );
};
