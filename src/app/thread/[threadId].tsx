import {
	ThreadCategory,
	ThreadComment,
	ThreadDetailQuery,
	useAniListCommentsQuery,
	useInfiniteAniListCommentsQuery,
	useThreadDetailQuery,
} from '@/api/anilist/__genereated__/gql';
import PaperHeader from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { MarkdownViewer } from '@/components/markdown';
import { ThreadItem } from '@/components/thread/items';
import { useAppTheme } from '@/store/theme/themes';
import { getTimeUntil } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import {
	Avatar,
	Badge,
	Button,
	Chip,
	Divider,
	Icon,
	IconButton,
	Surface,
	Text,
} from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

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
				if (lastPage.Page?.pageInfo.hasNextPage) {
					return {
						page: lastPage.Page?.pageInfo.currentPage + 1,
					};
				}
			},
			refetchOnMount: false,
		},
	);

	const flatCommentsData = threadCommentsQuery?.data?.pages.flatMap(
		(data) => data?.Page?.threadComments,
	);

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<Stack.Screen
				options={{
					title: 'Thread',
					headerShown: true,
					header: (props) => <PaperHeader {...props} />,
				}}
			/>
			{threadDetailQuery.isFetching ||
				(threadCommentsQuery.isFetching && (
					<Animated.View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
						<GorakuActivityIndicator />
					</Animated.View>
				))}
			{threadDetailQuery.isFetched && threadCommentsQuery.isFetched && (
				<Animated.View entering={FadeIn} style={{ width: '100%', height: '100%' }}>
					<FlashList
						data={flatCommentsData}
						keyExtractor={(item, idx) => item.id.toString()}
						renderItem={({ item }) => (
							<ThreadItem
								id={item?.id}
								body={item?.htmlComment}
								createdAt={item?.createdAt}
								likeCount={item?.likeCount}
								user={item?.user}
								isReply={true}
								replyCount={item?.childComments?.length}
							/>
						)}
						contentContainerStyle={{ paddingVertical: 12 }}
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
								<ThreadItem
									id={threadDetailQuery?.data?.Thread?.id}
									body={threadDetailQuery?.data?.Thread?.htmlBody}
									createdAt={threadDetailQuery?.data?.Thread?.createdAt}
									likeCount={threadDetailQuery?.data?.Thread?.likeCount}
									categories={threadDetailQuery?.data?.Thread?.categories}
									user={threadDetailQuery?.data?.Thread?.user}
									viewCount={threadDetailQuery?.data?.Thread?.viewCount}
									isLiked={threadDetailQuery?.data?.Thread?.isLiked}
									isSubscribed={threadDetailQuery?.data?.Thread?.isSubscribed}
									isReply={false}
								/>
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
				</Animated.View>
			)}
		</View>
	);
};

export default ThreadPage;
