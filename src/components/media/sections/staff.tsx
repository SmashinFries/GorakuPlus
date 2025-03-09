import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { ListHeading } from '@/components/text';
import { StaffCard } from '@/components/cards';
import {
	AniMediaQuery_Media_Media_staff_StaffConnection,
	AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge,
} from '@/api/anilist/__genereated__/gql';

type StaffPrevListProps = {
	data: AniMediaQuery_Media_Media_staff_StaffConnection;
	openMore: () => void;
};
export const StaffPrevList = ({ data, openMore }: StaffPrevListProps) => {
	const keyExtractor = useCallback(
		(
			item: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge | null,
			index: number,
		) => index.toString(),
		[],
	);
	const renderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge | null>) =>
		item && item?.node?.id ? (
			<StaffCard {...item.node} role={item.role ?? undefined} isStaff />
		) : null;

	if ((data?.edges?.length ?? 0) < 1) {
		return null;
	}

	return (
		<View>
			<ListHeading title="Staff" icon={'arrow-right'} onIconPress={openMore} />
			<FlatList
				data={data.edges}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				removeClippedSubviews
				// estimatedItemSize={120}
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
