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
import {
    useUserActivityQuery,
    useUserFollowersQuery,
    useUserFollowingQuery,
    useUserOverviewQuery,
} from '@/store/services/anilist/generated-anilist';
import { Stack, router } from 'expo-router';
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
                Login to AniList for the full experience!
            </Button>
            <Stack.Screen options={{ headerShown: false }} />
        </View>
    );
};

const UserPage = () => {
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { allowSensorMotion } = useAppSelector((state) => state.persistedSettings);

    const { user, activity, followers, following, isLoading, isRefreshing, onRefresh } =
        useUser(userID);

    const [showAddFriend, setShowAddFriend] = useState(false);

    const dismissAddFriend = useCallback(() => setShowAddFriend(false), []);

    const navToStats = () => {
        router.push('/statistics');
        // navigation.navigate('statistics', { userId: userID });
    };

    if (!userID) return <UnauthedPage />;

    return userID && isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    ) : (
        <FadeHeaderProvider
            title={user?.currentData?.Viewer?.name}
            BgImage={({ style }) => (
                <MediaBanner
                    style={style}
                    allowMotion={allowSensorMotion}
                    url={user?.currentData?.Viewer?.bannerImage}
                />
            )}
            disableBack
            notificationIcon
            newNotifs={user?.currentData?.Viewer?.unreadNotificationCount}
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
            loading={user?.isLoading}
        >
            <View style={{ flex: 1, width: '100%' }}>
                <UserHeader
                    avatar={user.currentData?.Viewer?.avatar?.large}
                    name={user.currentData?.Viewer?.name}
                />
                <StatOverview
                    anime={user.currentData?.Viewer?.statistics?.anime}
                    manga={user.currentData?.Viewer?.statistics?.manga}
                />
                <ProfileActionBar
                    profile_url={user.currentData?.Viewer?.siteUrl ?? ''}
                    submissions_url={user.currentData?.Viewer?.siteUrl + '/submissions'}
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
                            data={following.currentData?.Page?.following}
                            isLoading={following.isLoading}
                        />
                    </Accordion>
                    <Accordion title={'Followers'}>
                        <FollowRow
                            data={followers.currentData?.Page?.followers}
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
