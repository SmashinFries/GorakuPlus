import { Chip, Icon, MD3LightTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { MediaTag } from '@/api/anilist/__genereated__/gql';

type TagProps = {
	tag: MediaTag;
	openTag: (tag: MediaTag) => void;
	allowAdult?: boolean;
};
export const Tag = ({ tag, openTag, allowAdult }: TagProps) => {
	const isSpoiler = tag?.isGeneralSpoiler || tag?.isMediaSpoiler;
	const [reveal, setReveal] = useState(isSpoiler ? false : true);

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

	if (!tag) return null;

	return (
		<Chip
			onPress={handleTagPress}
			mode="outlined"
			style={[
				{
					paddingHorizontal: 5,
					marginHorizontal: 8,
				},
				tag.isAdult && { backgroundColor: '#FF69B4' },
			]}
			icon={(props) =>
				isSpoiler && (
					<Icon
						{...props}
						source={'chili-alert-outline'}
						color={reveal && tag.isAdult ? '#000' : props.color}
					/>
				)
			}
			textStyle={tag.isAdult && { color: MD3LightTheme.colors.onBackground }}
		>
			{tag.isAdult && !allowAdult ? '✝' : !reveal ? 'Spoiler' : `${tag.name} | ${tag.rank}%`}
		</Chip>
	);
};
