import { Chip, MD3LightTheme } from 'react-native-paper';
import { MotiView } from 'moti';
import { MediaTag } from '../../../app/services/anilist/generated-anilist';
import { ScrollView, View } from 'react-native';
import { sortTagsRank } from '../../../utils/sort';
import Constants from 'expo-constants';
import { TagDialog } from '../components/dialogs';
import React, { useEffect } from 'react';
import { TransYUpView } from '../../../components/animations';
import { Tag } from '../components/tag';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

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

    const { showNSFW } = useSelector((state: RootState) => state.persistedSettings);

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
