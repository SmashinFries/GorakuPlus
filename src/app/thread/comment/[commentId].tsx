import { ThreadComment, useAniListCommentDetailsQuery } from '@/api/anilist/__genereated__/gql';
import PaperHeader from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { ThreadItem } from '@/components/thread/items';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

const ThreadCommentPage = () => {
	const { commentId } = useLocalSearchParams<{ commentId: string }>();
	const { data, isFetching, isFetched } = useAniListCommentDetailsQuery(
		{ id: parseInt(commentId) },
		{ enabled: !!commentId },
	);

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<Stack.Screen
				options={{
					title: 'Comment',
					headerShown: true,
					header: (props) => <PaperHeader {...props} />,
				}}
			/>
			{isFetching && (
				<Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<GorakuActivityIndicator />
				</Animated.View>
			)}
			{isFetched && (
				<Animated.View entering={FadeIn} style={{ width: '100%', height: '100%' }}>
					<FlashList
						data={data?.ThreadComment[0]?.childComments as ThreadComment[]}
						keyExtractor={(_, idx) => idx.toString()}
						renderItem={({ item }) => (
							<ThreadItem
								id={item?.id}
								body={item?.comment}
								createdAt={item?.createdAt}
								likeCount={item?.likeCount}
								user={item?.user}
								isReply={true}
								isMain={false}
								replyCount={item?.childComments?.length ?? 0}
							/>
						)}
						contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
						estimatedItemSize={218}
						ListHeaderComponent={() => (
							<View style={{ marginBottom: 12 }}>
								<ThreadItem
									id={data?.ThreadComment[0]?.id}
									body={data?.ThreadComment[0]?.comment}
									createdAt={data?.ThreadComment[0]?.createdAt}
									likeCount={data?.ThreadComment[0]?.likeCount}
									user={data?.ThreadComment[0]?.user}
									isLiked={data?.ThreadComment[0]?.isLiked}
									isReply={true}
									replyCount={data?.ThreadComment[0]?.childComments?.length}
									isMain
								/>
								<Divider style={{ marginVertical: 10 }} />
								<Text variant="titleLarge">
									{data?.ThreadComment[0]?.childComments?.length}{' '}
									{data?.ThreadComment[0]?.childComments?.length > 1
										? `Replies`
										: `Reply`}
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

export default ThreadCommentPage;
