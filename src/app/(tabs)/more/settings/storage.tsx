import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, List, Surface, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { ListSubheader } from '@/components/titles';
import * as Burnt from 'burnt';
import { useAppTheme } from '@/store/theme/themes';
import { useMatchStore } from '@/store/matchStore';

const StoragePage = () => {
	const { colors } = useAppTheme();
	const resetMatches = useMatchStore((state) => state.reset);
	const mangaupdates = useMatchStore((state) => state.mangaUpdates);
	const mal = useMatchStore((state) => state.mal);
	const showToast = (title: string) => {
		Burnt.toast({ title: title, from: 'bottom', preset: 'done' });
	};

	const onClearDiskCache = async () => {
		await Image.clearDiskCache();
		showToast('Image disk cache cleared');
	};

	const onClearMemoryCache = async () => {
		await Image.clearMemoryCache();
		showToast('Image memory cache cleared');
	};

	return (
		<ScrollView>
			<ListSubheader title="Images" />
			<List.Item
				title="Clear Disk Cache"
				description={'Clears image disk cache'}
				// descriptionStyle={{ textTransform: 'capitalize' }}
				onPress={onClearDiskCache}
			/>
			<List.Item
				title="Clear Memory Cache"
				description={'Clears image memory cache'}
				// descriptionStyle={{ textTransform: 'capitalize' }}
				onPress={onClearMemoryCache}
			/>
			<ListSubheader title="ID Databases" />
			<Surface mode="elevated" style={{ padding: 10, marginHorizontal: 12, borderRadius: 8 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<IconButton icon={'alert-outline'} iconColor={colors.error} />
					<Text variant="titleMedium" style={{ color: colors.error }}>
						Warning!
					</Text>
				</View>
				<Text style={{ paddingHorizontal: 10 }}>
					These IDs are stored to improve loading speeds.{'\n'}
					Only reset these if you know what you are doing.
				</Text>
			</Surface>
			<List.Item title={'Test'} onPress={() => console.log(mal)} />
			<List.Item
				title={'Reset All'}
				onPress={() => {
					showToast('All IDs have reset');
					resetMatches('all');
				}}
			/>
			<List.Item
				title={'Reset MAL'}
				onPress={() => {
					showToast('MAL IDs have reset');
					resetMatches('mal');
				}}
			/>
			<List.Item
				title={'Reset MangaUpdates'}
				onPress={() => {
					showToast('MangaUpdates IDs have reset');
					resetMatches('mangaUpdates');
				}}
			/>
			<List.Item
				title={'Reset Booru'}
				onPress={() => {
					showToast('Booru IDs have reset');
					resetMatches('booru');
				}}
			/>
		</ScrollView>
	);
};

export default StoragePage;
