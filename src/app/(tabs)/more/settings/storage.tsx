import { MediaLanguageDialog } from '@/components/more/settings/language/dialog';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { Image } from 'expo-image';
import { ListSubheader } from '@/components/titles';
import * as Burnt from 'burnt';

const StoragePage = () => {
	const { mediaLanguage } = useAppSelector((state) => state.persistedSettings);
	const [mediaLangVisible, setMediaLangVisible] = useState(false);

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
		</ScrollView>
	);
};

export default StoragePage;
