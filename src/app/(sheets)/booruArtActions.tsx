import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { saveImage } from '@/utils/images';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { Share } from 'react-native';
import { List } from 'react-native-paper';

export type BooruArtActionParams = {
	id: string;
	file_url: string;
	share_url: string;
	name: string;
};
const BooruArtActionSheet = () => {
	const { id, file_url, name, share_url } = useLocalSearchParams<BooruArtActionParams>();
	const sheet = useRef<TrueSheet>(null);

	const onViewArt = () => {
		router.back();
		router.push(`/art/post/${id}`);
	};

	const shareLink = async () => {
		if (!share_url) return null;
		await Share.share({ url: share_url, message: share_url });
		sheet.current?.dismiss();
	};

	return (
		<GlobalBottomSheetParent sheetRef={sheet} scrollable sizes={['auto']}>
			<List.Item
				title={'View art'}
				left={(props) => <List.Icon {...props} icon="image-outline" />}
				onPress={onViewArt}
			/>
			<List.Item
				title={'Save Image'}
				left={(props) => <List.Icon {...props} icon="download-outline" />}
				onPress={() => saveImage(file_url, name)}
			/>
			<List.Item
				title={'Share'}
				left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
				onPress={shareLink}
			/>
		</GlobalBottomSheetParent>
	);
};

export default BooruArtActionSheet;
