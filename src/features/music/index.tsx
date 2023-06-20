import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { RootStackProps } from '../../navigation/types';
import { useGetAnimeSongsQuery } from '../../app/services/animethemes/animeThemesApi';
import { MusicLoading } from './components/loading';
import { Button, Text } from 'react-native-paper';
import { MusicVideoYT } from './components/video';
import { useEffect } from 'react';
import { MusicVideoList } from './components/list';
import { useWindowDimensions } from 'react-native';
import { VideoControls } from './components/controls';
import { useGetAnimeVideosQuery } from '../../app/services/mal/malApi';

const MusicScreen = ({ navigation, route }: NativeStackScreenProps<RootStackProps, 'music'>) => {
    const { animeID } = route.params;
    const { data, isLoading, isError, error } = useGetAnimeVideosQuery({ id: animeID });
    // const { data, isLoading, isError, error } = useGetAnimeSongsQuery(
    //     { aniID: animeID?.toString() },
    //     { skip: !animeID },
    // );
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: !isLoading && 'Music Videos' + ` (${data?.data?.music_videos?.length})`,
            headerTransparent: isLoading,
        });
    }, [isLoading]);

    return isLoading ? (
        <MusicLoading isLoading={isLoading} error={error} />
    ) : (
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <MusicVideoList music={data?.data?.music_videos} />
            {/* <MusicVideo theme={data?.anime[0].animethemes[0]} /> */}
            {/* {data?.data?.music_videos?.length > 0 && (
                <MusicVideoYT music_video={data?.data?.music_videos[0]} />
            )} */}
        </View>
    );
};

export default MusicScreen;
