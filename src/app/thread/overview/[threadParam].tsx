import {
	ThreadsOverviewQuery,
	useInfiniteThreadsOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { FlashListAnim } from '@/components/list';
import { ThreadOverviewItem } from '@/components/thread/items';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

const ThreadsPage = () => {
	const { threadParam: aniId } = useLocalSearchParams<{ threadParam: string }>();
	const { data, hasNextPage, fetchNextPage } = useInfiniteThreadsOverviewQuery(
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

	const onSelect = (id: number) => {
		router.navigate(`/thread/${id}`);
	};

	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<ThreadsOverviewQuery['Page']['threads'][0]>) => (
			<ThreadOverviewItem
				item={item}
				onSelect={() => onSelect(item.id)}
				containerStyle={{ width: '100%', marginBottom: 6 }}
			/>
		),
		[],
	);

	const flatData = data?.pages?.flatMap((val) => val.Page?.threads);

	return (
		<View style={{ width: '100%', height: '100%' }}>
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
		</View>
	);
};

export default ThreadsPage;
