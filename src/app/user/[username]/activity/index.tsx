import {
	ListActivity,
	useInfiniteUserActivityQuery,
	UserActivityQuery,
} from '@/api/anilist/__genereated__/gql';
import {
	ListActivityView,
	MessageActivityView,
	TextActivityView,
} from '@/components/activity/item';
import { ScrollToTopButton } from '@/components/buttons';
import { GorakuRefreshControl } from '@/components/explore/lists';
import { GorakuActivityIndicator } from '@/components/loading';
import { ConfirmActDelDialog } from '@/components/user/dialogs';
import { useAuthStore } from '@/store/authStore';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Divider, Portal } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

const ActivityListPage = () => {
	const { userId } = useLocalSearchParams<{ userId: string }>();
	const { viewerId } = useAuthStore(useShallow((state) => ({ viewerId: state.anilist.userID })));
	const isViewer = useMemo(() => viewerId === Number(userId), [userId, viewerId]);
	// const mediaLanguage = useSettingsStore(useShallow((state) => state.mediaLanguage));
	const { data, isFetching, fetchNextPage, hasNextPage, refetch, isRefetching } =
		useInfiniteUserActivityQuery(
			{
				userId: userId === 'user' || isViewer ? undefined : parseInt(userId),
				page: 1,
				perPage: 24,
				isFollowing: isViewer,
			},
			{
				enabled: !!userId,
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: (lastPage?.Page?.pageInfo?.currentPage ?? 0) + 1,
						};
					}
				},
			},
		);

	const listRef = useRef<FlatList>(null);
	const [scrollOffset, setScrollOffset] = useState<number>(0);

	const [showActDelConfirm, setShowActDelConfirm] = useState(false);
	const [actDelID, setActDelID] = useState<number | null>(null);

	// const onTrash = (id: number) => {
	// 	setActDelID(id);
	// 	setShowActDelConfirm(true);
	// };

	const RenderItem = ({
		item,
	}: {
		item: NonNullable<NonNullable<UserActivityQuery['Page']>['activities']>[0];
	}) => {
		switch (item?.__typename) {
			case 'ListActivity':
				return (
					<ListActivityView
						data={item as ListActivity}
						isViewerActivity={item.user?.id === viewerId}
					/>
				);
			case 'MessageActivity':
				return (
					<MessageActivityView
						data={item}
						isViewerActivity={item.recipientId === viewerId}
					/>
				);
			case 'TextActivity':
				return (
					<TextActivityView data={item} isViewerActivity={item.user?.id === viewerId} />
				);
			default:
				return null;
		}
	};

	const mergedData = data?.pages?.flatMap((page) => page?.Page?.activities);

	if (isFetching && !data)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<FlatList
				ref={listRef}
				key={1}
				data={mergedData as any[]}
				renderItem={RenderItem}
				keyExtractor={(item, idx) => idx.toString()}
				numColumns={1}
				// estimatedItemSize={278}
				refreshControl={
					<GorakuRefreshControl onRefresh={refetch} refreshing={isRefetching} />
				}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: 4,
						}}
					/>
				)}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
			/>
			{scrollOffset > 500 && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
				/>
			)}
			<Portal>
				<ConfirmActDelDialog
					visible={showActDelConfirm}
					id={actDelID}
					onDismiss={() => {
						setActDelID(null);
						setShowActDelConfirm(false);
					}}
				/>
			</Portal>
		</View>
	);
};

export default ActivityListPage;
