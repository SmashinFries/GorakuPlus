import { FlashList } from '@shopify/flash-list';
import { Animetheme, MainMusic } from '@/store/services/animethemes/types';
import { View, useWindowDimensions } from 'react-native';
import { MusicItem, MusicVideo, MusicVideoYT } from './video';

type MusicVideoListProps = {
    music: MainMusic;
};
export const MusicVideoList = ({ music }: MusicVideoListProps) => {
    const { width, height } = useWindowDimensions();
    if (music?.anime?.length < 1) return null;
    return (
        <View style={{ flex: 1, width: width }}>
            <FlashList
                data={music?.anime[0]?.animethemes}
                renderItem={(props) => (
                    <MusicItem
                        theme={props.item}
                        anime_slug={music?.anime[0]?.slug}
                        initialOpen={props.index === 0}
                    />
                )}
                keyExtractor={(item, idx) => idx.toString()}
                estimatedItemSize={66}
                numColumns={1}
                contentContainerStyle={{ paddingVertical: 15 }}
            />
        </View>
    );
};
