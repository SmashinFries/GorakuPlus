import { useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { sendToast } from '@/utils/toast';
import * as FileSystem from 'expo-file-system';

export const useScreenshot = () => {
	const viewshotRef = useRef<ViewShot>(null);

	const onScreenshot = async () => {
		const uri = await viewshotRef.current?.capture();
		try {
			await MediaLibrary.saveToLibraryAsync(uri);
			sendToast('Image Saved!', 'Image Saved!');
		} catch {
			sendToast('Failed to Save!', 'Failed to Save!');
		}
		FileSystem.deleteAsync(uri); // temp files will remove on app close but its better to remove instantly imo
	};

	return { viewshotRef, onScreenshot };
};
