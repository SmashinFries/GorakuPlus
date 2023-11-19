import { FlashList } from '@shopify/flash-list';
import { Animetheme } from '@/store/services/animethemes/types';
import { View } from 'react-native';
import { MusicVideoYT } from './video';
import { AnimeVideos } from '@/store/services/mal/malApi';

type MusicVideoListProps = {
    music: AnimeVideos['data']['music_videos'];
};
export const MusicVideoList = ({ music }: MusicVideoListProps) => {
    if (music?.length < 1) return null;
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <FlashList
                data={music}
                renderItem={(props) => <MusicVideoYT music_video={props.item} />}
                keyExtractor={(item, idx) => idx.toString()}
                estimatedItemSize={66}
                numColumns={1}
                contentContainerStyle={{ paddingVertical: 15 }}
            />
        </View>
    );
};
