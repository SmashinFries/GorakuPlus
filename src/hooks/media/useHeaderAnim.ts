import { useRef } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    Extrapolate,
} from 'react-native-reanimated';

export const useHeaderAnim = () => {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    return { scrollHandler, scrollY };
};
