import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ListHeading } from '../../text';
import { View } from 'react-native';
import { UserCard } from '../../cards';
import { AniMediaQuery } from '@/api/anilist/__genereated__/gql';

type FollowingPrevListProps = {
	data: AniMediaQuery['Following']['mediaList'];
};
export const FollowingPrevList = ({ data }: FollowingPrevListProps) => {
	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: { item: AniMediaQuery['Following']['mediaList'][0] }) => (
			<UserCard {...item.user} />
		),
		[],
	);

	if (data?.length < 1) {
		return null;
	}

	return (
		<View>
			<ListHeading title="Following" />
			<FlashList
				data={data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				removeClippedSubviews
				contentContainerStyle={{ padding: 15 }}
				estimatedItemSize={125}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
