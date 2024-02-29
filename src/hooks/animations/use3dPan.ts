import { ImageStyle } from "expo-image";
import { Gesture } from "react-native-gesture-handler";
import { clamp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Use3dPanConfig = {
    xLimit: [number, number];
    yLimit: [number, number];
}

const animConfig: Use3dPanConfig = {
    xLimit: [-45, 45],
    yLimit: [-80, 80]
}

const use3dPan = (config = animConfig) => {
    const xRotation = useSharedValue(0);
    const yRotation = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            yRotation.value = clamp(e.translationX * 1, config.yLimit[0], config.yLimit[1]);
            xRotation.value = clamp(e.translationY * -1, config.xLimit[0], config.xLimit[1]);
        })
        .onEnd((e) => {
            yRotation.value = withTiming(0, { duration: 1000 });
            xRotation.value = withTiming(0, { duration: 1000 });
        });

    const animatedStyle = useAnimatedStyle<ImageStyle>(() => ({
        transform: [{ perspective: 500 }, { rotateX: `${xRotation.value}deg` }, { rotateY: `${yRotation.value}deg` }],
    }));

    return { panGesture, animatedStyle };
};

export default use3dPan;