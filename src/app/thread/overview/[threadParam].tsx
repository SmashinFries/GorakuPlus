import {
	ThreadsOverviewQuery,
	useInfiniteThreadsOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { ThreadOverviewBottomSheet } from '@/components/bottomsheets';
import { FlashListAnim } from '@/components/list';
import { ThreadOverviewItem } from '@/components/thread/items';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

const ThreadsPage = () => {
	const btmSheetRef = useRef<BottomSheetModal>(null);
	const { threadParam: aniId } = useLocalSearchParams<{ threadParam: string }>();
	const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteThreadsOverviewQuery(
		{ id: parseInt(aniId), page: 1, perPage: 50 },
		{
			enabled: !!aniId,
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page?.pageInfo.hasNextPage) {
					return {
						page: lastPage.Page?.pageInfo.currentPage + 1,
					};
				}
			},
		},
	);

	const [selectedThread, setSelectedThread] =
		useState<ThreadsOverviewQuery['Page']['threads'][0]>();

	const onSelect = (id: number) => {
		router.navigate(`/thread/${id}`);
	};

	const onLongSelect = (item: ThreadsOverviewQuery['Page']['threads'][0]) => {
		setSelectedThread(item);
		btmSheetRef.current?.present();
	};

	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<ThreadsOverviewQuery['Page']['threads'][0]>) => (
			<ThreadOverviewItem
				item={item}
				onSelect={() => onSelect(item.id)}
				onLongSelect={() => onLongSelect(item)}
				containerStyle={{ width: '100%', marginBottom: 6 }}
			/>
		),
		[],
	);

	const flatData = data?.pages?.flatMap((val) => val.Page?.threads);

	return (
		<View style={{ width: '100%', height: '100%' }}>
			{/* <FlashList
				data={flatData}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				estimatedItemSize={327}
				contentContainerStyle={{ padding: 15 }}
				numColumns={1}
				onEndReached={() => hasNextPage && fetchNextPage()}
			/> */}
			<FlashListAnim
				data={flatData}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				estimatedItemSize={146}
				contentContainerStyle={{ padding: 15 }}
				numColumns={1}
				onEndReached={() => hasNextPage && fetchNextPage()}
				showScrollToTop
				// scrollToTopTravelDistance={50}
				scrollToTopIconTop={10}
			/>
			<ThreadOverviewBottomSheet ref={btmSheetRef} data={selectedThread} />
		</View>
	);
};

export default ThreadsPage;
