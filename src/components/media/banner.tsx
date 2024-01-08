import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
    SensorType,
    useAnimatedSensor,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

type Props = {
    style?: any;
    url: string;
    allowMotion?: boolean;
};
export const MediaBanner = ({ url, style, allowMotion }: Props) => {
    const { colors } = useTheme();

    const rotation = allowMotion
        ? useAnimatedSensor(SensorType.ROTATION, {
              interval: 20,
          })
        : null;

    const animatedStyle = allowMotion
        ? useAnimatedStyle(() => {
              const { pitch, roll } = rotation?.sensor.value;
              return {
                  transform: [
                      { translateX: withSpring(-roll * 25, { damping: 200 }) },
                      { translateY: withSpring(-pitch * 25, { damping: 200 }) },
                  ],
              };
          })
        : null;

    return (
        <Animated.View style={[style, styles.container]}>
            <Animated.View style={[animatedStyle, { paddingBottom: 10 }]}>
                <Image source={{ uri: url }} style={[styles.img]} contentFit="cover" />

                <LinearGradient
                    style={[styles.container]}
                    locations={[0, 0.9]}
                    colors={['rgba(0,0,0,.2)', colors.background]}
                />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 200,
    },
    img: {
        width: '100%',
        height: '100%',
    },
});
