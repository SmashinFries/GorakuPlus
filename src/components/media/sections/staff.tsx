import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { ListHeading } from '@/components/text';
import { StaffCard } from '@/components/cards';
import {
	AniMediaQuery,
	CharacterMetaDataFragment,
	StaffMetaDataFragment,
} from '@/api/anilist/__genereated__/gql';

type StaffPrevListProps = {
	data: AniMediaQuery['Media']['staff'];
	onLongSelect: (
		type: 'character' | 'staff',
		character: CharacterMetaDataFragment | StaffMetaDataFragment,
	) => void;
	openMore: () => void;
};
export const StaffPrevList = ({ data, openMore, onLongSelect }: StaffPrevListProps) => {
	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: { item: AniMediaQuery['Media']['staff']['edges'][0] }) => (
			<StaffCard
				imgUrl={item.node.image?.large}
				name={item.node.name.full}
				nativeName={item.node.name.native}
				role={item.role}
				isFavourite={item.node.isFavourite}
				onPress={() => router.push(`/staff/${item.node.id}`)}
				onLongSelect={() => onLongSelect('staff', item.node)}
			/>
		),
		[],
	);

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View>
			<ListHeading
				title="Staff"
				icon={data.pageInfo.hasNextPage ? 'arrow-right' : undefined}
				onIconPress={openMore}
			/>
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
			{/* <FlashList
                data={data.edges}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                estimatedItemSize={120}
                contentContainerStyle={{ padding: 15 }}
                showsHorizontalScrollIndicator={false}
            /> */}
		</View>
	);
};

export const StaffPrevListMem = memo(StaffPrevList);
