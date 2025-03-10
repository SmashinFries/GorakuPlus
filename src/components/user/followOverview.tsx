import { Avatar, Text } from 'react-native-paper';
import { Pressable, ScrollView, View } from 'react-native';
import { User } from '@/api/anilist/__genereated__/gql';
import { router } from 'expo-router';

type FollowUserItemProps = {
	user: User;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: '/user',
					params: {
						userId: user.id,
						name: user.name,
						avatarUrl: user.avatar.large,
						bannerUrl: user.bannerImage,
					},
				})
			}
			style={{ margin: 12, alignItems: 'center' }}
		>
			<View>
				<Avatar.Image size={80} source={{ uri: user?.avatar?.large }} />
			</View>
			<Text style={{ textAlign: 'center' }}>{user.name}</Text>
		</Pressable>
	);
};

type FollowRowProps = {
	followType: 'followers' | 'following';
	data: User[];
};
export const FollowRow = ({ followType, data }: FollowRowProps) => {
	if (!data || data.length < 1) {
		return (
			<Text style={{ textAlign: 'center' }}>
				{followType === 'following' ? 'Not following anyone yet!' : 'No followers yet!'}
			</Text>
		);
	}
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{data?.map((user, idx) => <FollowUserItem key={idx} user={user} />)}
		</ScrollView>
	);
};
