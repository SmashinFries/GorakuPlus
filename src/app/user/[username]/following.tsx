import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import {
	useInfiniteUserFollowingQuery,
	UserFollowersQuery_Page_Page_followers_User,
} from '@/api/anilist/__genereated__/gql';
import { UserCard, UserRowCard } from '@/components/cards';
import { useColumns } from '@/hooks/useColumns';

const FollowingListPage = () => {
	const { userId } = useLocalSearchParams<{ userId: string }>();
	const id = Number(userId);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteUserFollowingQuery(
			{ userId: id },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage?.Page?.pageInfo?.hasNextPage) {
						return {
							page: (lastPage?.Page?.pageInfo?.currentPage ?? 0) + 1,
						};
					}
				},
			},
		);
	const { height } = useWindowDimensions();
	const { columns, displayMode, itemWidth } = useColumns('search');

	const RenderItem = (props: ListRenderItemInfo<UserFollowersQuery_Page_Page_followers_User>) =>
		props.item?.id ? (
			displayMode === 'COMPACT' ? (
				<View
					style={{
						alignItems: 'center',
						width: itemWidth,
					}}
				>
					<UserCard {...props.item} />
				</View>
			) : (
				<UserRowCard {...props.item} />
			)
		) : null;

	if (isLoading) {
		return (
			<View
				style={{
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<GorakuActivityIndicator />
			</View>
		);
	}

	const flatData = data?.pages?.flatMap((page) => page.Page?.following);

	return (
		<View style={{ height: '100%', width: '100%' }}>
			<FlashList
				numColumns={columns}
				key={columns}
				data={flatData?.filter((item) => item != null)}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={RenderItem}
				ListFooterComponent={() =>
					isFetching && (
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<GorakuActivityIndicator />
						</View>
					)
				}
				drawDistance={height / 2}
				estimatedItemSize={241}
				onEndReached={() => hasNextPage && fetchNextPage()}
			/>
		</View>
	);
};

export default FollowingListPage;
