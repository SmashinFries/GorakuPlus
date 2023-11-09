import { RefreshControl, View } from 'react-native';
import { ActivityIndicator, Portal, useTheme } from 'react-native-paper';
import { UserBanner } from './components/banner';
import { UserHeader } from './components/header';
import { StatOverview } from './components/quickStats';
import { FavOverview } from './components/favOverview';
import { FollowRow } from './components/followOverview';
import { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackProps } from '../../navigation/types';
import { useUser } from './hooks/useUser';
import { ActivityOverview } from './components/activityItem';
import { FadeHeaderProvider } from '../../components/headers';
import { AddFriendDialog } from './components/dialogs';
import { Accordian } from '../../components/animations';
import { MediaBanner } from '../media/components/banner';

const AuthUserScreen = ({ userID }: { userID: number }) => {
    const navigation = useNavigation<NavigationProp<RootStackProps>>();
    const { colors } = useTheme();
    const { activity, followers, following, user } = useUser(userID);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [showAddFriend, setShowAddFriend] = useState(false);

    const dismissAddFriend = useCallback(() => setShowAddFriend(false), []);

    const navToStats = useCallback(() => {
        navigation.navigate('statistics', { userId: userID });
    }, []);

    const onRefresh = () => {
        setIsRefreshing(true);
        user.refetch();
        followers.refetch();
        following.refetch();
        // activity.refetch();
        setIsRefreshing(false);
    };

    if (user.isFetching)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );

    return (
        <FadeHeaderProvider
            title={user?.data?.Viewer?.name}
            BgImage={({ style }) => (
                <MediaBanner style={style} url={user?.data?.Viewer?.bannerImage} />
            )}
            disableBack
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
                    activity={user.data?.Viewer?.stats?.activityHistory}
                    navToStats={navToStats}
                />
                <View style={{ marginTop: 10 }}>
                    <Accordian title="Activity" initialExpand>
                        <ActivityOverview data={activity.data?.Page?.activities} />
                    </Accordian>
                    {/* <FavOverview favorites={user.data?.Viewer?.favourites} /> */}
                    <Accordian title={'Following'}>
                        <FollowRow
                            data={following.data?.Page?.following}
                            isLoading={following.isLoading}
                        />
                    </Accordian>
                    <Accordian title={'Followers'}>
                        <FollowRow
                            data={followers.data?.Page?.followers}
                            isLoading={followers.isLoading}
                        />
                    </Accordian>
                </View>
            </View>
            <Portal>
                <AddFriendDialog visible={showAddFriend} onDismiss={dismissAddFriend} />
            </Portal>
        </FadeHeaderProvider>
    );
};

export default AuthUserScreen;
