import { ThreadsOverviewQuery } from '@/api/anilist/__genereated__/gql';
import { ThreadOverviewBottomSheet } from '@/components/bottomsheets';
import { ListHeading } from '@/components/text';
import { ThreadOverviewItem } from '@/components/thread/items';
import { useAppTheme } from '@/store/theme/themes';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Avatar, Chip, Icon, Surface, Text } from 'react-native-paper';

type ThreadOverviewProps = {
	aniId: number;
	data: ThreadsOverviewQuery;
	isFetching: boolean;
};
export const ThreadOverview = ({ aniId, data, isFetching }: ThreadOverviewProps) => {
	const btmSheetRef = useRef<BottomSheetModal>(null);
	const [selectedThread, setSelectedThread] =
		useState<ThreadsOverviewQuery['Page']['threads'][0]>();

	const onSelect = (id: number) => {
		router.navigate(`/thread/${id}`);
	};

	const onLongSelect = (item: ThreadsOverviewQuery['Page']['threads'][0]) => {
		setSelectedThread(item);
		btmSheetRef.current?.present();
	};

	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<ThreadsOverviewQuery['Page']['threads'][0]>) => (
			<ThreadOverviewItem
				item={item}
				onSelect={() => onSelect(item.id)}
				onLongSelect={() => onLongSelect(item)}
			/>
		),
		[],
	);
	return (
		<View>
			<ListHeading
				title="Threads"
				icon={data.Page?.pageInfo?.hasNextPage ? 'arrow-right' : undefined}
				onIconPress={() => router.navigate(`/thread/overview/${aniId}`)}
			/>
			<FlashList
				data={data.Page?.threads}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				estimatedItemSize={327}
				contentContainerStyle={{ padding: 15 }}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
			<ThreadOverviewBottomSheet ref={btmSheetRef} data={selectedThread} />
		</View>
	);
};
