import { Image } from 'expo-image';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { DanbooruRating } from '../../../app/services/danbooru/types';

type PostImageProps = {
    aspectRatio?: number;
    img_url?: string;
    blurAmount?: number;
    style?: any;
};
export const PostImage = ({ style, blurAmount, img_url, aspectRatio }: PostImageProps) => {
    const { width, height } = useWindowDimensions();

    if (!img_url) return null;

    return (
        <Animated.View
            sharedTransitionTag="danImage"
            style={[
                style,
                {
                    position: 'absolute',
                    top: 0,
                    height: aspectRatio ? width / aspectRatio : 0,
                    width: width,
                },
            ]}
        >
            <Image
                blurRadius={blurAmount}
                source={{ uri: img_url }}
                contentFit="contain"
                transition={1000}
                style={{
                    height: aspectRatio ? width / aspectRatio : 0,
                    width: width,
                }}
            />
        </Animated.View>
    );
};
