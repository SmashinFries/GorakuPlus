import { Chip, MD3LightTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MediaTag } from '@/store/services/anilist/generated-anilist';
import { useAppSelector } from '@/store/hooks';
import { TagDialog } from '../dialogs';
import { Tag } from '../tag';

type TagViewProps = {
    genres: string[];
    tags?: MediaTag[];
};
const TagView = ({ genres, tags }: TagViewProps) => {
    const [currentTag, setCurrentTag] = React.useState<MediaTag | null>(tags[0] ?? null);
    const [visible, setVisible] = React.useState(false);
    const openTag = (tag: MediaTag) => {
        if (tag.isAdult && !showNSFW) return;
        setCurrentTag(tag);
        setVisible(true);
    };

    const { showNSFW } = useAppSelector((state) => state.persistedSettings);

    const closeTag = () => setVisible(false);

    return (
        <View style={{ marginVertical: 15, paddingHorizontal: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {genres?.map((genres, index) => (
                    <Chip key={index} style={{ paddingHorizontal: 5, marginHorizontal: 8 }}>
                        {genres}
                    </Chip>
                ))}
                {tags?.map((tag, index) => (
                    <Tag key={index} allowAdult={showNSFW} tag={tag} openTag={openTag} />
                ))}
            </ScrollView>
            {tags && <TagDialog visible={visible} onDismiss={closeTag} tag={currentTag} />}
        </View>
    );
};

export default TagView;
