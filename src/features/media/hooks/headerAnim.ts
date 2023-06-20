import { useRef } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    Extrapolate,
} from 'react-native-reanimated';

export const useHeaderAnim = () => {
    const scrollY = useSharedValue(0);
    // const scrollY = useRef(new Animated.Value(0)).current;
    // const headerOpacity = scrollY.interpolate({
    //     inputRange: [40, 110],
    //     outputRange: [0, 1],
    //     extrapolate: 'clamp',
    // });
    // const animOpacity = interpolate(scrollY.value, [40, 110], [0, 1], {
    //     extrapolateLeft: Extrapolation.CLAMP,
    // });

    const opacity = Animated.interpolateNode(scrollY.value, {
        inputRange: [40, 110],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    return { scrollHandler, scrollY };
};
