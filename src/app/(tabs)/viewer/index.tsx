import { useUserOverviewQuery } from '@/api/anilist/__genereated__/gql';
import { fetchRandomImages, useNekosRandomImagesQuery } from '@/api/nekos/nekos';
import { Accordion, FullscreenBackground } from '@/components/animations';
import { AnilistButton } from '@/components/buttons';
import { FadeHeaderProvider } from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { MediaBanner } from '@/components/media/banner';
import { AnilistIcon } from '@/components/svgs';
import { ProfileActionBar } from '@/components/user/actionbar';
import { ActivityOverview } from '@/components/user/activityItem';
import { AddFriendDialog } from '@/components/user/dialogs';
import FavoritesOverview from '@/components/user/favoritesOverview';
import { FollowRow } from '@/components/user/followOverview';
import { UserHeader } from '@/components/user/header';
import { StatOverview } from '@/components/user/quickStats';
import useImageRotation from '@/hooks/useImageRotation';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { rgbToRgba } from '@/utils';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, RefreshControl, useWindowDimensions, View } from 'react-native';
import { Button, MD3DarkTheme, Portal, Text } from 'react-native-paper';
import Animated, { FadeOut } from 'react-native-reanimated';

const UnauthedPage = () => {
	const { width } = useWindowDimensions();
	const { data, isFetching } = useNekosRandomImagesQuery({
		limit: 50,
		rating: ['safe'],
	});
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{/* <MediaBanner url={data?.data?.items[0]?.image_url} /> */}
			<FullscreenBackground urls={data?.data?.items?.map((val) => val.image_url)} />
			{/* <Image
				source={{ uri: img_src }}
				style={{ width: '100%', height: '100%', position: 'absolute' }}
				transition={1200}
				contentFit="cover"
				placeholder={{ blurhash: colors.blurhash }}
			/>
			<View
				style={{
					position: 'absolute',
					backgroundColor: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
					width: '100%',
					height: '100%',
				}}
			/>
			<LinearGradient
				colors={[
					colors.elevation.level2,
					'transparent',
					'transparent',
					colors.elevation.level2,
				]}
				style={{ position: 'absolute', height: '100%', width: '100%' }}
				locations={[0, 0.1, 0.6, 1]}
			/> */}

			<View>
				<Image
					source={require('../../../../assets/iconsv3/banner.png')}
					style={{
						width: width - 100,
						height: 150,
						overflow: 'visible',
						alignSelf: 'center',
					}}
					// contentFit="contain"
					contentFit="contain"
				/>
				<Text variant="titleMedium">
					Connect your AniList account to unlock more features!
				</Text>
				<AnilistButton onPress={() => router.push('/more/accounts')} />
			</View>
			<Stack.Screen options={{ headerShown: false }} />
		</View>
	);
};

const perPage = 24;

const ViewerPage = () => {
	const { userID } = useAuthStore((state) => state.anilist);
	const userOverviewQuery = useUserOverviewQuery(
		{
			userId: userID,
			activityPerPage: perPage,
			favoritesPerPage: perPage,
			followersPerPage: perPage,
			followingPerPage: perPage,
			isFollowing: true,
		},
		{ enabled: !!userID, meta: { persist: true } },
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
							urls={[userOverviewQuery.data.user?.bannerImage]}
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
					<View style={{ flex: 1, width: '100%', paddingTop: 100 }}>
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
							<FavoritesOverview
								data={userOverviewQuery.data?.user.favourites}
								userId={userID}
							/>
							<ActivityOverview
								userId={userID}
								data={userOverviewQuery.data?.activity.activities}
							/>
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

export default ViewerPage;
