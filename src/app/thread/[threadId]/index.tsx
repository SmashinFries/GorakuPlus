import {
	useInfiniteAniListCommentsQuery,
	useThreadDetailQuery,
} from '@/api/anilist/__genereated__/gql';
import { AnimViewMem } from '@/components/animations';
import { GorakuActivityIndicator } from '@/components/loading';
import { ThreadItem } from '@/components/thread/items';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const ThreadPage = () => {
	const { threadId } = useLocalSearchParams<{ threadId: string }>();
	const threadDetailQuery = useThreadDetailQuery(
		{ id: parseInt(threadId) },
		{ refetchOnMount: false },
	);
	const threadCommentsQuery = useInfiniteAniListCommentsQuery(
		{ threadId: parseInt(threadId), page: 1 },
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

	const flatCommentsData = threadCommentsQuery?.data?.pages.flatMap(
		(data) => data?.Page?.threadComments,
	);

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					title: 'Thread',
					headerShown: true,
				}}
			/>
			{(threadDetailQuery.isFetching || threadCommentsQuery.isFetching) &&
				!threadCommentsQuery.isFetchingNextPage && (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<GorakuActivityIndicator />
					</View>
				)}
			{!threadDetailQuery.isFetching && !threadCommentsQuery.isFetching && (
				<AnimViewMem style={{ width: '100%', height: '100%' }}>
					<FlashList
						data={flatCommentsData}
						keyExtractor={(item, idx) => idx.toString()}
						renderItem={({ item }) =>
							!item?.threadId ? null : (
								<ThreadItem
									threadId={item?.threadId}
									commentId={item?.id}
									body={item?.htmlComment}
									createdAt={item?.createdAt}
									likeCount={item?.likeCount}
									user={item?.user}
									isReply={true}
									replies={item?.childComments}
								/>
							)
						}
						contentContainerStyle={{ paddingVertical: 12, paddingBottom: 42 }}
						estimatedItemSize={218}
						onEndReached={() =>
							threadCommentsQuery.hasNextPage && threadCommentsQuery?.fetchNextPage()
						}
						ListHeaderComponent={() => (
							<View style={{ marginBottom: 12 }}>
								<Text
									variant="titleLarge"
									style={{
										textAlign: 'center',
										paddingBottom: 12,
										paddingHorizontal: 12,
									}}
								>
									{threadDetailQuery?.data?.Thread?.title}
								</Text>
								{threadDetailQuery?.data?.Thread?.id && (
									<ThreadItem
										threadId={threadDetailQuery?.data?.Thread?.id}
										body={threadDetailQuery?.data?.Thread?.htmlBody}
										createdAt={threadDetailQuery?.data?.Thread?.createdAt}
										likeCount={threadDetailQuery?.data?.Thread?.likeCount}
										categories={threadDetailQuery?.data?.Thread?.categories}
										user={threadDetailQuery?.data?.Thread?.user}
										viewCount={threadDetailQuery?.data?.Thread?.viewCount ?? 0}
										isLiked={threadDetailQuery?.data?.Thread?.isLiked}
										isSubscribed={threadDetailQuery?.data?.Thread?.isSubscribed}
										isReply={false}
									/>
								)}
								<Divider style={{ marginVertical: 10 }} />
								<Text variant="titleLarge" style={{ paddingLeft: 12 }}>
									{threadDetailQuery?.data?.Thread?.replyCount} Replies
								</Text>
							</View>
						)}
					/>
					{/* <ThreadItem
							id={threadCommentsQuery?.data?.Page?.threadComments[0]?.id}
							body={threadCommentsQuery?.data?.Page?.threadComments[0]?.comment}
							createdAt={
								threadCommentsQuery?.data?.Page?.threadComments[0]?.createdAt
							}
							likeCount={
								threadCommentsQuery?.data?.Page?.threadComments[0]?.likeCount
							}
							user={threadCommentsQuery?.data?.Page?.threadComments[0]?.user}
						/> */}
				</AnimViewMem>
			)}
		</View>
	);
};

export default ThreadPage;
