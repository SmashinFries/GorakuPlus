import { Image } from 'expo-image';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

type UserHeaderProps = {
	avatar: string;
	name: string;
};
export const UserHeader = ({ avatar, name }: UserHeaderProps) => {
	return (
		<View style={{ alignItems: 'center' }}>
			<Image source={{ uri: avatar }} style={{ height: 120, width: 120, borderRadius: 6 }} />
			<Text variant="headlineMedium" style={{ textAlign: 'center', paddingVertical: 8 }}>
				{name}
			</Text>
		</View>
	);
};
