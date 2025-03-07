import {
	StudioSearchQuery,
	StudioSearchQuery_Page_Page_studios_Studio,
	useToggleFavMutation,
} from '@/api/anilist/__genereated__/gql';
import { MediaCard, MediaCardRow } from '@/components/cards';
import {
	BottomSheetAccordion,
	BottomSheetParent,
	GlobalBottomSheetParent,
} from '@/components/sheets/bottomsheets';
import { useColumns } from '@/hooks/useColumns';
import { useAuthStore } from '@/store/authStore';
import { copyToClipboard } from '@/utils';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Share } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

// StudioSearchQuery['Page']['studios'][0]
export type StudioActionSheetProps = StudioSearchQuery_Page_Page_studios_Studio;
const StudioActionSheet = () => {
	const { params: paramsRaw } = useLocalSearchParams<{ params: string }>();
	const params = JSON.parse(paramsRaw) as StudioActionSheetProps;
	const sheet = useRef<TrueSheet>(null);
	const isAuthed = useAuthStore(useShallow((state) => !!state.anilist.userID));
	const [isFav, setIsFav] = useState(params?.isFavourite);

	const { columns, displayMode, itemWidth } = useColumns('search');

	const { mutateAsync: toggleFav, isPending } = useToggleFavMutation();

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
			{/* {params?.media?.edges && (
				<BottomSheetAccordion title="Preview">
					<Divider />
					<FlatList
						key={columns}
						data={params?.media?.edges}
						numColumns={columns}
						scrollEnabled={false}
						keyExtractor={(item, idx) => idx.toString()}
						renderItem={({ item }) =>
							item?.node ? (
								displayMode === 'COMPACT' ? (
									<View style={{ width: '100%' }}>
										<View
											style={{
												// flex: 1,
												alignItems: 'center',
												justifyContent: 'flex-start',
												// marginVertical: 10,
												// marginHorizontal: 5,
												width: itemWidth,
											}}
										>
											<MediaCard {...item.node} fitToParent />
										</View>
									</View>
								) : (
									<MediaCardRow {...item.node} />
								)
							) : null
						}
					/>
				</BottomSheetAccordion>
			)} */}
		</GlobalBottomSheetParent>
	);
};

export default StudioActionSheet;
