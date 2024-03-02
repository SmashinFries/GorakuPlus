import { NotifItem } from '@/components/notifications/item';
import {
	GetNotificationsQuery,
	useGetNotificationsQuery,
} from '@/store/services/anilist/generated-anilist';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

const NotificationPage = () => {
	const [page, setPage] = useState(1);
	const { width, height } = useWindowDimensions();
	const { data, isFetching, isLoading, isUninitialized } = useGetNotificationsQuery({
		amount: 50,
		page: page,
		reset: true,
	});

	const RenderItem = ({ item }: { item: GetNotificationsQuery['Page']['notifications'][0] }) => {
		return (
			<NotifItem
				item={item}
				onNav={() => router.push(`/${item?.media.type}/${item?.media.id}`)}
			/>
		);
	};

	return (
		<View style={{ width: width, height: height }}>
			{data?.Page && (
				<FlashList
					data={data.Page.notifications}
					renderItem={RenderItem}
					keyExtractor={(item, idx) => item.id.toString()}
					estimatedItemSize={20}
					contentContainerStyle={{ paddingVertical: 10 }}
				/>
			)}
		</View>
	);
};

export default NotificationPage;
