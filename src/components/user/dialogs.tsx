import { Dialog, Text, Button, Searchbar, ActivityIndicator } from 'react-native-paper';
import { BasicDialogProps } from '../../types';
import { useCallback, useState } from 'react';
import { UserCard } from '../cards';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import {
	UserDataQuery,
	UserSearchQuery,
	useToggleFollowMutation,
	useUserSearchQuery,
} from '@/api/anilist/__genereated__/gql';
import useDebounce from '@/hooks/useDebounce';
import { useAppTheme } from '@/store/theme/themes';
import { useDeleteActivityItemInvalidateMutation } from '@/api/anilist/extended';
import { router } from 'expo-router';

type StatDialogProps = BasicDialogProps & {
	animeStats: NonNullable<NonNullable<UserDataQuery['User']>['statistics']>['anime'];
	mangaStats: NonNullable<NonNullable<UserDataQuery['User']>['statistics']>['manga'];
};
export const StatDialog = ({ animeStats, mangaStats, visible, onDismiss }: StatDialogProps) => {
	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Statistics</Dialog.Title>
			<Dialog.Content>
				<Text variant="titleMedium">Anime</Text>
				<Text>Minutes Watched: {animeStats?.minutesWatched}</Text>
				<Text>Episodes Watched: {animeStats?.episodesWatched}</Text>
				<Text>Manga</Text>
				<Text>Chapters Read: {mangaStats?.chaptersRead}</Text>
				<Text>Volumes Read: {mangaStats?.volumesRead}</Text>
			</Dialog.Content>
		</Dialog>
	);
};

type AddFriendDialogProps = BasicDialogProps;
export const AddFriendDialog = ({ visible, onDismiss }: AddFriendDialogProps) => {
	const { colors } = useAppTheme();
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 600) as string;
	const { data, isFetching } = useUserSearchQuery(
		{ search: debouncedQuery },
		{ enabled: !!debouncedQuery },
	);
	const { mutateAsync: toggleFollow } = useToggleFollowMutation();
	const [selectedUser, setSelectedUser] = useState<
		NonNullable<NonNullable<UserSearchQuery['Page']>['users']>[0] | null
	>();
	const [isFollowLoading, setIsFollowLoading] = useState(false);

	const onFollowToggle = useCallback(async (id: number) => {
		setIsFollowLoading(true);
		const response = await toggleFollow({ userId: id });
		setSelectedUser((prev) =>
			prev ? { ...prev, isFollowing: response.ToggleFollow?.isFollowing } : null,
		);
		// setResults((prev) =>
		// 	prev.map((user) =>
		// 		user.id === selectedUser?.id
		// 			? { ...user, isFollowing: response.ToggleFollow?.isFollowing }
		// 			: user,
		// 	),
		// );
		setIsFollowLoading(false);
	}, []);

	const keyExtractor = useCallback(
		(item: NonNullable<NonNullable<UserSearchQuery['Page']>['users']>[0], idx: number) =>
			idx.toString(),
		[],
	);

	const RenderItem = ({
		item,
	}: {
		item: NonNullable<NonNullable<UserSearchQuery['Page']>['users']>[0];
	}) => {
		return item?.id ? (
			<View
				style={{
					// flex: 1,
					width: '50%',
					borderRadius: 8,
					borderWidth: 2,
					borderColor: selectedUser?.id === item?.id ? colors.primary : 'transparent',
				}}
			>
				<UserCard
					{...item}
					size={100}
					isFollowing={!!item?.isFollowing}
					onPress={() => setSelectedUser(item)}
					// onLongPress={() => openUserQuickSheet(item)}
				/>
			</View>
		) : null;
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>Find User</Dialog.Title>
			<Dialog.Content>
				<Searchbar
					elevation={1}
					value={query}
					onChangeText={(txt) => setQuery(txt)}
					loading={isFetching}
				/>
			</Dialog.Content>
			<Dialog.ScrollArea>
				<FlatList
					key={1}
					numColumns={2}
					data={data?.Page?.users ?? []}
					renderItem={RenderItem}
					keyExtractor={keyExtractor}
					columnWrapperStyle={{ justifyContent: 'space-evenly' }}
					removeClippedSubviews
					showsVerticalScrollIndicator={false}
					// centerContent
				/>
			</Dialog.ScrollArea>
			<Dialog.Actions>
				<Button
					icon={'account-eye-outline'}
					onPress={() => {
						onDismiss();
						router.navigate(`/user/${selectedUser?.name}`);
					}}
					// disabled={!selectedUser}
				>
					View
				</Button>
				{!isFollowLoading ? (
					<Button
						onPress={() => selectedUser?.id && onFollowToggle(selectedUser.id)}
						icon={
							selectedUser?.isFollowing
								? 'account-minus-outline'
								: 'account-plus-outline'
						}
						disabled={!selectedUser}
					>
						{selectedUser?.isFollowing ? 'Unfollow' : 'Follow'}
					</Button>
				) : (
					<ActivityIndicator />
				)}

				{/* <IconButton iconColor={colors.primary} icon={'account-eye-outline'} /> */}
				{/* <IconButton
                    iconColor={colors.primary}
                    icon={'account-plus-outline'}
                    disabled={selectedUser?.isFollowing}
                /> */}
				<Button onPress={onDismiss}>Close</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

type ConfirmActDelDialogProps = BasicDialogProps & { id: number | null };
export const ConfirmActDelDialog = ({ visible, id, onDismiss }: ConfirmActDelDialogProps) => {
	const { mutateAsync: deleteAct } = useDeleteActivityItemInvalidateMutation();

	const onDelete = useCallback(async () => {
		await deleteAct({ id });
		onDismiss();
	}, [id]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Delete Activity?</Dialog.Title>
			<Dialog.Content>
				<Text>Are you sure you want to delete this activity?</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={onDelete}>Delete</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
