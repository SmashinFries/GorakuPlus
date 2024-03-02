import { MotiView } from 'moti';
import { Avatar, Text } from 'react-native-paper';

type UserHeaderProps = {
	avatar: string;
	name: string;
};
export const UserHeader = ({ avatar, name }: UserHeaderProps) => {
	return (
		<MotiView style={{ flexDirection: 'row', marginTop: 140 / 2, alignItems: 'center' }}>
			<MotiView style={{ marginLeft: 20 }}>
				<Avatar.Image source={avatar ? { uri: avatar } : undefined} size={100} />
			</MotiView>
			<Text variant="titleLarge" style={{ paddingLeft: 20 }}>
				{name ?? ''}
			</Text>
		</MotiView>
	);
};
