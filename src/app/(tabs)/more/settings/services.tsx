import { MaterialSwitchListItem } from '@/components/switch';
import { useMatchStore } from '@/store/matchStore';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const ServiceSettingsPage = () => {
	const { isMalEnabled, isMangaDexEnabled, isMangaUpdatesEnabled, toggleService } = useMatchStore(
		(state) => ({
			isMalEnabled: state.isMalEnabled,
			isMangaUpdatesEnabled: state.isMangaUpdatesEnabled,
			isMangaDexEnabled: state.isMangaDexEnabled,
			toggleService: state.toggleService,
		}),
	);

	return (
		<ScrollView>
			<Text variant="titleMedium" style={{ padding: 12 }}>
				These services load when opening a title.
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
		</ScrollView>
	);
};

export default ServiceSettingsPage;
