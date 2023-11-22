import { Dialog, Text, Button, Searchbar, ActivityIndicator, useTheme } from 'react-native-paper';
import {
    UserOverviewQuery,
    UserSearchQuery,
    useDeleteActMutation,
} from '@/store/services/anilist/generated-anilist';
import { BasicDialogProps } from '../../types';
import { useCallback, useState } from 'react';
import { useLazyUserSearchQuery, useToggleFollowMutation } from '@/store/services/anilist/enhanced';
import { UserCard } from '../cards';
import { FlatList, Keyboard } from 'react-native';
import { View } from 'react-native';

type StatDialogProps = BasicDialogProps & {
    animeStats: UserOverviewQuery['Viewer']['statistics']['anime'];
    mangaStats: UserOverviewQuery['Viewer']['statistics']['manga'];
};
export const StatDialog = ({ animeStats, mangaStats, visible, onDismiss }: StatDialogProps) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Statistics</Dialog.Title>
            <Dialog.Content>
                <Text variant="titleMedium">Anime</Text>
                <Text>Minutes Watched: {animeStats.minutesWatched}</Text>
                <Text>Episodes Watched: {animeStats.episodesWatched}</Text>
                <Text>Manga</Text>
                <Text>Chapters Read: {mangaStats.chaptersRead}</Text>
                <Text>Volumes Read: {mangaStats.volumesRead}</Text>
            </Dialog.Content>
        </Dialog>
    );
};

type AddFriendDialogProps = BasicDialogProps;
export const AddFriendDialog = ({ visible, onDismiss }: AddFriendDialogProps) => {
    const { colors } = useTheme();
    const [query, setQuery] = useState('');
    const [searchUsers, data] = useLazyUserSearchQuery();
    const [toggleFollow, followResults] = useToggleFollowMutation();
    const [selectedUser, setSelectedUser] = useState<UserSearchQuery['Page']['users'][0] | null>();
    const [results, setResults] = useState<UserSearchQuery['Page']['users']>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    const onSearch = useCallback(async (search: string) => {
        Keyboard.dismiss();
        setIsLoading(true);
        const response = await searchUsers({ search: search }).unwrap();
        setResults(response.Page?.users ?? []);
        setSelectedUser(null);
        setIsLoading(false);
    }, []);

    const onFollowToggle = useCallback(async (id: number) => {
        setIsFollowLoading(true);
        const response = await toggleFollow({ userId: id }).unwrap();
        setSelectedUser((prev) => ({ ...prev, isFollowing: response.ToggleFollow?.isFollowing }));
        setResults((prev) =>
            prev.map((user) =>
                user.id === selectedUser?.id
                    ? { ...user, isFollowing: response.ToggleFollow?.isFollowing }
                    : user,
            ),
        );
        setIsFollowLoading(false);
    }, []);

    const keyExtractor = useCallback(
        (item: UserSearchQuery['Page']['users'][0]) => item.id.toString(),
        [],
    );

    const RenderItem = useCallback(
        ({ item }: { item: UserSearchQuery['Page']['users'][0] }) => {
            return (
                <View
                    style={{
                        // flex: 1,
                        borderRadius: 8,
                        borderWidth: 2,
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: selectedUser?.id === item.id ? colors.primary : 'transparent',
                    }}
                >
                    <UserCard
                        size={78}
                        avatarImg={item.avatar?.large}
                        username={item.name}
                        isFollower={item.isFollower}
                        isFollowing={item.isFollowing}
                        onPress={() => setSelectedUser(item)}
                    />
                </View>
            );
        },
        [selectedUser],
    );

    return (
        <Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
            <Dialog.Title>Find User</Dialog.Title>
            <Dialog.Content>
                <Searchbar
                    value={query}
                    onChangeText={(txt) => setQuery(txt)}
                    onSubmitEditing={({ nativeEvent }) => onSearch(nativeEvent.text)}
                />
                <Button mode="outlined" onPress={() => onSearch(query)}>
                    Search
                </Button>
            </Dialog.Content>
            {results && (
                <Dialog.ScrollArea style={{ alignItems: 'center' }}>
                    {!isLoading ? (
                        <FlatList
                            key={1}
                            numColumns={2}
                            data={results ?? []}
                            renderItem={RenderItem}
                            keyExtractor={keyExtractor}
                            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                            removeClippedSubviews
                            showsVerticalScrollIndicator={false}
                            centerContent
                        />
                    ) : (
                        <ActivityIndicator size={'large'} />
                    )}
                </Dialog.ScrollArea>
            )}
            <Dialog.Actions>
                <Button
                    icon={'account-eye-outline'}
                    disabled
                    // disabled={!selectedUser}
                >
                    View
                </Button>
                {!isFollowLoading ? (
                    <Button
                        onPress={() => onFollowToggle(selectedUser?.id)}
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
    const [deleteAct, results] = useDeleteActMutation();

    const onConfirm = useCallback(async () => {
        await deleteAct({ id }).unwrap();
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
                <Button onPress={onConfirm}>Delete</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
