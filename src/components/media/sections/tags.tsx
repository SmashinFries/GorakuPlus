import { Chip, MD3LightTheme } from 'react-native-paper';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import { TagDialog } from '../dialogs';
import { Tag } from '../tag';
import { MediaTag } from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ScrollView } from 'react-native-gesture-handler';

type TagViewProps = {
	genres: string[];
	tags?: MediaTag[];
};
const TagView = ({ genres, tags }: TagViewProps) => {
	const [currentTag, setCurrentTag] = React.useState<MediaTag | null>(tags ? tags[0] : null);
	const [visible, setVisible] = React.useState(false);
	const openTag = (tag: MediaTag) => {
		if (tag?.isAdult && !showNSFW) return;
		setCurrentTag(tag);
		setVisible(true);
	};

	const {} = useSettingsStore();
	const { showNSFW } = useSettingsStore();

	const closeTag = () => setVisible(false);

	return (
		<View style={{ marginVertical: 15 }}>
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
