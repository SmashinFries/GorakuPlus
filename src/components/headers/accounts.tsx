import { router } from 'expo-router';
import { Appbar, AppbarProps } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export const AccountsHeader = ({
	options,
	route,
	mode,
	dark,
	elevated,
}: NativeStackHeaderProps & {
	mode?: AppbarProps['mode'];
	dark?: boolean;
	elevated?: boolean;
	actions?: { icon: string; onPress: () => void }[];
	showBack?: boolean;
}) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header mode={mode} dark={dark} elevated={elevated}>
			<Appbar.BackAction onPress={() => router.navigate('/(tabs)/more')} />
			<Appbar.Content
				title={title}
				titleStyle={{ textTransform: 'capitalize' }}
				// mode={mode}
			/>
		</Appbar.Header>
	);
};
