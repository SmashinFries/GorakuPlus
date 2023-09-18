import { RefreshControl, ScrollView, View } from 'react-native';
import {
    useUserActivityQuery,
    useUserFollowersQuery,
    useUserFollowingQuery,
    useUserOverviewQuery,
} from '../../app/services/anilist/generated-anilist';
import { ActivityIndicator, Button, Portal, useTheme } from 'react-native-paper';
import { UserBanner } from './components/banner';
import { UserHeader } from './components/header';
import { StatOverview } from './components/quickStats';
import { FavOverview } from './components/favOverview';
import { FollowRow } from './components/followOverview';
import { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { RootStackProps } from '../../navigation/types';
import { useUser } from './hooks/useUser';
import { ActivityOverview } from './activity';
import { FadeHeaderProvider } from '../../components/headers';
import { AddFriendDialog } from './components/dialogs';
import { Image } from 'expo-image';

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
            disableBack
            addFriendIcon
            onAddFriend={() => setShowAddFriend(true)}
            RefreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            // shareLink={shareLink}
            loading={user?.isFetching}
        >
            <View style={{ flex: 1 }}>
                <UserBanner bannerImage={user.data?.Viewer?.bannerImage} />
                <LinearGradient
                    locations={[0, 0.2]}
                    colors={['rgba(0,0,0,0.2)', colors.background]}
                >
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
                    {/* <ActivityOverview data={activity.data?.Page?.activities} /> */}
                    <FavOverview favorites={user.data?.Viewer?.favourites} />
                    <FollowRow
                        title="Following"
                        data={following.data?.Page?.following}
                        isLoading={following.isLoading}
                    />
                    <FollowRow
                        title="Followers"
                        data={followers.data?.Page?.followers}
                        isLoading={followers.isLoading}
                    />
                </LinearGradient>
            </View>
            <Portal>
                <AddFriendDialog visible={showAddFriend} onDismiss={dismissAddFriend} />
            </Portal>
        </FadeHeaderProvider>
    );
};

export default AuthUserScreen;
