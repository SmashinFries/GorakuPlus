import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { ListHeading } from '@/components/text';
import { StaffCard } from '@/components/cards';
import { AniMediaQuery } from '@/api/anilist/__genereated__/gql';
import { SheetManager } from 'react-native-actions-sheet';

type StaffPrevListProps = {
	data: AniMediaQuery['Media']['staff'];
	openMore: () => void;
};
export const StaffPrevList = ({ data, openMore }: StaffPrevListProps) => {
	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: { item: AniMediaQuery['Media']['staff']['edges'][0] }) => (
			<StaffCard {...item.node} role={item.role} />
		),
		[],
	);

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View>
			<ListHeading title="Staff" icon={'arrow-right'} onIconPress={openMore} />
			<FlashList
				data={data.edges}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				removeClippedSubviews
				estimatedItemSize={120}
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
