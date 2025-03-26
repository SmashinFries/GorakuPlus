import {
	StudioSearchQuery_Page_Page_studios_Studio,
	useToggleFavMutation,
} from '@/api/anilist/__genereated__/gql';
import { useToggleFavInvalidateMutation } from '@/api/anilist/extended';
import { ToggleFavMetaData } from '@/api/anilist/queryUpdates';
import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useAuthStore } from '@/store/authStore';
import { copyToClipboard } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Share } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

// StudioSearchQuery['Page']['studios'][0]
export type StudioActionSheetProps = StudioSearchQuery_Page_Page_studios_Studio;
const StudioActionSheet = () => {
	const { params: paramsRaw } = useLocalSearchParams<{ params: string }>();
	const params = JSON.parse(paramsRaw) as StudioActionSheetProps;
	const isAuthed = useAuthStore(useShallow((state) => !!state.anilist.userID));
	const [isFav, setIsFav] = useState(params?.isFavourite);

	const { mutateAsync: toggleFav, isPending } = useToggleFavInvalidateMutation({
		meta: { id: params?.id, type: 'studios' } as ToggleFavMetaData,
	});

	const viewStudio = () => {
		router.back();
		router.navigate(`/studio/${params?.id}`);
	};

	const onFavorite = async () => {
		const result = await toggleFav({ studioId: params?.id });
		setIsFav(!!result.ToggleFavourite?.studios?.edges?.[0]?.node?.isFavourite);
	};

	const shareLink = async () => {
		params.siteUrl && (await Share.share({ url: params?.siteUrl, message: params?.siteUrl }));
	};

	return (
		<GlobalBottomSheetParent scrollable sizes={['auto', 'large']}>
			<View>
				{isAuthed && (
					<List.Item
						title={
							isPending
								? () => <ActivityIndicator />
								: isFav
									? 'Unfavorite'
									: 'Favorite'
						}
						onPress={onFavorite}
						left={(props) => (
							<List.Icon {...props} icon={isFav ? 'heart' : 'heart-outline'} />
						)}
					/>
				)}
				<List.Item
					title={`View ${params?.name}`}
					onPress={viewStudio}
					left={(props) => <List.Icon {...props} icon={'office-building-outline'} />}
				/>
				<List.Item
					title={'Share'}
					left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
					onPress={shareLink}
				/>
				<List.Item
					title={'Copy to Clipboard'}
					left={(props) => <List.Icon {...props} icon="content-copy" />}
					onPress={() => copyToClipboard(params?.name)}
				/>
			</View>
		</GlobalBottomSheetParent>
	);
};

export default StudioActionSheet;
