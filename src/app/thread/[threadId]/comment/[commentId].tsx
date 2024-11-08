import { ThreadComment, useAniListCommentDetailsQuery } from '@/api/anilist/__genereated__/gql';
import PaperHeader from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { ThreadItem } from '@/components/thread/items';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

const findComment = (childComments: ThreadComment[], commentId: number) => {
	let result: ThreadComment = null;
	childComments?.some(
		(child) =>
			(child.id === commentId && (result = child)) ||
			(result = findComment(child.childComments || [], commentId)),
	);
	return result;
};

const ThreadCommentPage = () => {
	const { commentId } = useLocalSearchParams<{
		commentId: string;
	}>();
	const { data, isFetching, isFetched } = useAniListCommentDetailsQuery(
		{ id: parseInt(commentId) },
		{ enabled: !!commentId },
	);

	const commentData = data?.ThreadComment
		? findComment(data?.ThreadComment, parseInt(commentId))
		: null;

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
						data={commentData?.childComments as ThreadComment[]}
						keyExtractor={(_, idx) => idx.toString()}
						renderItem={({ item }) => (
							<ThreadItem
								threadId={item?.threadId}
								commentId={item?.id}
								body={item?.comment}
								createdAt={item?.createdAt}
								likeCount={item?.likeCount}
								user={item?.user}
								isReply={true}
								isMain={false}
								replies={item?.childComments}
							/>
						)}
						contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
						estimatedItemSize={218}
						ListHeaderComponent={() => (
							<View style={{ marginBottom: 12 }}>
								<ThreadItem
									threadId={commentData?.id}
									body={commentData?.comment}
									createdAt={commentData?.createdAt}
									likeCount={commentData?.likeCount}
									user={commentData?.user}
									isLiked={commentData?.isLiked}
									isReply={true}
									replies={commentData?.childComments}
									isMain
								/>
								<Divider style={{ marginVertical: 10 }} />
								<Text variant="titleLarge">
									{commentData?.childComments?.length}{' '}
									{commentData?.childComments?.length > 1 ? `Replies` : `Reply`}
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
