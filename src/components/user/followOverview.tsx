import { AnimatePresence, MotiView } from 'moti';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import { User } from '@/store/services/anilist/generated-anilist';
import { ScrollView } from 'react-native';
import { Selectable } from '../moti';
import { openWebBrowser } from '@/utils/webBrowser';

type FollowUserItemProps = {
	user: User;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
	return (
		<AnimatePresence>
			<Selectable
				from={{ scale: 0 }}
				animate={{ scale: 1 }}
				onPress={() => openWebBrowser(`https://anilist.co/user/${user.name}`)}
				style={{ margin: 12, alignItems: 'center' }}
			>
				<MotiView>
					<Avatar.Image size={80} source={{ uri: user?.avatar?.large }} />
				</MotiView>
				<Text style={{ textAlign: 'center' }}>{user.name}</Text>
			</Selectable>
		</AnimatePresence>
	);
};

type FollowRowProps = {
	followType: 'followers' | 'following';
	data: User[];
	isLoading: boolean;
};
export const FollowRow = ({ followType, data, isLoading }: FollowRowProps) => {
	if (!data || data.length < 1) {
		return (
			<Text style={{ textAlign: 'center' }}>
				{followType === 'following' ? 'Not following anyone yet!' : 'No followers yet!'}
			</Text>
		);
	}
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{!isLoading ? (
				data?.map((user, idx) => <FollowUserItem key={idx} user={user} />)
			) : (
				<ActivityIndicator />
			)}
		</ScrollView>
	);
};
