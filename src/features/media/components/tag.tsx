import { Chip, MD3LightTheme } from 'react-native-paper';
import React from 'react';
import { MediaTag } from '../../../app/services/anilist/generated-anilist';

type TagProps = {
    tag: MediaTag;
    openTag: (tag: MediaTag) => void;
    allowAdult?: boolean;
};
export const Tag = ({ tag, openTag, allowAdult }: TagProps) => {
    if (!tag) return null;
    const isSpoiler = tag?.isGeneralSpoiler || tag?.isMediaSpoiler;
    const [reveal, setReveal] = React.useState(isSpoiler ? false : true);

    const handleTagPress = () => {
        if (isSpoiler) {
            if (reveal) {
                openTag(tag);
            } else {
                setReveal(true);
            }
        } else {
            openTag(tag);
        }
    };

    return (
        <Chip
            onPress={handleTagPress}
            style={[
                {
                    paddingHorizontal: 5,
                    marginHorizontal: 8,
                },
                tag.isAdult && { backgroundColor: '#FF69B4' },
            ]}
            icon={isSpoiler ? 'chili-alert-outline' : undefined}
            textStyle={tag.isAdult && { color: MD3LightTheme.colors.onBackground }}
        >
            {tag.isAdult && !allowAdult ? '✝' : !reveal ? 'Spoiler' : `${tag.name} | ${tag.rank}%`}
        </Chip>
    );
};
