import { RefreshControl, ScrollView, View } from 'react-native';
import {
    useUserFollowersQuery,
    useUserFollowingQuery,
    useUserOverviewQuery,
} from '../../app/services/anilist/generated-anilist';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { UserBanner } from './components/banner';
import { UserHeader } from './components/header';
import { StatOverview } from './components/quickStats';
import { FavOverview } from './components/favOverview';
import { FollowRow } from './components/followOverview';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const AuthUserScreen = ({ userID }: { userID: number }) => {
    const user = useUserOverviewQuery();
    const followers = useUserFollowersQuery({ page: 1, userId: userID });
    const following = useUserFollowingQuery({ page: 1, userId: userID });
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { colors } = useTheme();

    // const { width, height } = useWindowDimensions();

    const onRefresh = () => {
        setIsRefreshing(true);
        user.refetch();
        followers.refetch();
        following.refetch();
        setIsRefreshing(false);
    };

    if (user.isLoading) return <ActivityIndicator />;

    return (
        <View style={{ flex: 1 }}>
            <UserBanner bannerImage={user.data?.Viewer?.bannerImage} />
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            >
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
                    />
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
            </ScrollView>
        </View>
    );
};

export default AuthUserScreen;
