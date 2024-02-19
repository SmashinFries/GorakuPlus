import { Share, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Divider, IconButton, Text, useTheme } from 'react-native-paper';
import { saveImage } from '../../utils/images';
import { TOAST } from '@/constants/toast';
import * as Burnt from 'burnt';

type InteractionBarProps = {
    url: string;
    share_url: string;
    name: string;
};
export const InteractionBar = ({ url, name, share_url }: InteractionBarProps) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container]}>
            <Divider />
            <View style={[styles.iconsContainer]}>
                <IconButton icon="download-outline" onPress={() => saveImage(url, name)} />
                {/* <IconButton
                    icon="heart-outline"
                    iconColor={colors.onSurfaceVariant}
                    onPress={() => Burnt.toast({ title: 'Coming Soon!', duration: TOAST.SHORT })}
                /> */}
                <IconButton
                    icon="share-variant"
                    onPress={() => Share.share({ url: share_url, message: share_url })}
                />
            </View>
            <Divider />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly',
    },
});
