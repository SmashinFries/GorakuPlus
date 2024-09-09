import { useToggleFollowMutation, useUserOverviewQuery } from '@/api/anilist/__genereated__/gql';
import { ExpandableDescription } from '@/components/animations';
import { FadeHeaderProvider } from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { MarkdownViewer } from '@/components/markdown';
import AniListMarkdownViewer from '@/components/markdown/renderer';
import { MediaBanner } from '@/components/media/banner';
import ReviewsSection from '@/components/media/sections/reviews';
import { ActivityOverview } from '@/components/user/activityItem';
import FavoritesOverview from '@/components/user/favoritesOverview';
import { StatOverview } from '@/components/user/quickStats';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const UserPage = () => {
	const {
		user: routeParams,
		banner: bannerParam,
		avatar: avatarParam,
	} = useLocalSearchParams<{
		user: [string, string];
		banner?: string;
		avatar?: string;
	}>();
	const userId = parseInt(routeParams[0]);
	const { data, isFetching } = useUserOverviewQuery(
		{ userId: userId },
		{ enabled: !!userId, refetchOnMount: false },
	);
	const { mutateAsync } = useToggleFollowMutation();

	if (isFetching) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View>
			<FadeHeaderProvider
				title={routeParams[1] ?? data?.user?.name}
				BgImage={({ style }) => (
					<MediaBanner style={style} urls={[data?.user?.bannerImage]} />
				)}
				addFriendIcon
				onAddFriend={() => mutateAsync({ userId: userId })}
			>
				<View style={{ paddingTop: 100 }}>
					<View style={{ alignItems: 'center' }}>
						<Image
							source={{ uri: data?.user?.avatar?.large }}
							style={{ height: 120, width: 120, borderRadius: 6 }}
						/>
						<Text
							variant="headlineMedium"
							style={{ textAlign: 'center', paddingVertical: 8 }}
						>
							{data?.user?.name}
						</Text>
					</View>
					{data?.user?.about ? (
						<ExpandableDescription
							initialHeight={200}
							containerStyle={{ paddingVertical: 12 }}
						>
							{/* <MarkdownViewer markdown={data?.user?.about} /> */}
							<AniListMarkdownViewer body={data?.user?.aboutHTML} />
						</ExpandableDescription>
					) : null}
					<StatOverview
						anime={data?.user?.statistics?.anime}
						manga={data?.user?.statistics?.manga}
					/>
					<Button
						mode="elevated"
						onPress={() =>
							router.navigate({
								// @ts-ignore path is correct
								pathname: '/user/userList',
								params: { userId: userId, username: data?.user?.name },
							})
						}
						style={{ margin: 20 }}
					>
						View List
					</Button>
					<FavoritesOverview data={data?.user.favourites} userId={userId} />
					{/* <ActivityOverview userId={userId} data={data?.activity.activities} /> */}
				</View>
			</FadeHeaderProvider>
		</View>
	);
};

export default UserPage;
