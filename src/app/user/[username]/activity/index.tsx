import {
	ListActivity,
	MediaListStatus,
	MediaType,
	MessageActivity,
	TextActivity,
	useInfiniteUserActivityQuery,
	UserActivityQuery,
} from '@/api/anilist/__genereated__/gql';
import {
	ListActivityView,
	MessageActivityView,
	TextActivityView,
} from '@/components/activity/item';
import { ScrollToTopButton } from '@/components/buttons';
import { GorakuActivityIndicator } from '@/components/loading';
import { ThreadItem } from '@/components/thread/items';
import { ConfirmActDelDialog } from '@/components/user/dialogs';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Divider, Portal } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

const ActivityListPage = () => {
	const { userId } = useLocalSearchParams<{ userId: string }>();
	const mediaLanguage = useSettingsStore(useShallow((state) => state.mediaLanguage));
	const { data, isFetching, fetchNextPage, hasNextPage, refetch } = useInfiniteUserActivityQuery(
		{
			userId: userId === 'user' ? undefined : parseInt(userId),
			page: 1,
			perPage: 24,
			isFollowing: true,
		},
		{
			enabled: !!userId,
			refetchOnMount: true,
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page?.pageInfo.hasNextPage) {
					return {
						page: lastPage?.Page?.pageInfo.currentPage + 1,
					};
				}
			},
		},
	);

	const listRef = useRef<FlashList<ListActivity>>(null);
	const [scrollOffset, setScrollOffset] = useState<number>(0);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const [showActDelConfirm, setShowActDelConfirm] = useState(false);
	const [actDelID, setActDelID] = useState<number | null>(null);

	const onTrash = (id: number) => {
		setActDelID(id);
		setShowActDelConfirm(true);
	};

	const RenderItem = ({ item }: { item: UserActivityQuery['Page']['activities'][0] }) => {
		switch (item.__typename) {
			case 'ListActivity':
				return <ListActivityView data={item as ListActivity} isViewerActivity />;
			case 'MessageActivity':
				return <MessageActivityView data={item} isViewerActivity />;
			case 'TextActivity':
				return <TextActivityView data={item} isViewerActivity />;
			default:
				return null;
		}
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
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
			<FlashList
				ref={listRef}
				key={1}
				data={mergedData as any[]}
				renderItem={RenderItem}
				keyExtractor={(item, idx) => idx.toString()}
				numColumns={1}
				estimatedItemSize={278}
				refreshing={isRefreshing}
				onRefresh={onRefresh}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				ItemSeparatorComponent={() => <Divider />}
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
