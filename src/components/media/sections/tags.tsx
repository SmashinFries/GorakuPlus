import { Chip } from 'react-native-paper';
import { View } from 'react-native';
import React from 'react';
import { TagDialog } from '../dialogs';
import { Tag } from '../tag';
import { Media, MediaTag } from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ScrollView } from 'react-native-gesture-handler';

type TagViewProps = {
	genres: Media['genres'];
	tags?: Media['tags'];
};
const TagView = ({ genres, tags }: TagViewProps) => {
	const [currentTag, setCurrentTag] = React.useState<MediaTag | null>(tags ? tags[0] : null);
	const [visible, setVisible] = React.useState(false);
	const openTag = (tag: MediaTag) => {
		if (tag?.isAdult && !showNSFW) return;
		setCurrentTag(tag);
		setVisible(true);
	};

	const { showNSFW } = useSettingsStore();

	const closeTag = () => setVisible(false);

	return (
		<View style={{ marginVertical: 15 }}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} fadingEdgeLength={52}>
				{genres?.map((genres, index) => (
					<Chip key={index} style={{ paddingHorizontal: 5, marginHorizontal: 8 }}>
						{genres}
					</Chip>
				))}
				{tags?.map(
					(tag, index) =>
						tag && (
							<Tag key={index} allowAdult={showNSFW} tag={tag} openTag={openTag} />
						),
				)}
			</ScrollView>
			{tags && (
				<TagDialog visible={visible} onDismiss={closeTag} tag={currentTag as MediaTag} />
			)}
		</View>
	);
};

export default TagView;
