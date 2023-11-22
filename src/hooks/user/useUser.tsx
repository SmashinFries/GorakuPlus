import {
    useUserActivityQuery,
    useUserFollowersQuery,
    useUserFollowingQuery,
    useUserOverviewQuery,
} from '@/store/services/anilist/generated-anilist';

export const useUser = (userID: number) => {
    const user = useUserOverviewQuery();
    const activity = useUserActivityQuery(
        {
            page: 1,
            perPage: 10,
            userId: userID,
            isFollowing: false,
        },
        { skip: !userID },
    );
    const followers = useUserFollowersQuery({ page: 1, userId: userID });
    const following = useUserFollowingQuery({ page: 1, userId: userID });

    return { user, activity, followers, following };
};
