import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

export const AniCardHeader = ({
	navigation,
	options,
	route,
	back,
	onSave,
}: NativeStackHeaderProps & { onSave: () => void }) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action icon={'download-outline'} onPress={onSave} />
		</Appbar.Header>
	);
};
