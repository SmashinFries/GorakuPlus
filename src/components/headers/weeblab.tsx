import { openWebBrowser } from '@/utils/webBrowser';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export const NekosAPIHeader = ({
	navigation,
	options,
	route,
	back,
	onOpenFilter,
}: NativeStackHeaderProps & {
	onOpenFilter: () => void;
}) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="center-aligned" elevated>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action icon={'filter-outline'} onPress={onOpenFilter} />
			<Appbar.Action
				icon={'information-outline'}
				onPress={() => openWebBrowser('https://nekosapi.com/')}
			/>
		</Appbar.Header>
	);
};

export const WaifuItHeader = ({
	navigation,
	options,
	route,
	back,
	onAuthOpen,
}: NativeStackHeaderProps & { onAuthOpen: () => void }) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="center-aligned" elevated>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action icon="key" onPress={onAuthOpen} />
			<Appbar.Action
				icon={'information-outline'}
				onPress={() => openWebBrowser('https://waifu.it/')}
			/>
		</Appbar.Header>
	);
};
