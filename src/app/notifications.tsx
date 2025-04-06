import {
	GetNotificationsQuery_Page_Page_notifications,
	useInfiniteGetNotificationsQuery,
} from '@/api/anilist/__genereated__/gql';
import { GorakuActivityIndicator } from '@/components/loading';
import { NotifItem } from '@/components/notifications/item';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { router } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';

const NotificationPage = () => {
	const { width } = useWindowDimensions();
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteGetNotificationsQuery(
			{
				amount: 50,
				page: 1,
				reset: true,
			},
			{
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

	const RenderItem = ({
		item,
	}: ListRenderItemInfo<GetNotificationsQuery_Page_Page_notifications | null | undefined>) => {
		if (!item) return null;
		return (
			<NotifItem
				item={item}
				// @ts-ignore
				onNav={() => router.push(`/${item?.media?.type?.toLowerCase()}/${item?.media.id}`)}
			/>
		);
	};

	const mergedData = data?.pages?.flatMap((page) => page.Page?.notifications);

	return (
		<View style={{ width: width, height: '100%' }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			{mergedData && (
				<FlashList
					data={mergedData}
					renderItem={RenderItem}
					keyExtractor={(item, idx) => idx.toString()}
					estimatedItemSize={20}
					contentContainerStyle={{ paddingVertical: 10 }}
					onEndReached={() => hasNextPage && fetchNextPage()}
				/>
			)}
		</View>
	);
};

export default NotificationPage;
