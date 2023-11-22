import { MotiView } from 'moti';
import { Animetheme } from '@/store/services/animethemes/types';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type SongMetaProps = {
    data: Animetheme;
};
export const SongMeta = ({ data }: SongMetaProps) => {
    return (
        <MotiView style={[styles.container]}>
            <Text variant="titleLarge">{data?.song.title}</Text>
            <Text>By {data?.song.artists[0]?.name}</Text>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
