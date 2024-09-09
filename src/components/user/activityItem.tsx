import {
	ActivityIndicator,
	Avatar,
	Button,
	IconButton,
	Portal,
	Text,
	useTheme,
} from 'react-native-paper';
import { useCallback, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ListHeading } from '../text';
import { FlashList } from '@shopify/flash-list';
import { MediaCard } from '../cards';
import { getTimeUntil } from '@/utils';
import { ConfirmActDelDialog } from './dialogs';
import { router } from 'expo-router';
import {
	ListActivity,
	MediaFormat,
	UserActivityQuery,
	UserOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';

type ActivityItemProps = {
	item: ListActivity;
	id: number;
	onTrash: (id: number) => void;
};

export const ActivityItem = ({ item, id, onTrash }: ActivityItemProps) => {
	const { colors } = useAppTheme();
	const userID = useAuthStore((state) => state.anilist.userID);
	return (
		<View style={{ marginHorizontal: 8, overflow: 'visible', paddingVertical: 10 }}>
			<MediaCard
				titles={item.media?.title}
				coverImg={item.media?.coverImage?.extraLarge}
				imgBgColor={item.media?.coverImage?.color}
				navigate={
					() => router.push(`/${item.media?.type}/${item.media?.id}`)
					// nav.navigate('media', {
					//     aniID: item.media?.id,
					//     malID: item.media?.idMal,
					//     type: item.media.type,
					// })
				}
				scoreDistributions={item.media?.stats?.scoreDistribution}
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
			{item.user?.id === id && item.user?.id === userID && (
				<IconButton
					icon={'trash-can'}
					iconColor={colors.onPrimaryContainer}
					style={{
						position: 'absolute',
						top: -5,
						right: -15,
						backgroundColor: colors.primaryContainer,
					}}
					onPress={() => onTrash(item.id)}
				/>
			)}
			{item.user?.id !== id && item.user?.id !== userID && (
				<Avatar.Image
					style={{ position: 'absolute', top: 0, right: 0 }}
					source={{ uri: item.user?.avatar?.large }}
					size={32}
				/>
			)}
		</View>
	);
};

export const ActivityOverview = ({
	userId,
	data,
	onDelete,
}: {
	userId: number;
	data: UserOverviewQuery['activity']['activities'];
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
		<View style={{ width: width, overflow: 'visible' }}>
			<ListHeading
				title="Activity"
				icon={data?.length > 0 ? 'chevron-right' : undefined}
				onIconPress={data?.length > 0 ? () => router.push('/activity/user') : undefined}
			/>
			<View style={{ width: width }}>
				<FlashList
					// @ts-ignore - not sure how to handle this type :/
					data={data}
					renderItem={({ item }) => (
						<ActivityItem id={userId} item={item as ListActivity} onTrash={onTrash} />
					)}
					keyExtractor={(item) =>
						item.__typename === 'ListActivity' && item.id.toString()
					}
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
