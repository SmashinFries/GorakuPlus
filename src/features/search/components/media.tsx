import { MotiView, View } from 'moti';
import {
    ExploreMediaQuery,
    Media,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';
import { MediaItem, MediaItemMem, RenderMediaItem } from '../../explore/components/media';
import { memo } from 'react';

export const RenderSearchItem = ({
    item,
    index,
    onNav,
}: {
    item: any;
    index: number;
    onNav: (aniID: number, malID: number, type: MediaType) => void;
}) => {
    return (
        // <MotiView
        //     style={{ width: '100%', alignItems: 'center', marginVertical: 12 }}
        //     animateInitialState
        //     from={{ scale: 0 }}
        //     animate={{ scale: 1 }}
        // >
        //     <MediaItemMem item={item} disabled={false} navigate={onNav} />
        // </MotiView>
        <View style={{ marginVertical: 12 }}>
            <RenderMediaItem item={item} index={index} navigate={onNav} delay={false} />
        </View>
    );
};

export const RenderSearchItemMem = memo(RenderSearchItem);
