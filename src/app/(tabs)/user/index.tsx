import { useUserOverviewQuery } from '@/api/anilist/__genereated__/gql';
import { Accordion } from '@/components/animations';
import { FadeHeaderProvider } from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { MediaBanner } from '@/components/media/banner';
import { ProfileActionBar } from '@/components/user/actionbar';
import { ActivityOverview } from '@/components/user/activityItem';
import { AddFriendDialog } from '@/components/user/dialogs';
import FavoritesOverview from '@/components/user/favoritesOverview';
import { FollowRow } from '@/components/user/followOverview';
import { UserHeader } from '@/components/user/header';
import { StatOverview } from '@/components/user/quickStats';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { Stack, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Button, Portal } from 'react-native-paper';
import Animated, { FadeOut } from 'react-native-reanimated';

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

const perPage = 24;

const UserPage = () => {
	const { userID } = useAuthStore().anilist;
	const { allowSensorMotion } = useSettingsStore();

	const userOverviewQuery = useUserOverviewQuery(
		{
			userId: userID,
			activityPerPage: perPage,
			favoritesPerPage: perPage,
			followersPerPage: perPage,
			followingPerPage: perPage,
			isFollowing: true,
		},
		{ enabled: !!userID },
	);

	const [showAddFriend, setShowAddFriend] = useState(false);

	const dismissAddFriend = useCallback(() => setShowAddFriend(false), []);

	const navToStats = () => {
		router.push('/statistics/anime');
		// navigation.navigate('statistics', { userId: userID });
	};

	const onRefresh = async () => {
		await userOverviewQuery.refetch();
	};

	if (!userID) return <UnauthedPage />;

	return (
		<>
			{userOverviewQuery.isLoading && (
				<Animated.View
					exiting={FadeOut}
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<GorakuActivityIndicator />
				</Animated.View>
			)}
			{!userOverviewQuery.isLoading && userOverviewQuery.data.user && (
				<FadeHeaderProvider
					title={userOverviewQuery.data.user?.name}
					BgImage={({ style }) => (
						<MediaBanner
							style={style}
							allowMotion={allowSensorMotion}
							url={userOverviewQuery.data.user?.bannerImage}
						/>
					)}
					disableBack
					notificationIcon
					newNotifs={userOverviewQuery.data.user?.unreadNotificationCount}
					onNotificationIcon={
						() => router.push('/notifications')
						// navigation.navigate('notifications', {
						//     unreadNotifs: user?.data?.Viewer?.unreadNotificationCount ?? 0,
						// })
					}
					addFriendIcon
					onAddFriend={() => setShowAddFriend(true)}
					RefreshControl={
						<RefreshControl
							refreshing={userOverviewQuery.isRefetching}
							onRefresh={onRefresh}
						/>
					}
					// shareLink={shareLink}
					loading={userOverviewQuery?.isLoading}
				>
					<View style={{ flex: 1, width: '100%' }}>
						<UserHeader
							avatar={userOverviewQuery.data?.user?.avatar?.large}
							name={userOverviewQuery.data?.user?.name}
						/>
						<StatOverview
							anime={userOverviewQuery.data?.user?.statistics?.anime}
							manga={userOverviewQuery.data?.user?.statistics?.manga}
						/>
						<ProfileActionBar
							profile_url={userOverviewQuery.data?.user?.siteUrl ?? ''}
							submissions_url={userOverviewQuery.data?.user?.siteUrl + '/submissions'}
							settings_url="https://anilist.co/settings"
							onStatPress={navToStats}
						/>
						<View style={{ marginTop: 10 }}>
							{/* <Accordion title="Activity" initialExpand> */}
							<FavoritesOverview data={userOverviewQuery.data?.user.favourites} />
							<ActivityOverview data={userOverviewQuery.data?.activity} />
							{/* </Accordion> */}
							{/* <FavOverview favorites={user.data?.Viewer?.favourites} /> */}
							<Accordion
								title={'Following'}
								initialExpand={
									userOverviewQuery.data?.following?.following?.length < 1
								}
							>
								<FollowRow
									followType={'following'}
									data={userOverviewQuery.data?.following?.following}
								/>
							</Accordion>
							<Accordion
								title={'Followers'}
								initialExpand={
									userOverviewQuery.data?.followers?.followers?.length < 1
								}
							>
								<FollowRow
									followType={'followers'}
									data={userOverviewQuery.data?.followers?.followers}
								/>
							</Accordion>
						</View>
					</View>
					<Portal>
						<AddFriendDialog visible={showAddFriend} onDismiss={dismissAddFriend} />
					</Portal>
				</FadeHeaderProvider>
			)}
		</>
	);
};

export default UserPage;
