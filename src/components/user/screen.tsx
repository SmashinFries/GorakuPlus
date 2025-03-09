import { useWindowDimensions, View } from 'react-native';
import { ExpandableDescription, FullscreenBackground } from '../animations';
import FavoritesOverview from './favoritesOverview';
import { AddFriendDialog } from '@/components/user/dialogs';
import { ProfileActionBar } from '@/components/user/actionbar';
import { Button, Portal, Surface, Text } from 'react-native-paper';
import AniListMarkdownViewer from '../markdown/renderer';
import {
	useToggleFollowMutation,
	useUserActivityQuery,
	useUserDataQuery,
	useUserOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { FadeHeaderProvider } from '../headers';
import { useAuthStore } from '@/store/authStore';
import { router, Stack } from 'expo-router';
import { MediaBanner } from '../media/banner';
import { Image } from 'expo-image';
import { StatOverview } from './quickStats';
import { AnilistButton } from '../buttons';
import { useCallback, useEffect, useState } from 'react';
import Animated, { FadeOut } from 'react-native-reanimated';
import { GorakuActivityIndicator } from '../loading';
import { ActivityOverview } from './activityItem';
import { useShallow } from 'zustand/react/shallow';
import { usePostsSearch } from '@/api/danbooru/danbooru';
import { GorakuRefreshControl } from '../explore/lists';

const UnauthedPage = () => {
	const { width } = useWindowDimensions();
	const { data } = usePostsSearch({ limit: 50, page: 1, tags: '1girl', rating: 'g' });
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<FullscreenBackground urls={data?.pages[0]?.map((val) => val.large_file_url) ?? []} />
			<View>
				<Image
					source={require('../../../assets/iconsv3/banner.png')}
					style={{
						width: width - 100,
						height: 150,
						overflow: 'visible',
						alignSelf: 'center',
					}}
					// contentFit="contain"
					contentFit="contain"
				/>
				<Surface style={{ padding: 12, borderRadius: 12 }}>
					<Text variant="titleMedium">
						Connect your AniList account to unlock more features!
					</Text>
				</Surface>
				<AnilistButton onPress={() => router.push('/more/accounts')} />
			</View>
			<Stack.Screen options={{ headerShown: false }} />
		</View>
	);
};

