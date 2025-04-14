import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useStaffList } from '@/hooks/staff/useStaff';
import { useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { useColumns } from '@/hooks/useColumns';
import { StaffCard, StaffRowCard } from '@/components/cards';
import { StaffListQuery_Media_Media_staff_StaffConnection_edges_StaffEdge } from '@/api/anilist/__genereated__/gql';

const StaffListScreen = () => {
	const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
	const { data, hasNextPage, fetchNextPage, isFetching } = useStaffList(Number(mediaId));
	const { itemWidth, columns, displayMode } = useColumns('search');

	const RenderItem = (
		props: ListRenderItemInfo<StaffListQuery_Media_Media_staff_StaffConnection_edges_StaffEdge>,
	) => {
		return props.item.node?.id ? (
			displayMode === 'COMPACT' ? (
				<View
					style={{
						alignItems: 'center',
						width: itemWidth,
					}}
				>
					<StaffCard {...props.item.node} role={props.item.role ?? undefined} />
				</View>
			) : (
				<StaffRowCard {...props.item.node} role={props.item.role ?? undefined} />
			)
		) : null;
	};

	if (isFetching) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ height: '100%', width: '100%' }}>
			<FlatList
				key={columns}
				numColumns={columns}
				data={
					data?.filter(
						(item): item is NonNullable<typeof item> =>
							item != null && item !== undefined,
					) ?? []
				}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={RenderItem}
				// estimatedItemSize={241}
				// drawDistance={height / 2}
				onEndReached={() => hasNextPage && fetchNextPage()}
			/>
		</View>
	);
};

export default StaffListScreen;
