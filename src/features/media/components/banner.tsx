import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

type Props = {
    style?: any;
    url: string;
};
export const MediaBanner = ({ url, style }: Props) => {
    const { colors } = useTheme();
    return (
        <Animated.View style={[style, styles.container]}>
            <Image source={{ uri: url }} style={[styles.img]} contentFit="cover" />
            <LinearGradient
                style={[styles.container]}
                colors={['rgba(0,0,0,.2)', colors.background]}
            />
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
