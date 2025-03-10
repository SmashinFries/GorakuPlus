import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { openWebBrowser } from '../../utils/webBrowser';
import { useAppTheme } from '@/store/theme/themes';

const PIX_IV_URL = 'https://www.pixiv.net/en/artworks/';

type ArtistBarProps = {
	artist_name?: string;
	pixiv_id?: number;
	source?: string;
};
export const ArtistBar = ({ artist_name, pixiv_id, source }: ArtistBarProps) => {
	const [totalHeight, setTotalHeight] = useState<number>(0);
	const { colors } = useAppTheme();
	const source_link = pixiv_id ? `${PIX_IV_URL}${pixiv_id}` : source;
	return (
		<Pressable onPress={() => openWebBrowser(source_link)} style={[styles.container]}>
			{artist_name ? (
				<Avatar.Text
					size={totalHeight}
					labelStyle={{ textTransform: 'capitalize' }}
					label={artist_name?.at(0)}
				/>
			) : (
				<Avatar.Icon icon={'close'} size={totalHeight} />
			)}
			<View
				onLayout={(e) => setTotalHeight(e.nativeEvent.layout.height)}
				style={[styles.textBody]}
			>
				<Text variant="titleMedium">
					{artist_name?.length > 0 ? artist_name : 'No Artist'}
				</Text>
				<Text
					numberOfLines={1}
					style={{ color: colors.onSurfaceVariant }}
					variant="titleSmall"
				>
					{source_link?.length > 1 ? source_link : 'No source 🥲'}
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: 'row',
		marginVertical: 20,
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	textBody: {
		marginHorizontal: 10,
	},
});
