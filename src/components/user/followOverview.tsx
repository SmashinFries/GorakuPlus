import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import { Pressable, ScrollView, View } from 'react-native';
import { openWebBrowser } from '@/utils/webBrowser';
import { User } from '@/api/anilist/__genereated__/gql';

type FollowUserItemProps = {
	user: User;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
	return (
		<Pressable
			onPress={() => openWebBrowser(`https://anilist.co/user/${user.name}`)}
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
