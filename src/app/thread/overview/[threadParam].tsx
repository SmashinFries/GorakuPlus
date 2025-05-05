import {
	ThreadsOverviewQuery_Page_Page_threads_Thread,
	useInfiniteThreadsOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { AnimViewMem } from '@/components/animations';
import { FlashListAnim } from '@/components/list';
import { GorakuActivityIndicator } from '@/components/loading';
import { ThreadOverviewItem } from '@/components/thread/items';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

const ThreadsPage = () => {
	const { threadParam: aniId } = useLocalSearchParams<{ threadParam: string }>();
	const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteThreadsOverviewQuery(
		{ id: parseInt(aniId), page: 1, perPage: 50 },
		{
			enabled: !!aniId,
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage.Page?.pageInfo?.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);

	const onSelect = (id: number) => {
		router.navigate(`/thread/${id}`);
	};

	const keyExtractor = useCallback((item: any, index: number) => index.toString(), []);
	const renderItem = ({
		item,
	}: ListRenderItemInfo<ThreadsOverviewQuery_Page_Page_threads_Thread | null | undefined>) => {
		return item ? (
			<AnimViewMem style={{ marginVertical: 8 }}>
				<ThreadOverviewItem
					item={item}
					onSelect={() => onSelect(item.id)}
					containerStyle={{ width: '100%', marginBottom: 6 }}
				/>
			</AnimViewMem>
		) : null;
	};

	const flatData = data?.pages?.flatMap((val) => val.Page?.threads);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<FlashListAnim
				data={flatData ?? []}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				estimatedItemSize={146}
				contentContainerStyle={{ padding: 10 }}
				numColumns={1}
				onEndReached={() => hasNextPage && fetchNextPage()}
				showScrollToTop
				scrollToTopTravelDistance={50}
				scrollToTopIconTop={10}
			/>
		</View>
	);
};

export default ThreadsPage;
