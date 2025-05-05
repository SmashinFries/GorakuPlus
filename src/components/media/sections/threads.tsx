import {
	ThreadsOverviewQuery,
	ThreadsOverviewQuery_Page_Page_threads_Thread,
} from '@/api/anilist/__genereated__/gql';
import { ListHeading } from '@/components/text';
import { ThreadOverviewItem } from '@/components/thread/items';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

type ThreadOverviewProps = {
	aniId: number;
	data: ThreadsOverviewQuery | undefined;
	isFetching: boolean;
};
export const ThreadOverview = ({ aniId, data }: ThreadOverviewProps) => {
	const onSelect = (id: number) => {
		router.navigate(`/thread/${id}`);
	};

	const keyExtractor = useCallback((item: any, index: number) => index.toString(), []);
	const renderItem = ({
		item,
	}: LegendListRenderItemProps<ThreadsOverviewQuery_Page_Page_threads_Thread | null>) => {
		return item ? (
			<ThreadOverviewItem item={item} onSelect={() => item && onSelect(item.id)} />
		) : null;
	};

	if ((data?.Page?.threads?.length ?? 0) < 1) return null;

	return (
		<View style={{ flex: 1 }}>
			<ListHeading
				title="Threads"
				icon={data?.Page?.pageInfo?.hasNextPage ? 'arrow-right' : undefined}
				onIconPress={() => router.navigate(`/thread/overview/${aniId}`)}
			/>
			<LegendList
				style={{ height: 180 }}
				recycleItems
				data={data?.Page?.threads ?? []}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				contentContainerStyle={{ padding: 15 }}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
