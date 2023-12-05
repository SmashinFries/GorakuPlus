import { Accordion } from '@/components/animations';
import { FadeHeaderProvider } from '@/components/headers';
import { MediaBanner } from '@/components/media/banner';
import { ProfileActionBar } from '@/components/user/actionbar';
import { ActivityOverview } from '@/components/user/activityItem';
import { AddFriendDialog } from '@/components/user/dialogs';
import { FollowRow } from '@/components/user/followOverview';
import { UserHeader } from '@/components/user/header';
import { StatOverview } from '@/components/user/quickStats';
import { useUser } from '@/hooks/user/useUser';
import { useAppSelector } from '@/store/hooks';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ActivityIndicator, Button, Portal } from 'react-native-paper';

const UnauthedPage = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                mode="outlined"
                onPress={() => {
                    router.push('/more/accounts');
                }}
            >
                Login for the full experience!
            </Button>
        </View>
    );
};

const UserPage = () => {
    const { userID } = useAppSelector((state) => state.persistedAniLogin);

    const { activity, followers, following, user } = useUser(userID);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [showAddFriend, setShowAddFriend] = useState(false);

    const dismissAddFriend = useCallback(() => setShowAddFriend(false), []);

    const navToStats = () => {
        router.push('/statistics');
        // navigation.navigate('statistics', { userId: userID });
    };

    const onRefresh = async () => {
        setIsRefreshing(true);
        await user.refetch();
        await followers.refetch();
        await following.refetch();
        await activity.refetch();
        setIsRefreshing(false);
    };

    if (!userID) return <UnauthedPage />;

    if (userID && (user.isUninitialized || !user.data))
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );

    return (
        <FadeHeaderProvider
            title={user?.data?.Viewer?.name}
            BgImage={({ style }) => (
                <MediaBanner style={style} url={user?.data?.Viewer?.bannerImage} />
            )}
            disableBack
            notificationIcon
            newNotifs={user?.data?.Viewer?.unreadNotificationCount}
            onNotificationIcon={
                () => router.push('/notifications')
                // navigation.navigate('notifications', {
                //     unreadNotifs: user?.data?.Viewer?.unreadNotificationCount ?? 0,
                // })
            }
            addFriendIcon
            onAddFriend={() => setShowAddFriend(true)}
            RefreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            // shareLink={shareLink}
            loading={user?.isFetching}
        >
            <View style={{ flex: 1, width: '100%' }}>
                <UserHeader
                    avatar={user.data?.Viewer?.avatar?.large}
                    name={user.data?.Viewer?.name}
                />
                <StatOverview
                    anime={user.data?.Viewer?.statistics?.anime}
                    manga={user.data?.Viewer?.statistics?.manga}
                />
                <ProfileActionBar
                    profile_url={user.data?.Viewer?.siteUrl}
                    submissions_url={user.data?.Viewer?.siteUrl + '/submissions'}
                    settings_url="https://anilist.co/settings"
                    onStatPress={navToStats}
                />
                <View style={{ marginTop: 10 }}>
                    {/* <Accordion title="Activity" initialExpand> */}
                    <ActivityOverview data={activity.data?.Page?.activities} />
                    {/* </Accordion> */}
                    {/* <FavOverview favorites={user.data?.Viewer?.favourites} /> */}
                    <Accordion title={'Following'}>
                        <FollowRow
                            data={following.data?.Page?.following}
                            isLoading={following.isLoading}
                        />
                    </Accordion>
                    <Accordion title={'Followers'}>
                        <FollowRow
                            data={followers.data?.Page?.followers}
                            isLoading={followers.isLoading}
                        />
                    </Accordion>
                </View>
            </View>
            <Portal>
                <AddFriendDialog visible={showAddFriend} onDismiss={dismissAddFriend} />
            </Portal>
        </FadeHeaderProvider>
    );
};

export default UserPage;
