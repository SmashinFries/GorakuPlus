import { MusicVideoList } from '@/components/music/list';
import { MusicLoading } from '@/components/music/loading';
import { useGetAnimeVideosQuery } from '@/store/services/mal/malApi';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';

const MusicPage = () => {
    const { width, height } = useWindowDimensions();
    const { aniId } = useLocalSearchParams<{ aniId: string }>();
    const animeID = parseInt(aniId);
    const { data, isLoading, isError, error } = useGetAnimeVideosQuery({ id: animeID });

    return (
        <View>
            <Stack.Screen
                options={{
                    headerTransparent: isLoading,
                    headerTitle:
                        !isLoading && 'Music Videos' + ` (${data?.data?.music_videos?.length})`,
                }}
            />
            {isLoading ? (
                <MusicLoading isLoading={isLoading} error={error} />
            ) : (
                <MusicVideoList music={data?.data?.music_videos} />
            )}
        </View>
    );
};

export default MusicPage;
