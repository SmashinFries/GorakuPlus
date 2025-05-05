import { Avatar, Portal, Text } from 'react-native-paper';
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ListHeading } from '../text';
import { MediaCard } from '../cards';
import { getTimeUntil } from '@/utils';
import { ConfirmActDelDialog } from './dialogs';
import { router } from 'expo-router';
import {
	ListActivity,
	MainMetaFragment,
	MediaFormat,
	UserActivityQuery,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { useShallow } from 'zustand/react/shallow';
import { LegendList } from '@legendapp/list';

type ActivityItemProps = {
	item: ListActivity;
	userId: number;
	onTrash: (id: number) => void;
};

export const ActivityItem = ({ item, userId }: ActivityItemProps) => {
	const { colors } = useAppTheme();
	const userID = useAuthStore(useShallow((state) => state.anilist.userID));
	return (
		<View style={{ marginHorizontal: 8, overflow: 'visible', paddingVertical: 10 }}>
			<MediaCard
				{...(item.media as MainMetaFragment)}
				activityId={item?.user?.id === userID ? item?.id : undefined}
				followingUsername={item?.user?.id !== userID ? item?.user?.name : undefined}
			/>
			<Text
				variant="labelLarge"
				numberOfLines={2}
				style={{ textTransform: 'capitalize', maxWidth: 200, textAlign: 'center' }}
			>
				{`${item.status}${item.progress ? ` ${item.progress}` : ''}`}
			</Text>
			<Text
				variant="labelMedium"
				style={{
					textTransform: 'capitalize',
					textAlign: 'center',
					color: colors.onSurfaceVariant,
				}}
			>
				{item.media?.format === MediaFormat.Tv
					? 'Anime'
					: item.media?.isLicensed
						? item.media?.format
						: 'Doujin'}{' '}
				· {item.media?.status?.replaceAll('_', ' ') ?? '??'}
			</Text>
			<Text
				variant="labelMedium"
				style={{
					textTransform: 'capitalize',
					textAlign: 'center',
					color: colors.onSurfaceVariant,
				}}
			>
				{getTimeUntil(item.createdAt, 'createdAt')}
			</Text>
			{item.user?.id !== userId && item.user?.id !== userID && (
				<Avatar.Image
					style={{ position: 'absolute', top: 10, left: 5 }}
					source={{ uri: item.user?.avatar?.large ?? '' }}
					size={28}
				/>
			)}
		</View>
	);
};

export const ActivityOverview = ({
	userId,
	username,
	data,
}: {
	userId: number;
	username: string;
	data: NonNullable<UserActivityQuery['Page']>['activities'];
	onDelete?: (id: number) => void;
}) => {
	const { width } = useWindowDimensions();

	const [showActDelConfirm, setShowActDelConfirm] = useState(false);
	const [actDelID, setActDelID] = useState<number | null>(null);

	const onTrash = (id: number) => {
		setActDelID(id);
		setShowActDelConfirm(true);
	};

	if (!data || data?.length < 1) {
		return;
	}

	return (
		<View style={{ width: width, overflow: 'visible', paddingTop: 8 }}>
			<ListHeading
				title="List Activity"
				icon={data?.length > 0 ? 'chevron-right' : undefined}
				onIconPress={() =>
					router.push({
						pathname: `/user/[username]/activity`,
						params: {
							userId: userId,
							username: username,
						},
					})
				}
			/>
			<View style={{ flex: 1, width: width }}>
				<LegendList
					style={{ height: 300 }}
					data={data?.filter(
						(item) => item !== null && item.__typename === 'ListActivity',
					)}
					recycleItems
					renderItem={({ item }) => (
						<ActivityItem
							userId={userId}
							item={item as ListActivity}
							onTrash={onTrash}
						/>
					)}
					keyExtractor={(item, idx) => idx.toString()}
					horizontal
					estimatedItemSize={185}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={
						<Text style={{ textAlign: 'center', width: width }}>No activity yet!</Text>
					}
				/>
			</View>
			<Portal>
				<ConfirmActDelDialog
					visible={showActDelConfirm}
					id={actDelID}
					onDismiss={() => {
						setActDelID(null);
						setShowActDelConfirm(false);
					}}
				/>
			</Portal>
		</View>
	);
};
