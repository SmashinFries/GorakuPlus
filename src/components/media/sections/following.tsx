import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import { ListHeading } from '../../text';
import { View } from 'react-native';
import { UserCard } from '../../cards';
import { openWebBrowser } from '@/utils/webBrowser';
import { AniMediaQuery } from '@/api/anilist/__genereated__/gql';
import { router } from 'expo-router';

type FollowingPrevListProps = {
	data: AniMediaQuery['Following']['mediaList'];
	onLongSelect: (user: AniMediaQuery['Following']['mediaList'][0]['user']) => void;
};
export const FollowingPrevList = ({ data, onLongSelect }: FollowingPrevListProps) => {
	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: { item: AniMediaQuery['Following']['mediaList'][0] }) => (
			<UserCard
				avatarImg={item.user?.avatar?.large}
				username={item.user?.name}
				status={item.status}
				onPress={() => router.navigate(`/user/${item.user?.id}`)}
				onLongPress={() => onLongSelect(item.user)}
			/>
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
				estimatedItemSize={120}
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export const FollowingPrevListMem = memo(FollowingPrevList);
