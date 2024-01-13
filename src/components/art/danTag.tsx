import { ScrollView, View } from 'react-native';
import { Button, Chip, MD3Colors, MD3DarkTheme, MD3LightTheme, Portal } from 'react-native-paper';
import { ListHeading } from '../text';
import { copyToClipboard } from '../../utils';
import { useState } from 'react';
import { DanTagDescDialog } from './tagDescription';

type DanbooruTag = {
    tag: string;
    color: string;
    onPress?: (tag: string) => void;
};

export const TagItem = ({ tag, color, onPress }: DanbooruTag) => {
    return (
        <Chip
            compact
            onPress={() => onPress(tag)}
            onLongPress={() => copyToClipboard(tag)}
            textStyle={{ color: MD3DarkTheme.colors.onBackground }}
            style={{ margin: 8, backgroundColor: color }}
        >
            {tag}
        </Chip>
    );
};

type TagSectionProps = {
    tags: string;
    title: string;
    color: string;
    disableWiki?: boolean;
};

export const TagSection = ({ title, tags, color, disableWiki = false }: TagSectionProps) => {
    const [selectedTag, setSelectedTag] = useState<string>('');

    if (!tags) {
        return null;
    }
    return (
        <View>
            <ListHeading title={title} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {tags.split(' ').map((tag, index) => (
                    <TagItem
                        color={color}
                        tag={tag}
                        key={index}
                        onPress={(newTag) => (disableWiki ? null : setSelectedTag(newTag))}
                    />
                ))}
            </ScrollView>
            <Portal>
                <DanTagDescDialog tag={selectedTag} onDimiss={() => setSelectedTag('')} />
            </Portal>
        </View>
    );
};
