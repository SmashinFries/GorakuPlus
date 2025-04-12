import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export const BanTagHeader = ({
	navigation,
	options,
	route,
	back,
	iconColor,
	onSave,
}: NativeStackHeaderProps & { onSave: () => void; iconColor: string }) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} />
			<Appbar.Action icon="check" iconColor={iconColor ?? undefined} onPress={onSave} />
		</Appbar.Header>
	);
};
