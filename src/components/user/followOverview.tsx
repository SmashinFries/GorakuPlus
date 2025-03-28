import { Avatar, Text } from 'react-native-paper';
import { Pressable, ScrollView, View } from 'react-native';
import {
	User,
	UserOverviewQuery_followers_Page_followers_User,
} from '@/api/anilist/__genereated__/gql';
import { router } from 'expo-router';
import { ListHeading } from '../text';
import { UserCard } from '../cards';

type FollowUserItemProps = {
	user: UserOverviewQuery_followers_Page_followers_User | null | undefined;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
	if (!user) return null;
	return <UserCard {...user} />;
};

type FollowRowProps = {
	followType: 'followers' | 'following';
	userId?: number;
	username?: string;
	data: (UserOverviewQuery_followers_Page_followers_User | null)[] | null | undefined;
};
export const FollowRow = ({ followType, data, username, userId }: FollowRowProps) => {
	if (!data || data.length < 1) {
		return (
			<Text style={{ textAlign: 'center' }}>
				{followType === 'following' ? 'Not following anyone yet!' : 'No followers yet!'}
			</Text>
		);
	}
	return (
		<View>
			<ListHeading
				title={followType}
				titleStyle={{ textTransform: 'capitalize' }}
				icon={data?.length === 24 ? 'arrow-right' : undefined}
				onIconPress={() =>
					router.push({
						pathname: `/user/[username]/${followType}`,
						params: {
							username: username as string,
							userId,
						},
					})
				}
			/>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{data?.map((user, idx) => <FollowUserItem key={idx} user={user} />)}
			</ScrollView>
		</View>
	);
};
