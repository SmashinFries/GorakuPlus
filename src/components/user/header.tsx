import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

type UserHeaderProps = {
	avatar: string;
	name: string;
};
export const UserHeader = ({ avatar, name }: UserHeaderProps) => {
	return (
		<View style={{ flexDirection: 'row', marginTop: 140 / 2, alignItems: 'center' }}>
			<View style={{ marginLeft: 20 }}>
				<Avatar.Image source={avatar ? { uri: avatar } : undefined} size={100} />
			</View>
			<Text variant="titleLarge" style={{ paddingLeft: 20 }}>
				{name ?? ''}
			</Text>
		</View>
	);
};
