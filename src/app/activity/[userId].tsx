import { GorakuActivityIndicator } from '@/components/loading';
import { ActivityItem } from '@/components/user/activityItem';
import { ConfirmActDelDialog } from '@/components/user/dialogs';
import { ListActivity, useUserActivityQuery } from '@/store/services/anilist/generated-anilist';
import { useColumns } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Portal, Text } from 'react-native-paper';

const ActivityListPage = () => {
	const { userId } = useLocalSearchParams<{ userId: string }>();
	const [page, setPage] = useState(1);
	const { data, currentData, isFetching, refetch } = useUserActivityQuery(
		{
			userId: userId === 'user' ? undefined : parseInt(userId),
			page: page,
			perPage: 24,
			isFollowing: true,
		},
		{ skip: !userId, refetchOnMountOrArgChange: true },
	);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const [showActDelConfirm, setShowActDelConfirm] = useState(false);
	const [actDelID, setActDelID] = useState<number | null>(null);

	const { columns, listKey } = useColumns(150);

	const onTrash = (id: number) => {
		setActDelID(id);
		setShowActDelConfirm(true);
	};

	const RenderItem = ({ item }: { item: ListActivity }) => {
		return <ActivityItem item={item} onTrash={onTrash} />;
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
	};

	if (isFetching && !data)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);

	return (
		<>
			{/* <Stack.Screen options={{ title: ''}} */}
			<View style={{ flex: 1 }}>
				<FlashList
					key={listKey}
					data={currentData?.Page?.activities}
					renderItem={RenderItem}
					keyExtractor={(item, idx) => idx.toString()}
					numColumns={columns}
					estimatedItemSize={278}
					refreshing={isRefreshing}
					onRefresh={onRefresh}
					onEndReached={() => {
						setPage((prev) => prev + 1);
					}}
				/>
			</View>
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
		</>
	);
};

export default ActivityListPage;