export const UserScreen = ({
	username,
	isViewer = false,
}: {
	username?: string;
	isViewer?: boolean;
}) => {
	const { viewerId, viewerName, setAnilistAuth } = useAuthStore(
		useShallow((state) => ({
			viewerId: state.anilist.userID,
			viewerName: state.anilist.username,
			setAnilistAuth: state.setAnilistAuth,
		})),
	);
	const userDataQuery = useUserDataQuery(isViewer ? { id: viewerId } : { username: username }, {
		enabled: isViewer ? !!viewerId : !!username,
		refetchOnMount: false,
	});
	const userOverviewQuery = useUserOverviewQuery(
		{
			userId: isViewer ? viewerId : userDataQuery?.data?.User?.id,
			followersPerPage: 24,
			followingPerPage: 24,
			reviewsPerPage: 24,
		},
		{ enabled: isViewer ? !!viewerId : !!userDataQuery?.data?.User?.id },
	);
	const userActivity = useUserActivityQuery({
		userId: isViewer ? undefined : userDataQuery?.data?.User?.id,
		isFollowing: isViewer ? true : undefined,
		page: 1,
		perPage: 24,
	});

	const [showAddFriend, setShowAddFriend] = useState(false);
	const dismissAddFriend = useCallback(() => setShowAddFriend(false), []);

	const navToStats = () => {
		router.push(`/user/${isViewer ? userDataQuery?.data?.User?.name : username}/stats/anime`);
	};

	const onRefresh = async () => {
		await userDataQuery.refetch();
		await userOverviewQuery.refetch();
	};

	const { mutateAsync } = useToggleFollowMutation();

	useEffect(() => {
		// ensure the user name is kept updated
		if (isViewer && userDataQuery?.data?.User?.name) {
			setAnilistAuth({ username: userDataQuery.data?.User?.name });
		}
	}, [userDataQuery, userDataQuery, isViewer]);

	if (isViewer && !viewerId) return <UnauthedPage />;

	if (userDataQuery.isError) {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>User does not exist :O</Text>
				<Button icon={'arrow-left'} onPress={() => router.back()}>
					Go Back
				</Button>
			</View>
		);
	}

	return (
		<View style={{ height: '100%', width: '100%' }}>
			{(userDataQuery.isFetching || userOverviewQuery.isFetching) && (
				<Animated.View
					exiting={FadeOut}
					style={{
						height: '100%',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</Animated.View>
			)}
			{userDataQuery.data &&
				userOverviewQuery.data &&
				userDataQuery.isFetched &&
				userOverviewQuery.isFetched && (
					<FadeHeaderProvider
						title={isViewer && viewerName ? viewerName : (username ?? '')}
						BgImage={
							!!userDataQuery?.data?.User?.bannerImage
								? ({ style }) => (
										<MediaBanner
											style={style}
											urls={[
												userDataQuery?.data?.User?.bannerImage as string,
											]}
										/>
									)
								: undefined
						}
						disableBack={isViewer}
						addFriendIcon
						onAddFriend={() =>
							isViewer
								? setShowAddFriend(true)
								: mutateAsync({ userId: userDataQuery?.data?.User?.id })
						}
						RefreshControl={
							<GorakuRefreshControl
								onRefresh={onRefresh}
								refreshing={
									userDataQuery.isRefetching || userOverviewQuery.isRefetching
								}
							/>
						}
						onNotificationIcon={() => router.navigate(`/notifications`)}
						newNotifs={userDataQuery?.data?.User?.unreadNotificationCount ?? 0}
						notificationIcon={isViewer}
						loading={userDataQuery?.isLoading || userOverviewQuery.isLoading}
					>
						<View style={{ paddingTop: 100 }}>
							<View style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: userDataQuery?.data?.User?.avatar?.large }}
									style={{ height: 120, width: 120, borderRadius: 6 }}
								/>
								<Text
									variant="headlineMedium"
									style={{ textAlign: 'center', paddingVertical: 8 }}
								>
									{username ?? userDataQuery?.data?.User?.name}
								</Text>
							</View>

							{userDataQuery?.data?.User?.about ? (
								<ExpandableDescription
									initialHeight={100}
									containerStyle={{ paddingVertical: 12 }}
								>
									{/* <MarkdownViewer markdown={data?.user?.about} /> */}
									<AniListMarkdownViewer
										body={userDataQuery?.data?.User?.aboutHTML}
									/>
								</ExpandableDescription>
							) : null}
							{isViewer && (
								<ProfileActionBar
									profile_url={userDataQuery.data.User?.siteUrl ?? ''}
									submissions_url={
										userDataQuery.data.User?.siteUrl + '/submissions'
									}
									settings_url="https://anilist.co/settings"
									onStatPress={navToStats}
								/>
							)}
							<StatOverview
								anime={userDataQuery?.data?.User?.statistics?.anime}
								manga={userDataQuery?.data?.User?.statistics?.manga}
							/>
							{!isViewer && (
								<Button
									mode="elevated"
									onPress={() =>
										router.navigate({
											// @ts-ignore path is correct
											pathname: `/user/${userDataQuery?.data?.User?.name}/userList`,
											params: {
												userId: userDataQuery?.data?.User?.id,
											},
										})
									}
									style={{ margin: 20 }}
								>
									View List
								</Button>
							)}
							<FavoritesOverview
								data={userDataQuery?.data?.User?.favourites}
								username={
									isViewer && (userDataQuery?.data?.User?.name || viewerName)
										? (userDataQuery?.data?.User?.name ?? viewerName ?? '')
										: username
								}
							/>
							{userDataQuery?.data?.User && (
								<ActivityOverview
									userId={userDataQuery?.data?.User.id}
									username={userDataQuery?.data?.User.name}
									data={userActivity?.data?.Page?.activities}
								/>
							)}
						</View>
						{isViewer && (
							<Portal>
								<AddFriendDialog
									visible={showAddFriend}
									onDismiss={dismissAddFriend}
								/>
							</Portal>
						)}
					</FadeHeaderProvider>
				)}
		</View>
	);
};
