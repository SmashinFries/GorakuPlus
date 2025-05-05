import { useCallback } from 'react';
import { UserCard } from '../../cards';
import { AniMediaQuery_Following_Page_mediaList_MediaList } from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { AccordionMemo } from '@/components/animations';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';

type FollowingPrevListProps = {
	data: AniMediaQuery_Following_Page_mediaList_MediaList[];
};
export const FollowingPrevList = ({ data }: FollowingPrevListProps) => {
	const userID = useAuthStore((state) => state.anilist?.userID);
	const keyExtractor = useCallback(
		(item: AniMediaQuery_Following_Page_mediaList_MediaList, index: number) => index.toString(),
		[],
	);
	const renderItem = ({
		item,
	}: LegendListRenderItemProps<AniMediaQuery_Following_Page_mediaList_MediaList>) =>
		userID !== item.user?.id && item.user?.id ? (
			<UserCard
				status={item.status ?? undefined}
				progress={item.progress ?? undefined}
				{...item.user}
				isFollowing={false}
				isFollower={false}
			/>
		) : null;

	if ((data?.length ?? 0) < 1) {
		return null;
	}

	return (
		<AccordionMemo title="Following">
			<LegendList
				style={{ height: 150 }}
				data={data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				recycleItems
				contentContainerStyle={{ padding: 15 }}
				// estimatedItemSize={125}
				showsHorizontalScrollIndicator={false}
			/>
		</AccordionMemo>
	);
};
