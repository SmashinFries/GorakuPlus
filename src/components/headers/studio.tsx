import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { Share } from 'react-native';
import { Appbar } from 'react-native-paper';

type StudioHeaderProps = NativeStackHeaderProps & {
	isFav: boolean;
	id: number;
};
export const StudioHeader = ({ navigation, options, route, back, id }: StudioHeaderProps) => {
	const shareLink = 'https://anilist.co/studio/' + id;
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action
				icon={'view-module'}
				onPress={() =>
					router.push({
						pathname: '/(sheets)/displayConfig',
						params: { type: 'search' },
					})
				}
			/>
			<Appbar.Action
				icon={'share-variant-outline'}
				onPress={() =>
					Share.share({
						url: shareLink,
						title: shareLink,
						message: shareLink,
					})
				}
			/>
		</Appbar.Header>
	);
};
