import { Animetheme } from '@/api/animethemes/types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type SongMetaProps = {
	data: Animetheme;
};
export const SongMeta = ({ data }: SongMetaProps) => {
	return (
		<View style={[styles.container]}>
			<Text variant="titleLarge">{data?.song.title}</Text>
			<Text>By {data?.song.artists[0]?.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
