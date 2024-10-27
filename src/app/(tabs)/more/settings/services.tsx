import { MaterialSwitchListItem } from '@/components/switch';
import { useMatchStore } from '@/store/matchStore';
import { ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

const ServiceSettingsPage = () => {
	const {
		isMalEnabled,
		isMangaDexEnabled,
		isMangaUpdatesEnabled,
		isBooruEnabled,
		toggleService,
	} = useMatchStore(
		useShallow((state) => ({
			isMalEnabled: state.isMalEnabled,
			isMangaUpdatesEnabled: state.isMangaUpdatesEnabled,
			isMangaDexEnabled: state.isMangaDexEnabled,
			isBooruEnabled: state.isBooruEnabled,
			toggleService: state.toggleService,
		})),
	);

	return (
		<ScrollView>
			<Text variant="titleMedium" style={{ padding: 12 }}>
				These services load when opening a title.{' '}
				{'\nDisabling can help reduce load times.'}
			</Text>
			<Divider />
			<MaterialSwitchListItem
				selected={isMalEnabled}
				title="MAL"
				description="Score, description, and more"
				onPress={() => toggleService('mal')}
			/>
			<MaterialSwitchListItem
				selected={isMangaUpdatesEnabled}
				title="MangaUpdates"
				description="Chapter translation data, anime start/end times, and more"
				onPress={() => toggleService('mangaUpdates')}
			/>
			<MaterialSwitchListItem
				selected={isMangaDexEnabled}
				title="MangaDex"
				description="Chapter previews and link"
				onPress={() => toggleService('mangaDex')}
			/>
			<MaterialSwitchListItem
				selected={isBooruEnabled}
				title="Danbooru"
				description="Character fan art"
				onPress={() => toggleService('booru')}
			/>
		</ScrollView>
	);
};

export default ServiceSettingsPage;
