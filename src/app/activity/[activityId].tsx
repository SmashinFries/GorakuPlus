import { ListActivity, useActivityDetailQuery } from '@/api/anilist/__genereated__/gql';
import {
	ListActivityView,
	MessageActivityView,
	TextActivityView,
} from '@/components/activity/item';
import { AnimView } from '@/components/animations';
import { GorakuRefreshControl } from '@/components/explore/lists';
import { FlashListAnim } from '@/components/list';
import { GorakuActivityIndicator } from '@/components/loading';
import { ThreadItem } from '@/components/thread/items';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const ActivityPage = () => {
	const { activityId } = useLocalSearchParams<{ activityId: string }>();
	const { data, isFetching, isRefetching, refetch } = useActivityDetailQuery(
		{ id: activityId && parseInt(activityId) },
		{ enabled: !!activityId, refetchOnMount: true },
	);

	const ActivityView = () => {
		switch (data?.Activity?.__typename) {
			case 'ListActivity':
				return <ListActivityView data={data?.Activity as ListActivity} />;
			case 'MessageActivity':
				return <MessageActivityView data={data?.Activity} />;
			case 'TextActivity':
				return <TextActivityView data={data?.Activity} />;
			default:
				return;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			{isFetching && (
				<AnimView
					style={{
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</AnimView>
			)}
			{!isFetching && (
				<FlashListAnim
					data={data?.Activity?.replies}
					estimatedItemSize={100}
					refreshing={isRefetching}
					onRefresh={refetch}
					refreshControl={
						<GorakuRefreshControl onRefresh={refetch} refreshing={isRefetching} />
					}
					renderItem={({ item }) => (
						<AnimView>
							<ThreadItem {...item} body={item.text} isReply />
						</AnimView>
					)}
					ListHeaderComponent={() => (
						<AnimView>
							<ActivityView />
							<Divider style={{ marginVertical: 10 }} />
							{data?.Activity?.replyCount ? (
								<Text variant="titleLarge" style={{ paddingLeft: 12 }}>
									{data?.Activity?.replyCount}{' '}
									{data?.Activity?.replyCount > 1 ? 'Replies' : 'Reply'}
								</Text>
							) : null}
						</AnimView>
					)}
				/>
			)}
		</View>
	);
};

export default ActivityPage;
