import { MotiView } from 'moti';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
    url: string;
};
export const MediaBanner = ({ url }: Props) => {
    const { colors } = useTheme();
    return (
        <MotiView style={[styles.container]}>
            <Image source={{ uri: url }} style={[styles.img]} contentFit="cover" />
            <LinearGradient
                style={[styles.container]}
                colors={['rgba(0,0,0,.2)', colors.background]}
            />
        </MotiView>
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
