import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { useCallback } from 'react';
import { useStaffList } from '@/hooks/staff/useStaff';
import { useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { useColumns } from '@/hooks/useColumns';
import { StaffCard } from '@/components/cards';

const StaffListScreen = () => {
	const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
	const { data, hasNextPage, fetchNextPage, isFetching } = useStaffList(Number(mediaId));
	const { itemWidth, columns } = useColumns('search');
	const { height } = useWindowDimensions();

	const RenderItem = useCallback(
		(props) => (
			<View
				style={{
					alignItems: 'center',
					width: itemWidth,
				}}
			>
				<StaffCard {...props.item.node} role={props.item.role} />
			</View>
		),
		[itemWidth],
	);

	if (isFetching) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ height: '100%', width: '100%' }}>
			<FlashList
				key={columns}
				numColumns={columns}
				data={data}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={RenderItem}
				estimatedItemSize={241}
				drawDistance={height / 2}
				onEndReached={() => hasNextPage && fetchNextPage()}
			/>
		</View>
	);
};

export default StaffListScreen;
