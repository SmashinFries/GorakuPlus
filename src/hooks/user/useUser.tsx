import { useAppSelector } from '@/store/hooks';
import {
	useDeleteActMutation,
	useLazyUserActivityQuery,
	useLazyUserFavoritesOverviewQuery,
	useLazyUserFollowersQuery,
	useLazyUserFollowingQuery,
	useLazyUserOverviewQuery,
} from '@/store/services/anilist/enhanced';
import { useEffect, useState } from 'react';

export const useUser = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const [getUser, user] = useLazyUserOverviewQuery();
	const [getActivity, activity] = useLazyUserActivityQuery();
	const [getFollowers, followers] = useLazyUserFollowersQuery();
	const [getFollowing, following] = useLazyUserFollowingQuery();
	const [getFavorites, favorites] = useLazyUserFavoritesOverviewQuery();

	const { userID } = useAppSelector((state) => state.persistedAniLogin);

	const fetchInitialData = async () => {
		setIsLoading(true);
		await getUser();
		await getFavorites({ userID: userID });
		await getActivity({
			page: 1,
			perPage: 25,
			userId: undefined,
			isFollowing: true,
		});
		await getFollowers({ page: 1, userId: userID });
		await getFollowing({ page: 1, userId: userID });
		setIsLoading(false);
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		await getUser();
		await getFavorites({ userID: userID });
		await getActivity({
			page: 1,
			perPage: 25,
			userId: undefined,
			isFollowing: true,
		});
		await getFollowers({ page: 1, userId: userID });
		await getFollowing({ page: 1, userId: userID });
		setIsRefreshing(false);
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	return {
		user,
		favorites,
		activity,
		followers,
		following,
		isLoading,
		isRefreshing,
		fetchInitialData,
		onRefresh,
	};
};
