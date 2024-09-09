import { DanArtistCommentary } from '@/api/danbooru/types';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';

type CommentaryProps = {
	data: DanArtistCommentary;
};
export const Commentary = ({ data }: CommentaryProps) => {
	if (!data[0]?.original_description) {
		return null;
	}
	return (
		<View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
			<Text selectable>
				{data[0]?.original_description}
				{data[0]?.translated_description ? '\n' : null}
			</Text>
			{data[0].translated_description ? (
				<Text selectable>{data[0].translated_description}</Text>
			) : null}
		</View>
	);
};
