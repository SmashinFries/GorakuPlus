import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
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
    additionalUrls?: string[];
    allowMotion?: boolean;
};
export const MediaBanner = ({ url, style, allowMotion, additionalUrls }: Props) => {
    const all_urls = additionalUrls ? [url, ...new Set(additionalUrls)].filter(n => n) : [url];
    const { colors } = useTheme();
    const [image_src_idx, setImageSrcIdx] = useState<number>(0);

    const updateImageSrc = () => {
        setImageSrcIdx(prev => ((prev+1) % all_urls.length));
    };

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

    useEffect(() => {
        if (additionalUrls) {
            const interval = setInterval(() => {
                updateImageSrc();
              }, 8000);
            
            return () => {
                clearInterval(interval);
            };
        }
    },[])

    return (
        <Animated.View style={[style, styles.container]}>
            <Animated.View style={[animatedStyle, { paddingBottom: 10 }]}>
                <Image source={{ uri: all_urls[image_src_idx] }} style={[styles.img]} cachePolicy='memory' transition={2000} contentFit="cover" />

                <LinearGradient
                    style={[styles.container]}
                    locations={[0, 0.85]}
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
